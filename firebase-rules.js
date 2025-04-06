// This file contains the Firestore security rules to be deployed to Firebase
// It's not used directly in the app, but serves as documentation and can be deployed using the Firebase CLI

/*
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isVerified() {
      return isAuthenticated() && request.auth.token.email_verified == true;
    }
    
    function isValidUserData(data) {
      return data.keys().hasAll(['uid', 'email', 'name', 'gender', 'interestedIn', 'createdAt']) &&
             data.uid is string &&
             data.email is string &&
             data.name is string &&
             data.gender in ['male', 'female', 'other'] &&
             data.interestedIn in ['male', 'female', 'everyone'];
    }
    
    function isValidQuestion(data) {
      return data.keys().hasAll(['authorId', 'text', 'tags', 'createdAt', 'isActive']) &&
             data.authorId is string &&
             data.text is string &&
             data.tags is list &&
             data.isActive is bool;
    }
    
    function isValidAnswer(data) {
      return data.keys().hasAll(['questionId', 'authorId', 'text', 'createdAt']) &&
             data.questionId is string &&
             data.authorId is string &&
             data.text is string;
    }
    
    // Rate limiting function
    function notRateLimited(path) {
      let recentWrites = getAfter(/databases/$(database)/documents/users/$(request.auth.uid)/rateLimits/$(path)).data.count;
      return recentWrites == null || recentWrites < 5;
    }
    
    // User profiles
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId) && isValidUserData(request.resource.data);
      allow update: if isOwner(userId);
      allow delete: if false; // Users cannot be deleted through the client
      
      // Rate limiting subcollection
      match /rateLimits/{limitType} {
        allow read: if isOwner(userId);
        allow write: if false; // Only writable through Cloud Functions
      }
    }
    
    // Questions
    match /questions/{questionId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
                     request.resource.data.authorId == request.auth.uid && 
                     isValidQuestion(request.resource.data) &&
                     notRateLimited('questions');
      allow update: if isOwner(resource.data.authorId) && 
                     request.resource.data.authorId == resource.data.authorId;
      allow delete: if isOwner(resource.data.authorId);
    }
    
    // Answers
    match /answers/{answerId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && 
                     request.resource.data.authorId == request.auth.uid && 
                     isValidAnswer(request.resource.data) &&
                     notRateLimited('answers');
      allow update: if isOwner(resource.data.authorId) && 
                     request.resource.data.authorId == resource.data.authorId;
      allow delete: if isOwner(resource.data.authorId);
    }
    
    // Chats
    match /chats/{chatId} {
      allow read: if isAuthenticated() && 
                   (resource.data.participants[request.auth.uid] == true);
      allow create: if false; // Only created through Cloud Functions
      allow update: if isAuthenticated() && 
                     (resource.data.participants[request.auth.uid] == true) &&
                     !resource.data.expired;
      allow delete: if false; // Only deleted through Cloud Functions
      
      // Chat messages
      match /messages/{messageId} {
        allow read: if isAuthenticated() && 
                     get(/databases/$(database)/documents/chats/$(chatId)).data.participants[request.auth.uid] == true;
        allow create: if isAuthenticated() && 
                       request.resource.data.senderId == request.auth.uid &&
                       get(/databases/$(database)/documents/chats/$(chatId)).data.participants[request.auth.uid] == true &&
                       !get(/databases/$(database)/documents/chats/$(chatId)).data.expired;
        allow update: if false; // Messages cannot be updated
        allow delete: if false; // Messages cannot be deleted
      }
    }
  }
}
*/

// Export a comment to make this a valid JS file
export const firestoreRules = "// See the rules above for Firestore security rules"

