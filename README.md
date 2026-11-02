# Expense Planner

A full-stack budgeting app for tracking earnings and expenses. It's built as a **pnpm monorepo** with a **Next.js** frontend and a **NestJS** REST API backed by **MongoDB**.

You add money coming in (earnings) and money going out (expenses), and the dashboard shows your total budget, what you've spent and what's left.

## Features

- **Dashboard** with three totals: budget (all earnings), total expenses, and remaining balance
- **Add** an earning or an expense from one form
- **Edit and delete** entries through pop-up dialogs
- **REST API** with separate modules for expenses and earnings (create, read, update, delete)
- **Input validation** on the API with DTOs and `class-validator`
- **Server and client components** in the Next.js App Router: totals are fetched on the server, and forms run on the client

## Tech stack

| Layer    | Tools |
|----------|-------|
| Frontend | Next.js 14 (App Router), React, TypeScript, Bootstrap, Tailwind CSS |
| Backend  | NestJS, TypeScript, Mongoose, class-validator |
| Database | MongoDB |
| Tooling  | pnpm workspaces, ESLint, Prettier |

## Project structure

```
apps/
  client/                 Next.js frontend
    src/app/              pages (App Router)
    src/components/       Budget, Remaining, ExpenseList, EarningList, AddAmountForm, popups
    src/services/         API calls
  server/                 NestJS backend
    src/components/
      expenses/           controller, service, schema, DTOs
      earnings/           controller, service, schema, DTOs
```

## API

Both resources have the same endpoints. Replace `expense` with `earning` for earnings.

| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| GET    | `/expense`            | List all expenses |
| GET    | `/expense/:id`        | Get one expense |
| POST   | `/expense/addAmount`  | Create an expense (`description`, `amount`) |
| PUT    | `/expense/:id`        | Update an expense |
| DELETE | `/expense/:id`        | Delete an expense |

## Getting started

### Requirements

- Node.js 18 or newer
- pnpm (`npm install -g pnpm`)
- MongoDB running locally on `mongodb://localhost:27017`

### Run it

```bash
pnpm install
pnpm dev
```

This starts both apps at once:

- API: `http://localhost:4000`
- Web app: `http://localhost:3000`

## Author

**Rashni Athapattu**, Full-Stack Software Engineer, Stockholm
[GitHub](https://github.com/RashniAthapattu)
