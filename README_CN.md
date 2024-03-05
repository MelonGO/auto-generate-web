## 项目介绍

什么是Auto Generate Web？想象一下，如果你要创建一个网站，你所需要做的，就是为每个页面设定标题、链接和内容生成指令。余下的工作，交给AI来完成。

以创建一个编程学习网站为例：

1. 首先，规划几个主题分类，比如Java、Python、SQL等；
2. 然后，为每个分类构建菜单(Menu)和子菜单(Submenu)，例如在Java分类下，可以添加一个“Java基础”菜单，并进一步添加“Java字符串”、“Java数组”等子项；
3. 接下来，为每个页面设计一个或多个内容板块(Section)，并为每个板块设定一个内容提示(Prompt)；
4. 一切就绪后，只需点击“生成”按钮，坐等AI将这些元素编织成一个完整的网站；
5. AI完成初稿后，可以在此基础上进行修改和补充，以完善网站内容。

## 项目特点

- Next.js 14 Server Components，Server Actions
- Auth.js 实现Authentication
- 数据库：Prisma (ORM) + Vercel Postgres
- UI: Tailwind CSS，Daisy UI
- AI streaming：Vercel AI SDK
- 开源，支持一键部署到Vercel

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMelonGO%2Fauto-generate-web&env=AUTH_SECRET,POSTGRES_PRISMA_URL,POSTGRES_URL_NON_POOLING,OPENAI_API_KEY,OPENAI_BASE_URL,MODEL&project-name=auto-generate-web&repository-name=auto-generate-web)

## 创建一个 Vercel Postgres 数据库实例

按照 Vercel 提供的[快速入门指南](https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database)中的步骤操作。在Vercel上创建和配置Postgres数据库实例，使你的应用程序能够与其交互。

记得用在Postgres数据库设置过程中的credentials更新 `.env` 文件中的环境变量（`POSTGRES_PRISMA_URL`、`POSTGRES_URL_NON_POOLING`）。

## 本地运行

你需要使用在 `.env.example` 中[定义的环境变量](.env.example)。

> 注意：不要提交你的 `.env` 文件，否则会泄露重要的账号信息。

如果想使用[本地数据库](https://www.prisma.io/docs/orm/overview/databases/postgresql)：

1. 在的 `.env` 文件中添加像 `DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE` 这样的环境变量；
2. 更新 `schema.prisma` 文件的数据源。
```
datasource db {
    provider = "postgresql"
    url = env("DATABASE_URL")
}
```

最后
```
npm install
npm run dev
```