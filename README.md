English / [简体中文](./README_CN.md)

## How it works

What is Auto Generate Web? Imagine if you wanted to create a website, all you would need to do is set up titles, links, and content generation instructions for each page. The rest of the work would be left to AI to complete.

Take creating a programming learning website as an example:

1. First, plan several topic categories, such as Java, Python, SQL, etc.
2. Then, for each category, build a menu and submenu. For example, under the Java category, you could add a "Java Basics" menu, and further add sub-items like "Java Strings," "Java Arrays," etc.
3. Next, design one or more content sections for each page and set a content prompt for each section.
4. Once everything is ready, just click the "Generate" button and wait for AI to weave these elements into a complete website.
5. After AI completes the first draft, you can make modifications and additions to perfect the website content.

## Features

- Next.js 14 Server Components, Server Actions
- Auth.js for Authentication
- Database: Prisma (ORM) + Vercel Postgres
- UI: Tailwind CSS, Daisy UI
- AI streaming: Vercel AI SDK

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMelonGO%2Fauto-generate-web&env=AUTH_SECRET,POSTGRES_PRISMA_URL,POSTGRES_URL_NON_POOLING,OPENAI_API_KEY,OPENAI_BASE_URL,MODEL&project-name=auto-generate-web&repository-name=auto-generate-web)

## Creating a Postgres Database Instance

Follow the steps outlined in the [quick start guide](https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database) provided by Vercel. This guide will assist you in creating and configuring your Postgres database instance on Vercel, enabling your application to interact with it.

Remember to update your environment variables (`POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`) in the `.env` file with the appropriate credentials provided during the Postgres database setup.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example).

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

If you would like to use [local database](https://www.prisma.io/docs/orm/overview/databases/postgresql):

1. Add an environment variable like `DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE` to your `.env` file
2. Update the datasource in `schema.prisma` file
```
datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}
```

Finally
```
npm install
npm run dev
```