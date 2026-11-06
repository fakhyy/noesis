# Noesis

**A minimal space to capture, organize, and revisit your thoughts.**

Noesis is a personal thought-management application designed to help you capture ideas without distractions. Write down your thoughts, organize your thinking, and keep everything in one place.

<!-- Replace with your application screenshot -->
![Noesis Preview](./public/images/preview.png)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Start PostgreSQL](#start-postgresql)
  - [Database Migrations](#database-migrations)
  - [Development Server](#development-server)
- [Docker](#docker)
- [Deployment](#deployment)
  - [Vercel](#vercel)
  - [Production Environment Variables](#production-environment-variables)
  - [Database Migration](#production-database-migration)
- [Production Checklist](#production-checklist)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Thought Management:** Create, edit, and manage your thoughts.
- **Trash:** Move thoughts to trash, restore them, or permanently delete them.
- **Archive:** Keep thoughts you want to preserve outside your active workspace.
- **Authentication:** Secure authentication powered by Better Auth.
- **Email Integration:** Transactional email support through Resend.
- **Landing Page:** Configurable public landing page.
- **Signup Control:** Enable or disable new user registrations.
- **Responsive UI:** Designed for desktop and mobile devices.
- **PostgreSQL:** Reliable relational data storage.

## Screenshots

<!-- Replace these placeholders with actual screenshots -->

<!-- | Dashboard | Thought Editor |
|---|---|
| ![Dashboard](./public/images/dashboard.png) | ![Thought Editor](./public/images/thought-editor.png) |

| Trash | Archive |
|---|---|
| ![Trash](./public/images/trash.png) | ![Archive](./public/images/archive.png) | -->

![Thought Editor](./public/images/thought-editor.png)

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | Application framework |
| [React](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) | UI components |
| [Drizzle ORM](https://orm.drizzle.team/) | Database ORM |
| [PostgreSQL](https://www.postgresql.org/) | Database |
| [Better Auth](https://www.better-auth.com/) | Authentication |
| [Resend](https://resend.com/) | Email delivery |
| [Bun](https://bun.sh/) | JavaScript runtime and package manager |
| [Docker](https://www.docker.com/) | Local database development |
| [Vercel](https://vercel.com/) | Deployment |

## Getting Started

### Prerequisites

Make sure you have installed:

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://docs.docker.com/get-docker/)
- Git
- A PostgreSQL-compatible database

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/noesis.git

cd noesis
```

**2. Install dependencies**

```bash
bun install
```

**3. Configure environment variables**

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Update the variables according to your environment.

### Environment Variables

Noesis uses environment variables for application configuration, database connectivity, authentication, and optional integrations.

#### Environment Variable Reference

| Variable | Required | Default / Example |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection URL |
| `BETTER_AUTH_URL` | Yes | `http://localhost:3000` |
| `BETTER_AUTH_SECRET` | Yes | Random secret |
| `ENABLE_SIGNUP` | No | `1` |
| `SHOW_LANDING_PAGE` | No | `1` |
| `RESEND_API_KEY` | No* | Resend API key |

\* Resend is optional unless you use functionality that requires outgoing email.

#### Application Configuration

**ENABLE_SIGNUP**

Controls whether new users can register.

```env
ENABLE_SIGNUP=1
```

- `1`: Allow new user registrations.
- `0`: Disable new user registrations.

Default: `1`

**SHOW_LANDING_PAGE**

Controls whether the public landing page is displayed.

```env
SHOW_LANDING_PAGE=1
```

- `1`: Show the public landing page.
- `0`: Hide the landing page.

Default: `1`

#### Database Configuration

**DATABASE_URL**

PostgreSQL connection string used by Drizzle ORM.

```env
DATABASE_URL="postgresql://noesis:noesis_dev@localhost:5432/noesis"
```

For production, use the connection string provided by your PostgreSQL hosting provider.

#### Authentication Configuration

**BETTER_AUTH_URL**

The base URL of your application, used by Better Auth.

Local development:

```env
BETTER_AUTH_URL="http://localhost:3000"
```

Production:

```env
BETTER_AUTH_URL="https://your-domain.com"
```

**BETTER_AUTH_SECRET**

A secret used by Better Auth for cryptographic operations.

Generate a secure secret:

```bash
openssl rand -base64 32
```

Add the generated value to your environment:

```env
BETTER_AUTH_SECRET="your-generated-secret"
```

Never expose this secret in client-side code or commit it to Git.

#### Email Configuration

**RESEND_API_KEY**

Optional API key for the Resend email provider.

```env
RESEND_API_KEY="re_your_api_key"
```

Get an API key from [Resend](https://resend.com/).

Configure and verify your sending domain before using it for production emails.

### Start PostgreSQL

Noesis uses PostgreSQL 17 Alpine for local development.

Start the database:

```bash
bun run db:up
```

Check database status:

```bash
docker compose ps
```

Check PostgreSQL logs:

```bash
docker compose logs db
```

### Database Migrations

Noesis uses Drizzle ORM to manage its PostgreSQL database.

Generate migrations:

```bash
bunx run db:generate
```

Apply migrations:

```bash
bunx run db:migrate
```

Open Drizzle Studio:

```bash
bunx run db:studio
```

Whenever you modify the database schema, generate and apply the corresponding migrations.

Commit migration files to Git so production deployments can apply the same schema changes.

### Development Server

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

Example `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:17-alpine
    container_name: noesis-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: noesis
      POSTGRES_PASSWORD: noesis_dev
      POSTGRES_DB: noesis
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U noesis -d noesis"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

Start PostgreSQL:

```bash
bun run db:up
```

Stop PostgreSQL:

```bash
bun run db:down
```

Stop and remove the database volume:

```bash
bun run db:down -v
```

**Warning:** Removing the volume permanently deletes the locally stored database data.

## Deployment

Noesis can be deployed to Vercel with a managed PostgreSQL database.

### Vercel

**1. Push your repository to GitHub**

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

**2. Import your project**

1. Visit [Vercel](https://vercel.com/).
2. Sign in with GitHub.
3. Select **Add New Project**.
4. Import your Noesis repository.
5. Vercel should automatically detect Next.js.
6. Deploy your project.

**3. Set up a production PostgreSQL database**

Vercel does not automatically provide a persistent PostgreSQL database.

Choose a PostgreSQL hosting provider:

- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Vercel Marketplace](https://vercel.com/marketplace)

Create a database and copy its connection string.

Do not use your local Docker database URL in production.

### Production Environment Variables

Open:

**Vercel Dashboard → Your Project → Settings → Environment Variables**

Add the following:

```env
DATABASE_URL=your_production_postgresql_url

BETTER_AUTH_URL=https://your-domain.com

BETTER_AUTH_SECRET=your_production_secret

ENABLE_SIGNUP=1

SHOW_LANDING_PAGE=1

RESEND_API_KEY=your_resend_api_key
```

Configure variables for the Production environment. Add separate Preview and Development values if needed.

### Custom Domain

Go to:

**Vercel Dashboard → Your Project → Settings → Domains**

Add your custom domain and configure the DNS records provided by Vercel.

Update:

```env
BETTER_AUTH_URL=https://your-domain.com
```

Make sure your production domain is included in Better Auth's trusted origins.

### Production Database Migration

Before serving production traffic, apply your Drizzle migrations against the production database:

```bash
DATABASE_URL="your_production_database_url" bunx drizzle-kit migrate
```

You can run this from your local machine or through a dedicated deployment step.

Avoid running migrations concurrently from multiple application instances.

### Redeploy

After configuring environment variables and applying migrations, redeploy your project.

Your Noesis application should now be accessible through your production domain.

## Production Checklist

Before making Noesis publicly available, verify the following:

- [ ] Production PostgreSQL database configured.
- [ ] Database migrations applied.
- [ ] `BETTER_AUTH_URL` matches the production domain.
- [ ] Strong, unique `BETTER_AUTH_SECRET` configured.
- [ ] Trusted authentication origins configured.
- [ ] Resend API key configured if email functionality is enabled.
- [ ] Email sending domain verified.
- [ ] Signup settings configured.
- [ ] Landing page settings configured.
- [ ] Environment variables configured for the correct Vercel environments.
- [ ] `.env` excluded from Git.
- [ ] Database backups enabled.
- [ ] Production authentication and signup tested.

## Security

- Never commit `.env` files or production credentials.
- Always use HTTPS in production.
- Keep Better Auth secrets private.
- Use environment variables for sensitive configuration.
- Restrict database access to trusted connections.
- Verify ownership of thoughts on every server-side operation.
- Never rely exclusively on client-side authorization.
- Use soft deletion for trash functionality and validate permanent deletion server-side.

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your implementation.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with care.
</p>
