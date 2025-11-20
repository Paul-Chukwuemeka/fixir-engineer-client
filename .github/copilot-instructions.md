# Copilot Instructions - Fixxir Engineer Client

## Project Overview
This is a Next.js 15 App Router application that displays a live dashboard of repair/service requests from a Notion database. The app polls the Notion API every 60 seconds to display real-time updates of client repair requests.

## Architecture & Key Files

### Data Flow
1. Client requests data via polling (`page.tsx` fetches every 60s)
2. `/api/notion-table/route.ts` - API route handler
3. `lib/notion.ts` - Notion API integration layer
4. Type-safe responses using `types.ts` definitions

### Type System (`src/types.ts`)
- Comprehensive Notion API types covering 20+ property types
- **Critical**: `NotionPageProperties` defines the exact schema of the Notion database
- When adding properties, define discriminated union types: `NotionPropertyBase<"type", { type: data }>`
- Example properties: `"Client Name"`, `"Phone Number"`, `"Status"`, `"Device"`, etc.

## Developer Workflows

### Development
```bash
npm run dev        # Uses Turbopack for faster HMR
```

### Build & Deploy
```bash
npm run build      # Production build with Turbopack
npm start          # Serve production build
npm run lint       # ESLint with Next.js rules
```

## Project-Specific Conventions

### Import Aliases
- Use `@/*` for all src imports: `import { NotionPage } from "@/types"`
- Never use relative imports for src files

### Client Components Pattern
- Main page (`page.tsx`) is a client component (`"use client"`)
- Polling pattern: 60-second intervals with cleanup on unmount
- State management: `loading`, `error`, `data` states in all data-fetching components

### API Routes
- Located in `src/app/api/*`
- Use Next.js 15 `NextResponse` for JSON responses
- Error handling: Return 500 with error object on failure

### Styling
- Tailwind CSS 4.x with PostCSS plugin
- Custom fonts: Geist Sans & Geist Mono (loaded via `next/font/google`)
- Inline SVGs for icons (see refresh button in `page.tsx`)

## Environment Variables
Required in `.env.local`:
```
NOTION_SECRET=         # Notion integration token
NOTION_DATABASE_ID=    # Database ID to query
```

## Critical Integration Points

### Notion API
- **Version**: 2022-06-28 (specified in headers)
- **Endpoint**: `https://api.notion.com/v1/databases/{id}/query`
- **Page size**: Limited to 100 results per query
- **Authentication**: Bearer token in Authorization header

### Type Safety with Notion
When accessing Notion properties:
```tsx
const props = item.properties as NotionPageProperties;
props["Client Name"].rich_text[0]?.plain_text  // Always use optional chaining
```

## Common Patterns

### Data Fetching Pattern
```tsx
async function load() {
  setLoading(true);
  setError({ isError: false, message: "" });
  try {
    const data = await axios.get("/api/notion-table");
    setData(data.data.results);
  } catch (error) {
    setError({ isError: true, message: "Failed to fetch data" });
  } finally {
    setLoading(false);
  }
}
```

### Component Structure
- `components/loading.tsx` - Full-screen overlay with black/50 background
- `components/error.tsx` - Takes `load` function prop for retry
- Components are functional with TypeScript props interfaces

## Technology Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **React**: 19.1.0
- **Build Tool**: Turbopack (via `--turbopack` flag)
- **HTTP Client**: Axios for API calls
- **Styling**: Tailwind CSS 4.x
- **Real-time** (Future): Socket.IO client/server included but not yet implemented

## Important Notes
- Always use TypeScript - strict mode enabled
- Target ES2017 for compatibility
- Use `"use client"` directive for interactive components
- Notion property access requires exact key matching (e.g., `"Client Name"`, not `clientName`)
