This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First install the dependencies:

npm install

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

model-comp-playground/     
├── app/      
│ ├── api/     
│ │ ├── compare/     
│ │ │ └── route.ts *Backend API to compare responses for 3 LLMs*     
│ │ ├── history/     
│ │ │ ├── [id]/     
│ │ │ │ └── route.ts * Get a single comparison by ID*     
│ │ │ └── route.ts * Get all comparisons, stored previously*     
│ │ ├── login/     
│ │ │ └── route.ts * An endpoint to login, using email and password*     
│ │ └── signup/     
│ │ └── route.ts * An endpoint to create a new user*     
│ ├── history/     
│ │ ├── [id]/     
│ │ │ └── page.tsx * UI to see a single comparison result*     
│ │ └── page.tsx * UI to see previously stored comparisons*     
│ ├── login/     
│ │ └── page.tsx * Login UI*     
│ ├── signup/     
│ │ └── page.tsx * Signup UI*     
│ ├── page.tsx * UI to input Prompt input and compare models*     
│ └── globals.css * Global styles*     
│     
├── components/     
│ ├── Navbar.tsx * Navbar component*     
│ ├── PromptInput.tsx * Prompt input box component*     
│ ├── ModelResponseCard.tsx * component for a model response*     
│ ├── HistoryList.tsx * component for a list of past comparisons*     
│ ├── ThemeToggle.tsx * component for Dark/Light toggle*     
│     
├── hooks/     
│ ├── useCompareModel.ts * Custom hook to compare models*     
│ ├── useAuth.ts * Custom hook for Signup/login/logout logic*     
│ ├── useAuthGuard.ts * Custom hook to protect routes based on login state*     
│     
├── lib/     
│ ├── mongoose.ts * MongoDB connection logic*     
│ ├── models/     
│ │ ├── Comparison.ts * Mongoose schema for prompt and responses*     
│ │ └── User.ts * Mongoose schema for email and password*     
│ └── models.ts * LLM model-specific API handlers*     
│     
├── public/       
├── .env.local * Environment variables*     
├── tailwind.config.ts       
├── tsconfig.json       
└── next.config.js     
