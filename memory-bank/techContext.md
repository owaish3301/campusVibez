# Tech Context: CampusVibe

## Frontend Stack
### Core Framework
- **Framework:** React v19.0.0
- **Build Tool:** Vite v6.2.0
- **Language:** JavaScript (ES Modules)
- **React Plugin:** @vitejs/plugin-react v4.3.4

### UI Technologies
- **CSS Framework:** Tailwind CSS
- **Component Library:** Shadcn UI
- **Animation Library:** Framer Motion
- **Icons:** Lucide React

### Required Additions
1. **Error Handling & Notifications**
   - react-error-boundary
   - react-hot-toast/sonner
   - custom error hooks

2. **State Management & Caching**
   - zustand/jotai (for global state)
   - react-query/swr (for data fetching/caching)
   - localStorage utilities

3. **Form & Validation**
   - zod (schema validation)
   - react-hook-form
   - custom form hooks

4. **Route Management**
   - react-router-dom
   - route protection HOCs
   - navigation guards

## Backend Services (Firebase)
### Active Services
- Firebase Authentication (Google OAuth)
- Firestore Database
- Firebase Hosting

### Required Security Enhancements
1. **Authentication**
   ```typescript
   interface AuthConfig {
     persistence: 'LOCAL' | 'SESSION' | 'NONE';
     sessionTimeout: number;
     maxAttempts: number;
     requireEmailVerification: boolean;
     passwordRequirements: {
       minLength: number;
       requireNumber: boolean;
       requireSpecialChar: boolean;
     };
   }
   ```

2. **Firestore Rules**
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // User data access
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth.uid == userId;
       }
       
       // Questions access
       match /questions/{questionId} {
         allow read: if request.auth != null;
         allow create: if canCreateQuestion();
         allow update, delete: if resource.data.authorId == request.auth.uid;
       }
       
       // Rate limiting function
       function canCreateQuestion() {
         let recentQuestions = getRecentQuestions();
         return recentQuestions.size() <= 1;
       }
     }
   }
   ```

## Required Infrastructure
### Error Handling System
```typescript
interface ErrorConfig {
  retry: {
    count: number;
    delay: number;
    backoff: boolean;
  };
  offline: {
    detection: boolean;
    syncQueue: boolean;
  };
  notification: {
    duration: number;
    position: string;
  };
}
```

### State Management
```typescript
interface AppState {
  auth: {
    user: User | null;
    loading: boolean;
    error: Error | null;
  };
  ui: {
    toast: ToastState[];
    modal: ModalState;
    loading: boolean;
  };
  cache: {
    questions: Question[];
    ttl: number;
    lastUpdated: number;
  };
}
```

### Route Protection
```typescript
interface RouteConfig {
  path: string;
  component: React.ComponentType;
  guards: RouteGuard[];
  meta: {
    requiresAuth: boolean;
    requiresProfile: boolean;
    roles: string[];
  };
}
```

## Development Workflow Enhancements
1. **Type Safety**
   - Add TypeScript
   - Strict mode enabled
   - ESLint TypeScript rules

2. **Testing Infrastructure**
   - Vitest for unit testing
   - Testing Library for component tests
   - Cypress for E2E testing

3. **Performance Monitoring**
   - Firebase Performance
   - Error tracking (Sentry)
   - Analytics implementation

4. **Build & Deploy**
   ```bash
   # Development
   npm run dev        # Start dev server
   npm run test       # Run tests
   npm run lint       # Lint code

   # Production
   npm run build      # Build app
   npm run preview    # Preview build
   firebase deploy    # Deploy to Firebase
   ```

## Security Requirements
### Authentication
- Implement session persistence
- Add rate limiting
- Enable email verification
- Add password requirements
- Implement session timeout

### Data Protection
- Implement Firestore rules
- Add data validation
- Enable offline persistence
- Implement batch operations
- Add optimistic updates

### Error Recovery
- Add retry mechanisms
- Implement offline mode
- Add error boundaries
- Enable state recovery

## Performance Requirements
### Loading Optimization
- Implement lazy loading
- Add route-based code splitting
- Enable Firestore caching
- Implement infinite scrolling

### State Management
- Add global error handling
- Implement toast system
- Add loading indicators
- Enable state persistence

### Caching Strategy
- Implement data caching
- Add offline support
- Enable optimistic updates
- Implement pagination

## Environment Variables
```bash
# Firebase Config
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# App Config
VITE_APP_ENV=development
VITE_API_URL=
VITE_SESSION_TIMEOUT=3600
VITE_ENABLE_ANALYTICS=false
