# 1CMTALK - Netflix 스타일 블로그 템플릿

이 프로젝트는 순수 HTML, CSS, JS로 만들어진 넷플릭스 스타일의 블로그 템플릿입니다. GitHub Actions를 통해 Markdown으로 작성된 포스트를 자동으로 웹 콘텐츠로 변환하고 배포합니다.


## 🚀 시작하기

1. 이 프로젝트를 당신의 GitHub 계정으로 포크(Fork)하거나 템플릿으로 사용(Use this template)하세요.
2. 저장소의 Settings > Pages에서 GitHub Pages를 main 브랜치 기준으로 활성화합니다.
3. 몇 분 후 https://<Your-GitHub-Username>.github.io/<Repository-Name>/ 주소에서 블로그를 확인할 수 있습니다.


## 📂 프로젝트 구조

```
.
├── .github/
│   └── workflows/
│       └── main.yml      # GitHub Actions 자동화 워크플로우
├── content/
│   ├── posts.json        # (자동 생성) 모든 포스트의 메타데이터
│   └── posts/
│       └── post-id.html  # (자동 생성) 변환된 각 포스트의 HTML
├── posts/
│   ├── example-post.md   # 예시 마크다운 포스트
│   └── another-post.md   # 여기에 새 포스트(.md)를 추가합니다.
├── .gitignore
├── build_script.js       # 마크다운을 HTML/JSON으로 변환하는 Node.js 스크립트
└── index.html            # 블로그 메인 파일
```


## ✍️ 새 글 작성 방법

1. `/posts/` 디렉터리에 새로운 `.md` 파일을 생성합니다. 파일명은 영어, 숫자, 하이픈(-)만 사용하여 my-first-post.md 와 같이 만듭니다. 이 파일명이 포스트의 고유 ID가 됩니다.
2. 파일 상단에 아래와 같은 형식의 **YAML Front Matter**를 작성하여 포스트 정보를 입력합니다.
```
---
title: "나의 첫 번째 포스트"
author: "홍길동"
date: "2024-10-26"
category: "기술"
thumbnailUrl: "[https://placehold.co/600x338/141414/ffffff?text=My+First+Post](https://placehold.co/600x338/141414/ffffff?text=My+First+Post)"
---

여기에 마크다운으로 본문 내용을 작성하세요.

## 소제목

* 리스트 아이템 1
* 리스트 아이템 2

이미지도 추가할 수 있습니다.
![이미지 설명](https://placehold.co/800x450)
```
3. 작성이 끝나면 변경사항을 저장하고 GitHub 저장소에 푸시(Push)합니다.
4. 푸시가 감지되면 GitHub Actions가 자동으로 build_script.js를 실행하여 content 폴더 내의 파일들을 최신화합니다.
5. 몇 분 후 블로그에 접속하여 새로고침하면 새 글이 반영된 것을 확인할 수 있습니다.


## 🤖 자동화 설정 상세
자동화는 build_script.js와 .github/workflows/main.yml 두 파일로 이루어집니다.

1. 콘텐츠 변환 스크립트 (build_script.js)
이 스크립트는 posts 폴더의 모든 .md 파일을 읽어 다음 작업을 수행합니다.
* YAML Front Matter를 파싱하여 메타데이터 추출
* Markdown 본문을 HTML로 변환
* 각 포스트를 개별 HTML 파일 (content/posts/{id}.html)로 저장
* 모든 포스트의 메타데이터를 취합하여 content/posts.json 파일 생성
2. GitHub Actions 워크플로우 (.github/workflows/main.yml)
이 워크플로우는 main 브랜치의 posts 폴더에 변경사항이 푸시될 때마다 자동으로 실행됩니다.
* Node.js 환경을 설정하고 필요한 패키지(marked, gray-matter)를 설치합니다.
* build_script.js를 실행하여 콘텐츠 파일을 생성/업데이트합니다.
* 생성된 content 폴더의 변경사항을 저장소에 자동으로 커밋하고 푸시합니다.
