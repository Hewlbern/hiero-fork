<h1 align="center">Hiero</h1>

<p align="center">
One subscription to access multiple usage based apps
</p>

##

- [Live Site]: hiero.gl

- [GitHub Project](https://github.com/Hiero-Team/hiero)
- [Vercel Team](https://vercel.com/hiero-team)
- [Supabase Team](https://supabase.com/dashboard/org/vercel_icfg_Tt0NDeYl7Mgx6gcT1CNXFVEJ/team)

## Features

- Shared token based usage billing system used to access multiple usage based apps with one subscription
- Developers can sign up and create apps
- They can link to their app to invite users
- Users can authorise an app to take tokens
- API is included

## Vercel

Vercel is used for hosting and deployment. Join the [Hiero Team](https://vercel.com/hiero-team)

1. Install the Vercel CLI `pnpm i -g vercel@latest`
2. Link your local project to the vercel environment using the `vercel link` CLI command.
3. Pull local environmment variables `vercel env pull .env.local`

## Supabase

Supabase is used for auth and as a hosted postgres database. Join the [Hiero Team](https://supabase.com/dashboard/org/vercel_icfg_Tt0NDeYl7Mgx6gcT1CNXFVEJ/team)

The production database is hiero-team-supabase and we are using branching to manage preview deployments on Vercel. There is a connection between Supabase, Vercel, and Github. When Supabase sees a a new migration file checked into a branch, it will create a preview database. This allows you to test data changes in a hosted environment prior to deployment.

However you should develop locally on a _local_ version of Supabase which is a clone of production.

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

1. Install supabase locally
2. Login `supbase login`
3. Link to the main project using `supabase supabase link --project-ref <project-id>`. You can get `<project-id>` from your project's dashboard URL: `https://supabase.com/dashboard/project/<project-id>`
4. Start the local database `supbase start`. Note this will use Docker
5. Create a `.env.development.local` environment variable file so you can use the local db when running locally. Create the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ANON KEY from local supabase>
SUPABASE_SERVICE_ROLE_KEY=<SERVICE KEY from local supabase>
```

You can get these from the local supbase using `supabase status` at any time.

## Data migrations

The workflow is:

1. Change locally - go into the Supabase web interface [locally](http://127.0.0.1:54323/)
2. Create a migration file - `supbase db diff -f <name migration>`
3. Check in that migration file _on a branch_
4. Create a PR and wait for Supabase to verify the migration worked
5. Merge the PR

## Clone and run locally

We're using pnpm as the package manager.

After cloning the repo, linking Vercel, pulling enviroment variables and setting up supabase:

1. `pnpm i` to install all the libaries
2. `pnpm dev` to run locally

You should now be running on [localhost:3000](http://localhost:3000/).

# Coding conventions

1. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)
2. Currently not using an ORM
