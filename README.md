# 📚 RGT Hwanju - 온라인 서점 풀스택 프로젝트

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3-green?logo=springboot)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Automated-blue?logo=docker)
![CI/CD](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-blue?logo=githubactions)

---

## 🎯 프로젝트 개요

> 온라인 서점 관리 웹 애플리케이션  
> 도서 등록, 검색, 수정, 삭제, 수량 조절 기능을 포함한 관리자용 시스템 구현  
> React + Spring Boot 기반 풀스택 구조로 개발, AWS EC2에 Docker + GitHub Actions를 통해 자동 배포

---

## 🌐 배포 주소

- **Frontend ** 👉 [http://54.148.39.8](http://54.148.39.8/))
- **Backend (Spring Boot API)** 👉 `http://54.148.38.9/api/books`

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | React 18, TypeScript, Axios |
| Backend | Java 17, Spring Boot 3, MyBatis |
| Infra | AWS EC2, Docker, GitHub Actions, Nginx |
| DB | Local MySQL, AWS MySQL |
---

## ⚙️ 실행 방법 (로컬)

### 📁 1. 백엔드

```bash
cd server

# application.yml 또는 application-dev.yml 확인
# MySQL 연결, 포트 등 설정 후

./gradlew build
java -jar build/libs/*.jar
```

### 📁 2. 프론트엔드
```bash
cd client

npm install

# .env.development env파일 생성
REACT_APP_API_BASE_URL=http://localhost:8080

npm start
```

##  🚀 CI/CD 자동 배포 흐름
```bash
[GitHub Push]
   │
   ├─ server/** → Backend 배포
   │     └─ GitHub Actions → Docker Hub → EC2 Docker Compose
   │
   └─ client/** → Frontend 배포
   │     └─ GitHub Actions → Docker Hub → EC2 Docker Compose
```
---

## 🐳 Docker 배포 완료 스크린샷

Spring Boot 애플리케이션이 EC2에서 Docker 컨테이너로 실행 중인 로그입니다:

![image](https://github.com/user-attachments/assets/43b5efcc-646b-4569-a238-bce1ae1e0256)

- 백엔드 컨테이너 이름: `backend`
- 프론트엔드 컨테이너 이름: `frontend`
- 로그에 Spring Boot 정상 기동 메시지 확인

```
🧑‍💻 개발자
이름: 유환주 
GitHub: github.com/breadjoo
이메일: yoohwanjoo@gmail.com
📌 제출일자: 2025.04.11
```
