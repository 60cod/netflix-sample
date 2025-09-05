const fs = require('fs').promises;
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, 'posts');
const CONTENT_DIR = path.join(__dirname, 'content');
const CONTENT_POSTS_DIR = path.join(CONTENT_DIR, 'posts');

async function buildContent() {
    try {
        // Ensure content directories exist
        await fs.mkdir(CONTENT_DIR, { recursive: true });
        await fs.mkdir(CONTENT_POSTS_DIR, { recursive: true });

        const postFiles = await fs.readdir(POSTS_DIR);
        const allPostsData = {};

        for (const postFile of postFiles) {
            if (path.extname(postFile) !== '.md') continue;

            const filePath = path.join(POSTS_DIR, postFile);
            const fileContent = await fs.readFile(filePath, 'utf8');
            
            // Parse front matter and markdown content
            const { data, content } = matter(fileContent);
            const postId = path.basename(postFile, '.md');

            // Validate metadata
            if (!data.title || !data.author || !data.date || !data.category) {
                console.warn(`[!] Skipping ${postFile}: Missing required metadata (title, author, date, category).`);
                continue;
            }

            // Generate HTML for the post body
            const postHtml = marked.parse(content);
            const htmlFilePath = path.join(CONTENT_POSTS_DIR, `${postId}.html`);
            await fs.writeFile(htmlFilePath, postHtml);

            // Prepare metadata for JSON file
            const postMetadata = {
                id: postId,
                title: data.title,
                author: data.author,
                date: data.date,
                thumbnailUrl: data.thumbnailUrl || '',
            };
            
            // Group posts by category
            if (!allPostsData[data.category]) {
                allPostsData[data.category] = [];
            }
            allPostsData[data.category].push(postMetadata);

            console.log(`[+] Processed: ${postFile}`);
        }
        
        // Sort posts in each category by date (newest first)
        for (const category in allPostsData) {
            allPostsData[category].sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Write the aggregated posts metadata to posts.json
        const jsonFilePath = path.join(CONTENT_DIR, 'posts.json');
        await fs.writeFile(jsonFilePath, JSON.stringify(allPostsData, null, 2));

        console.log('\n✅ Content build complete!');
        console.log(`- Generated ${Object.values(allPostsData).flat().length} post HTML files.`);
        console.log(`- Generated posts.json`);

    } catch (error) {
        console.error('\n❌ Error during content build:', error);
        process.exit(1);
    }
}

buildContent();
