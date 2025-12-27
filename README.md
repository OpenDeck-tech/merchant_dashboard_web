# Opendeck Merchant Dashboard

Web dashboard for gambling/gaming operators to manage their payment operations.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## Features

- 📊 Dashboard overview with key metrics
- 💰 Revenue tracking and charts
- 📝 Transaction management
- 👥 Player management
- 📈 Analytics and insights
- 🔒 API key authentication

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Recharts** - Charts
- **Axios** - HTTP client

## API Integration

The dashboard connects to the Merchant Dashboard API running on port 8001.

Make sure the backend is running:
```bash
cd python_services/merchant_dashboard
uvicorn main:app --reload --port 8001
```

