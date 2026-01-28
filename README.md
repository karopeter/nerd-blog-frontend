# Blog Platform - Frontend

A modern, responsive blog platform built with Next.js 16, TypeScript, and Tailwind CSS, featuring real-time search, pagination, and multi-image upload capabilities.

## 🚀 Features

### Core Features
- ✅ **Blog Post Viewer** - Browse and read blog posts with pagination
- ✅ **Advanced Search** - Real-time search with debouncing
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Post Details** - Full post view with image gallery
- ✅ **Server-Side Rendering** - Next.js App Router for optimal performance
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **State Management** - Zustand for global state
- ✅ **Data Fetching** - TanStack Query (React Query) with caching
- ✅ **Form Validation** - Zod schema validation with React Hook Form

### Bonus Features
- 🎯 **Post Creation** - Rich form for creating blog posts
- 🎯 **Multi-Image Upload** - Upload up to 5 images with preview
- 🎯 **Drag & Drop** - Intuitive file upload experience
- 🎯 **Image Gallery** - Interactive thumbnail navigation on post details
- 🎯 **Toast Notifications** - Beautiful success/error feedback
- 🎯 **Optimistic Updates** - Instant UI feedback
- 🎯 **Loading States** - Skeleton screens and loading indicators
- 🎯 **Error Boundaries** - Graceful error handling

---

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Backend API** running (see backend README)

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with SSR/SSG | 16.1.5 |
| **React** | UI library | 19.2.3 |
| **TypeScript** | Type safety | 5.x |
| **Tailwind CSS** | Utility-first CSS framework | 4.x |
| **TanStack Query** | Data fetching & caching | 5.90.20 |
| **Zustand** | State management | 5.0.10 |
| **React Hook Form** | Form management | 7.71.1 |
| **Zod** | Schema validation | 4.3.6 |
| **Axios** | HTTP client | 1.13.3 |
| **Sonner** | Toast notifications | 2.0.7 |
| **Radix UI** | Accessible UI primitives | Latest |

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Optional: For production
# NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Application will start at `http://localhost:3000`

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting
```bash
npm run lint
```

---

## 🗂️ Project Structure
```
frontend/
├── app/
│   ├── posts/
│   │   └── [id]/
│   │       └── page.tsx       # Post detail page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   └── providers.tsx           # React Query provider
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── form.tsx            # Shadcn form components
│   │   ├── input.tsx           # Input component
│   │   ├── label.tsx           # Label component
│   │   └── textarea.tsx        # Textarea component
│   ├── CreatePostForm.tsx      # Post creation modal
│   ├── EmptyState.tsx          # No results state
│   ├── ErrorState.tsx          # Error display component
│   ├── ImageUpload.tsx         # Multi-image upload with preview
│   ├── LoadingState.tsx        # Loading skeleton
│   ├── Pagination.tsx          # Pagination controls
│   ├── PostCard.tsx            # Post card component
│   ├── PostDetail.tsx          # Full post view
│   ├── PostList.tsx            # Posts grid with pagination
│   └── SearchBar.tsx           # Search input with debounce
├── hooks/
│   └── usePosts.ts             # React Query hooks for posts
├── lib/
│   ├── api.ts                  # Axios client & API methods
│   ├── toast.tsx               # Themed toast notifications
│   └── utils.ts                # Utility functions (cn)
├── Schema/
│   └── schema.ts               # Zod validation schemas
├── store/
│   └── usePostStore.ts         # Zustand store for global state
├── types/
│   └── index.ts                # TypeScript interfaces
├── .env.local                  # Environment variables (create this)
├── .gitignore
├── next.config.ts              # Next.js configuration
├── package.json
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md
```

---

## 🎨 Key Components

### 1. **Home Page** (`app/page.tsx`)
- Displays paginated blog posts in a grid
- Search bar with debounced input
- Create post button (opens modal)
- Responsive design

### 2. **Post Detail Page** (`app/posts/[id]/page.tsx`)
- Full post content view
- Image gallery with thumbnails
- Author information
- Tags display
- Back navigation

### 3. **CreatePostForm** (`components/CreatePostForm.tsx`)
- Modal form for creating posts
- React Hook Form with Zod validation
- Multi-image upload with preview
- Character counters for title/excerpt
- Real-time validation feedback

### 4. **ImageUpload** (`components/ImageUpload.tsx`)
- Drag & drop file upload
- Multiple file support (max 5 images)
- File type & size validation
- Image preview with removal
- Cover image badge on first image

### 5. **SearchBar** (`components/SearchBar.tsx`)
- Real-time search with 500ms debounce
- Search across title, content, author, tags
- Clear button
- Loading indicator

---

## 🔄 State Management

### Zustand Store (`store/usePostStore.ts`)
```typescript
interface PostStore {
  currentPage: number;      // Current pagination page
  searchQuery: string;      // Search query string
  limit: number;            // Items per page
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setLimit: (limit: number) => void;
}
```

### React Query
- **Caching**: Automatic caching with stale-while-revalidate
- **Optimistic Updates**: Instant UI feedback
- **Background Refetching**: Keep data fresh
- **Query Keys**: `['posts', page, search, limit]`

---

## 📡 API Integration

