# 📝 AI 记账软件全栈开发项目

![GitHub repo size](https://img.shields.io/github/repo-size/CoderWeiJ/ai-bill) ![GitHub stars](https://img.shields.io/github/stars/CoderWeiJ/ai-bill?style=social) ![GitHub forks](https://img.shields.io/github/forks/CoderWeiJ/ai-bill?style=social)

## 🌟 简介
AI 记账软件是一个全栈开发项目，旨在提供便捷的记账服务。通过自然语言处理技术，用户可以通过普通对话将自然语言转换成账单，同时支持登录注册和首页数据展示功能。

## 🚀 功能特性
1. 🔐 **登录注册**：使用 Supabase auth 和 JWT 实现安全的用户认证。
2. 💬 **对话功能**：
   - 普通对话
   - 理解自然语言并转换成账单
3. 📊 **首页数据展示**：支持切换不同的日期查看数据。

## 💻 技术栈
### 📱 移动端
- **框架**: React Native (Expo)
- **状态管理**: Zustand

### 🖥️ 后端
- **Nodejs 框架**: Express + Typescript
- **登录注册**: Supabase auth + JWT
- **对话功能实现**: AI SDK
- **数据库**: Supabase 提供的 Postgresql
- **ORM**: Drizzle
- **模型**: Deepseek