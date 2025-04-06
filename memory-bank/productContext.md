# Product Context: CampusVibe

## Problem Solved
College students often struggle to form genuine connections amidst superficial interactions or the pressure of revealing identities too soon. Existing platforms might prioritize appearance over personality, hindering authentic relationship building.

## Core Solution
CampusVibe provides a platform for college stude0nts to connect anonymously based on shared interests and personality compatibility, facilitated through meaningful question-and-answer interactions. It encourages genuine conversation before revealing identities.

## How It Works (User Flow)
1.  **Signup & Onboarding:** Students sign up or log in using their Google account (via Firebase Google OAuth), provide basic info (name, gender, interest), and complete a short personality quiz.
2.  **Daily Interaction:** Each day, a user can either ask one question (visible to the opposite gender) or answer questions from their feed.
3.  **Question Feed:** The feed displays questions from the opposite gender, sorted by a personality compatibility score derived from the onboarding quiz.
4.  **Answering & Connecting:** When a user answers a question, the original asker sees the answer.
5.  **Initiating Chat:** If the asker likes the answer, they can invite the answerer to a 5-minute anonymous chat.
6.  **Anonymous Chat:** If the invite is accepted, a timed chat begins. Participants remain anonymous.
7.  **Mutual Like:** During the chat, both users have a "like" button. If both press it, the chat becomes permanent, and identities might be revealed (TBD based on final design).
8.  **Chat Expiry:** If there's no mutual like within 5 minutes, the chat disappears permanently.

## User Experience Goals
-   **Authenticity:** Foster genuine connections based on personality and conversation, not just looks.
-   **Safety & Comfort:** Provide a safe space for anonymous interaction, reducing the pressure of initial encounters.
-   **Engagement:** Encourage daily participation through the one-question/answer limit.
-   **Simplicity:** Offer a straightforward and intuitive user interface.
-   **Meaningful Interaction:** Focus on quality interactions over quantity.