### API Client (`lib/api.ts`)
```typescript
// Get paginated posts
postsApi.getPosts({ page: 1, limit: 9, search: 'react' })

// Get single post
postsApi.getPostById('post-id')

// Create post with images
const formData = new FormData()
formData.append('title', 'Post Title')
formData.append('images', file1)
formData.append('images', file2)
postsApi.createPost(formData)
```

---

## 🎨 Styling & Design

### Tailwind CSS Configuration
- **Utility-first approach** for rapid development
- **Custom color palette** with gradients
- **Responsive breakpoints** for mobile/tablet/desktop
- **Custom animations** for smooth transitions

### Design System
- **Primary Color**: Blue (600) to Indigo (600)
- **Typography**: Geist Sans for body, Geist Mono for code
- **Border Radius**: Rounded corners (xl, 2xl, 3xl)
- **Shadows**: Layered shadows for depth
- **Transitions**: Smooth 200-300ms transitions

---

## 🔒 Security Best Practices

✅ **Implemented Security Measures:**
- **Environment Variables** - API URLs in `.env.local` (never committed)
- **Input Validation** - Zod schema validation on all forms
- **XSS Protection** - Next.js automatic escaping
- **CSRF Protection** - Built into Next.js
- **Type Safety** - TypeScript prevents type-related vulnerabilities
- **File Upload Validation** - Client-side file type & size checks
- **Error Boundaries** - Graceful error handling without exposing internals
- **Content Security Policy** - Next.js default CSP headers

🔐 **Additional Recommendations for Production:**
- Implement authentication (NextAuth.js)
- Add rate limiting on API calls
- Use HTTPS only
- Implement content security policy headers
- Add input sanitization for user-generated content
- Use Next.js Image Optimization
- Enable security headers in `next.config.ts`

---

## 🎯 Features in Detail

### Search & Filtering
- **Debounced Search**: 500ms delay to reduce API calls
- **Multi-field Search**: Searches title, content, author, and tags
- **Real-time Results**: Updates as you type
- **Clear Button**: Quick reset of search

### Pagination
- **Configurable Page Size**: Default 9 posts per page
- **Next/Previous Navigation**: Easy page traversal
- **Page Numbers**: Jump to specific pages
- **Responsive Design**: Works on all screen sizes

### Image Management
- **Multi-upload**: Up to 5 images per post
- **Drag & Drop**: Intuitive file selection
- **Preview**: See images before upload
- **Validation**: File type (images only) & size (5MB max)
- **Cover Image**: First image automatically set as cover
- **Thumbnail Gallery**: Navigate through images on detail page

### Form Handling
- **Real-time Validation**: Instant feedback on errors
- **Character Counters**: Track title (200) and excerpt (300) limits
- **Loading States**: Visual feedback during submission
- **Error Handling**: User-friendly error messages
- **Success Toast**: Confirmation on successful creation

---

## 🧪 Testing the Application

### Manual Testing Checklist

**Homepage:**
- [ ] Posts load and display correctly
- [ ] Search filters posts in real-time
- [ ] Pagination controls work
- [ ] "Create Post" button opens modal
- [ ] Responsive on mobile/tablet/desktop

**Post Detail:**
- [ ] Full post content displays
- [ ] Image gallery works (if multiple images)
- [ ] Tags display correctly
- [ ] Back button navigates to homepage
- [ ] Author info shows

**Create Post:**
- [ ] Form validation works
- [ ] Image upload shows previews
- [ ] Can remove uploaded images
- [ ] Character counters update
- [ ] Success toast appears after creation
- [ ] New post appears in list

**Error Handling:**
- [ ] Network errors show error state
- [ ] Empty search shows "No results"
- [ ] Invalid post ID shows 404
- [ ] Form errors display properly

---

## 🐛 Troubleshooting

### API Connection Issues
```bash
# Check backend is running
curl http://localhost:5000/api/posts

# Verify .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Image Display Issues
```bash
# Check next.config.ts has Cloudinary domain
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
}

# Restart dev server after config changes
npm run dev
```

### Hydration Errors
```bash
# Ensure no server/client mismatch
# Check for Date.now() or random values in JSX
# Use 'use client' directive for client-only components
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Adding New Pages
```bash
# Create new route
app/about/page.tsx

# Add to navigation
components/Header.tsx
```

### Modifying API Endpoints
Edit `lib/api.ts`:
```typescript
export const postsApi = {
  // Add new methods here
}
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📊 Performance Optimizations

✅ **Implemented:**
- Next.js Image Optimization
- Code splitting with dynamic imports
- React Query caching
- Debounced search
- Lazy loading images
- Prefetching on hover

🎯 **Future Enhancements:**
- Static Site Generation (SSG) for posts
- Incremental Static Regeneration (ISR)
- Service Worker for offline support
- WebP image format
- CDN integration

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@karopeter](https://github.com/karopeter)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for rapid styling
- TanStack Query for data fetching
- Cloudinary for image optimization
- Open source community

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

## 🎉 Success!

Your blog platform is now ready! If you encounter any issues:
1. Check the troubleshooting section
2. Review environment variables
3. Ensure backend is running
4. Check browser console for errors
5. Open an issue on GitHub

Happy blogging! 🚀✨