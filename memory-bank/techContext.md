# Tech Context: CampusVibe

## Frontend Stack
### Core Framework
- **Framework:** React v19.0.0
- **Build Tool:** Vite v6.2.0
- **Language:** JavaScript (ES Modules via `"type": "module"`)
- **React Plugin:** @vitejs/plugin-react v4.3.4

### UI Technologies
- **CSS Framework:** Tailwind CSS
- **Component Library:** Shadcn UI
- **Animation Library:** Framer Motion
- **Icons:** Lucide React

### Form Management
- **Form Library:** react-hook-form
- **Validation:** Zod
- **Form-Validation Bridge:** @hookform/resolvers/zod

## Backend Services (Firebase)
### Active Services
- Firebase Authentication (Google OAuth provider)
- Firestore (NoSQL Database)
- Firebase Hosting (Deployment)

### Planned Services
- (Optional) Firebase Cloud Functions
  - Chat expiration
  - Compatibility calculations
  - Background tasks

## Development Tools
### Code Quality
- **Linter:** ESLint v9.21.0
  - Plugins:
    - @eslint/js
    - eslint-plugin-react-hooks
    - eslint-plugin-react-refresh
- **Globals:** globals v15.15.0
- *(Formatter to be added: Prettier consideration)*

### Dependencies
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "firebase": "latest",
    "react-hook-form": "latest",
    "framer-motion": "latest",
    "@hookform/resolvers": "latest",
    "zod": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.2.0",
    "eslint": "^9.21.0",
    "globals": "^15.15.0",
    "tailwindcss": "latest",
    "@types/node": "latest"
  }
}
```

## Development Workflow
1. **Local Development:**
   ```bash
   npm run dev    # Start Vite dev server
   npm run lint   # Run ESLint
   npm run build  # Production build
   ```

2. **Firebase Development:**
   - Local testing with Firebase Emulator Suite
   - Direct interaction with Firebase services via SDK

3. **Deployment:**
   ```bash
   npm run build          # Build the app
   firebase deploy        # Deploy to Firebase Hosting
   ```

## Firebase Configuration
- Project configuration in `src/firebaseConfig.js`
- Authentication set up for Google OAuth
- Firestore rules to be implemented
- Hosting configuration in `firebase.json`

## Data Models
### User Profile
```typescript
interface UserProfile {
  uid: string;
  email: string;
  name: string;
  gender: "male" | "female" | "other";
  interestedIn: "male" | "female" | "everyone";
  createdAt: Timestamp;
  needsOnboarding: boolean;
  profileDetails: {
    relationshipGoals: "casual" | "long-term" | "friendship";
    interests: string[];
    bio: string;
    height: number;
    languages: string[];
    pets: "yes" | "no";
    favorites: {
      songs: string;
      movies: string;
    };
  };
}
```

### Question (To Be Implemented)
```typescript
interface Question {
  id: string;
  authorId: string;
  text: string;
  tags: string[];
  createdAt: Timestamp;
  isActive: boolean;
}
```

### Answer (To Be Implemented)
```typescript
interface Answer {
  id: string;
  questionId: string;
  authorId: string;
  text: string;
  createdAt: Timestamp;
}
```

## Environment Setup Required
1. Firebase Project
   - Enable Authentication (Google provider)
   - Set up Firestore database
   - Configure Firebase Hosting

2. Local Environment
   - Node.js & npm
   - Firebase CLI
   - VSCode Extensions:
     - ESLint
     - Tailwind CSS IntelliSense
     - Firebase (optional)

## Performance Considerations
- Lazy loading for route components
- Optimistic UI updates
- Firestore query optimization
- Animation performance monitoring
- Bundle size optimization
