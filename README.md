# NextShop

NextShop is a Next.js e-commerce storefront. Browse products, filter by category, view product details, and add items to a cart. Sign-in is required before checkout.

**Live site:** [https://next-e-commerce-project-6xn9.vercel.app/](https://next-e-commerce-project-6xn9.vercel.app/)

**Repository:** [https://github.com/Aya-Ashreey7/Next_E-commerce_Project](https://github.com/Aya-Ashreey7/Next_E-commerce_Project)

## Features

- Home, product catalog, category list, and product detail pages
- Category filter on the products page
- Shopping cart with quantity updates
- Checkout flow for signed-in users
- Email and password sign-up and sign-in, plus Google and Facebook sign-in
- Cart and checkout routes are protected

Product data comes from the [DummyJSON](https://dummyjson.com) products API.

## Tech stack

- [Next.js](https://nextjs.org) 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- [NextAuth.js](https://authjs.dev) v5

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file for authentication:

```bash
AUTH_SECRET=your-secret
AUTH_URL=http://localhost:3000

AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

AUTH_FACEBOOK_ID=your-facebook-client-id
AUTH_FACEBOOK_SECRET=your-facebook-client-secret
```

`AUTH_SECRET` is required locally and in the Vercel project settings. Without it, sign-in fails with a missing-secret error. Google and Facebook buttons appear only when those provider values are set. Email and password sign-in works without them.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Deploy

The app is deployed on Vercel:

[https://next-e-commerce-project-6xn9.vercel.app/](https://next-e-commerce-project-6xn9.vercel.app/)
