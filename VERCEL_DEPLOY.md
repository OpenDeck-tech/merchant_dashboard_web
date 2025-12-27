# Deploying Merchant Dashboard to Vercel

This guide will help you deploy the Opendeck Merchant Dashboard to Vercel. Vercel is the recommended platform for Next.js applications as it's built by the same team and offers native Next.js support.

## Why Vercel?

- ✅ **Native Next.js Support** - Built by the creators of Next.js
- ✅ **Zero Configuration** - Automatic optimizations and routing
- ✅ **Edge Network** - Global CDN with edge functions
- ✅ **Automatic HTTPS** - SSL certificates included
- ✅ **Preview Deployments** - Automatic previews for every PR
- ✅ **Analytics** - Built-in performance monitoring

## Prerequisites

1. A Vercel account (sign up at https://vercel.com - free tier available)
2. The merchant dashboard code in a Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js 18+ installed locally (for testing builds)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git**
   ```bash
   cd merchant_dashboard_web
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Connect your Git provider (GitHub/GitLab/Bitbucket)
   - Select the repository containing `merchant_dashboard_web`

3. **Configure Project Settings**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `merchant_dashboard_web` (if repo is at root, otherwise leave empty)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://api.opendeck.co.uk/api/merchant
   ```
   
   You can set different values for:
   - **Production:** `https://api.opendeck.co.uk/api/merchant`
   - **Preview:** `https://staging-api.opendeck.co.uk/api/merchant` (optional)
   - **Development:** `http://localhost:8001` (for local dev)

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your dashboard
   - You'll get a URL like `https://your-site.vercel.app`
   - Production deployments happen automatically on every push to main/master

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to dashboard directory**
   ```bash
   cd merchant_dashboard_web
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production: `vercel --prod`

5. **Set environment variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   - Enter the value when prompted
   - Select environments (Production, Preview, Development)

## Post-Deployment Configuration

### 1. Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `dashboard.opendeck.co.uk`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificates

### 2. Environment-Specific Deployments

Vercel automatically creates:
- **Production:** Deploys from `main`/`master` branch
- **Preview:** Deploys from pull requests and other branches
- **Development:** Local development with `vercel dev`

### 3. Branch Deploys

- Every push to a branch creates a preview deployment
- Every PR gets a unique preview URL
- Production deploys only from main/master (configurable)

### 4. Environment Variables per Environment

Set different API URLs for different environments:
- Production: `https://api.opendeck.co.uk/api/merchant`
- Preview: `https://staging-api.opendeck.co.uk/api/merchant`
- Development: `http://localhost:8001`

## Advanced Configuration

### Automatic Deployments

Vercel automatically:
- Deploys on every push to main/master (production)
- Creates preview deployments for PRs
- Rebuilds on environment variable changes

### Build Optimization

Vercel automatically:
- Optimizes Next.js builds
- Enables static optimization where possible
- Uses edge functions for API routes
- Implements ISR (Incremental Static Regeneration)

### Performance Monitoring

Enable Vercel Analytics:
1. Go to Project Settings → Analytics
2. Enable Web Analytics (free tier available)
3. View performance metrics in dashboard

## Troubleshooting

### Build Fails

1. **Check Node version**
   - Vercel uses Node 18 by default (can be configured in `package.json`)
   - Add to `package.json`:
     ```json
     "engines": {
       "node": "18.x"
     }
     ```

2. **Check dependencies**
   - Run `npm install` locally to ensure all dependencies install correctly
   - Check for peer dependency warnings

3. **Check build logs**
   - View build logs in Vercel dashboard
   - Look for specific error messages
   - Check "Build Logs" tab in deployment details

### API Connection Issues

1. **Verify environment variable**
   - Check that `NEXT_PUBLIC_API_URL` is set correctly
   - Remember: `NEXT_PUBLIC_` prefix is required for client-side access
   - Verify in Project Settings → Environment Variables

2. **Check CORS settings**
   - Ensure your API allows requests from your Vercel domain
   - Add your Vercel URL to CORS allowed origins:
     - `https://your-site.vercel.app`
     - `https://*.vercel.app` (for preview deployments)

3. **Check API availability**
   - Verify the API is accessible from the internet
   - Test the API URL directly in a browser

### Routing Issues

Next.js routing works automatically on Vercel. If you have issues:
- Ensure you're using Next.js App Router or Pages Router correctly
- Check that dynamic routes are properly configured
- Verify `next.config.js` settings

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for the Merchant Dashboard API | `https://api.opendeck.co.uk/api/merchant` |

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy a preview
vercel

# Run local development with Vercel
vercel dev

# View deployment logs
vercel logs

# List all deployments
vercel ls

# View environment variables
vercel env ls

# Add environment variable
vercel env add NEXT_PUBLIC_API_URL

# Remove environment variable
vercel env rm NEXT_PUBLIC_API_URL
```

## Vercel vs Netlify for Next.js

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Next.js Support | Native (made by Vercel) | Plugin required |
| Zero Config | ✅ Yes | ⚠️ Needs config |
| Edge Functions | ✅ Built-in | ✅ Available |
| Preview Deploys | ✅ Automatic | ✅ Automatic |
| Performance | ✅ Optimized | ✅ Good |
| Free Tier | ✅ Generous | ✅ Generous |

**Recommendation:** Use Vercel for Next.js applications.

## Support

For issues or questions:
- Vercel Docs: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Vercel Support: https://vercel.com/support
- Contact: info@opendeck.co.uk

