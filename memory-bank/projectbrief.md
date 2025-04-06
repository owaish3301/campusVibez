CampusVibe – College Blind-Date Platform


---

Core Idea

CampusVibe is a blind-date platform designed for college students to spark authentic, anonymous connections through question-based interactions and personality matching.

Students sign up, complete a short personality quiz, and can ask or answer one meaningful question per day.

Questions are shown to the opposite gender, sorted by personality compatibility.

When someone answers a question, the asker can initiate a 5-minute anonymous chat.

During the chat, if both participants like each other, the chat stays permanently; if not, it vanishes.

The focus is on genuine connection first, identity later.



---

MVP Features (Web + Firebase)

1. Authentication & Onboarding

Firebase Auth (Google OAuth)

Onboarding flow:

Name, Gender, InterestedIn

Short personality quiz (MBTI-lite)


Store user info in users/ collection in Firestore



---

2. Home Page Tabs

A. Ask a Question

Limit: 1 question per day

Text input (with optional tags like: Deep, Funny, Flirty)

Save to questions/ collection

Displayed only to opposite gender users


B. Answer a Question

Feed of questions from opposite gender

Sorted by personality compatibility score

Text input to submit answers

Save to answers/ collection



---

3. Anonymous Chat System

If asker likes an answer, they can send an invite

Receiver can accept/reject

If accepted:

A 5-minute anonymous chat is created (chats/ collection)

Real-time messaging via Firestore subcollection messages/


Users can press a "I like this person" button

If both like, chat becomes permanent

If not, chat is deleted after 5 minutes




---

4. Profile Page

Edit Name, Bio, Personality Type

View past questions and answers



---

5. Firebase Services Used

Authentication – Firebase Auth

Database – Firestore (users, questions, answers, chats)

Cloud Functions – (Optional) to auto-expire chats, calculate compatibility

Hosting – Deploy React app via Firebase Hosting



---

Development Plan (Phases + Tasks)


---

PHASE 1 – Setup

[ ] Create Firebase project

[ ] Enable Auth (Google) and Firestore

[ ] Set up React project (Vite + Tailwind)

[ ] Install and configure Firebase SDK



---

PHASE 2 – Auth & Onboarding

[ ] Signup/Login using Firebase Google OAuth

[ ] Onboarding screen for profile & quiz

[ ] Save user data to Firestore users/



---

PHASE 3 – Home Page: Ask & Answer

[ ] Ask a Question UI + logic (limit 1/day)

[ ] Save to questions/, visible to opposite gender

[ ] Answer Questions feed

[ ] Sort based on basic compatibility (client-side for now)

[ ] Submit answer → saved to answers/



---

PHASE 4 – Anonymous Chat

[ ] Asker can like an answer and send invite

[ ] If accepted → create 5-min chat

[ ] Real-time messages using Firestore

[ ] Like buttons to confirm connection

[ ] Expire chat if not mutual



---

PHASE 5 – Profile Page

[ ] View & edit name, bio

[ ] Show question/answer history



---

PHASE 6 – Final Touches

[ ] Firestore security rules

[ ] Responsive design

[ ] Deploy to Firebase Hosting



---

Bonus / Future Features

Personality-based match scoring (with backend logic)

Leaderboards for creative questions

Voice chat or audio messages

Admin moderation tools



---
