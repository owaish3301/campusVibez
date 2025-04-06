# System Patterns: CampusVibe

## High-Level Architecture
```mermaid
graph TD
    Client[Client App] --> Auth[Authentication Layer]
    Auth --> Guards[Route Guards]
    Guards --> Features[Feature Components]
    Features --> ErrorBoundary[Error Boundary]
    Features --> State[State Management]
    State --> Firebase[Firebase Services]
    
    subgraph Security
        Auth
        Guards
        Rules[Security Rules]
    end
    
    subgraph Error Handling
        ErrorBoundary
        Toast[Toast System]
        Offline[Offline Detection]
    end
    
    subgraph State Management
        Context[Context Providers]
        Hooks[Custom Hooks]
        Cache[Local Cache]
    end
```

## Security Patterns
### Authentication Flow
```mermaid
graph LR
    Login[Login Request] --> Validate[Rate Limiting]
    Validate --> Auth[Firebase Auth]
    Auth --> Session[Session Management]
    Session --> Guard[Route Guard]
```

### Data Access Rules
```mermaid
graph TD
    Request[Data Request] --> Auth[Auth Check]
    Auth --> Verify[Verification Check]
    Verify --> RateLimit[Rate Limiting]
    RateLimit --> Validate[Data Validation]
    Validate --> Access[Access Grant/Deny]
```

## Error Handling Pattern
```mermaid
graph TD
    Error[Error Occurs] --> Boundary[Error Boundary]
    Boundary --> Type[Error Type Check]
    Type --> UI[User Feedback]
    UI --> Recovery[Recovery Action]
    
    subgraph User Feedback
        Toast[Toast Notification]
        ErrorPage[Error Page]
        Indicator[Status Indicator]
    end
```

## Component Architecture
### Core Components
- **ErrorBoundary**: Global error catching and recovery
- **RouteGuard**: Authentication and route protection
- **ToastProvider**: User notifications system
- **OfflineIndicator**: Network status management

### Security Components
- Rate limiting implementation
- Session management
- Data validation
- Access control

### State Management
- Context-based state
- Custom hooks for shared logic
- Local cache management
- Offline state handling

## Security Rules Structure
### Firestore Rules
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper Functions
    function isAuthenticated() { ... }
    function isVerified() { ... }
    function notRateLimited() { ... }
    
    // Data Validation
    function isValidUserData() { ... }
    function isValidQuestion() { ... }
    function isValidAnswer() { ... }
    
    // Collection Rules
    match /users/{userId} { ... }
    match /questions/{questionId} { ... }
    match /answers/{answerId} { ... }
    match /chats/{chatId} { ... }
  }
}
```

## Error Recovery Patterns
1. **Component Level**
   - Try-catch blocks
   - Error boundaries
   - Fallback UI
   
2. **Network Level**
   - Offline detection
   - Request retries
   - Cache management
   
3. **User Feedback**
   - Toast notifications
   - Error pages
   - Loading states

## State Management Patterns
1. **Authentication State**
   ```typescript
   interface AuthState {
     user: User | null;
     loading: boolean;
     error: Error | null;
   }
   ```

2. **UI State**
   ```typescript
   interface UIState {
     toasts: Toast[];
     loading: boolean;
     offline: boolean;
   }
   ```

3. **Cache State**
   ```typescript
   interface CacheState {
     data: Record<string, any>;
     timestamp: number;
     valid: boolean;
   }
   ```

## Navigation Patterns
1. **Route Protection**
   - Authentication checks
   - Role verification
   - Onboarding status
   
2. **Deep Linking**
   - State preservation
   - Return path handling
   - Authentication redirect

## Data Flow Patterns
```mermaid
graph TD
    Action[User Action] --> Validate[Validation]
    Validate --> Cache[Check Cache]
    Cache --> API[API Request]
    API --> Store[Store Result]
    Store --> UI[Update UI]
    
    subgraph Error Handling
        API --> Error[Error Check]
        Error --> Retry[Retry Logic]
        Error --> Notify[User Notification]
    end
```

## Performance Patterns
1. **Loading Optimization**
   - Route-based code splitting
   - Lazy loading
   - Preloading critical assets

2. **State Management**
   - Selective re-rendering
   - Memoization
   - State normalization

3. **Data Management**
   - Caching strategies
   - Offline persistence
   - Batch operations
