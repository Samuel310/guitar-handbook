# 🎸 Guitar Handbook

Your complete guide to chords, scales, and songs. A modern web application built for guitarists to explore the Nashville Number System and manage their personal song collection.

## Features

### 🎵 Nashville Number System

- Interactive chord progression explorer
- Support for all major and minor keys
- Visual display of chords, notes, and Nashville numbers
- Perfect for transposing songs and understanding music theory

### 📚 Private Song Book

- Create and manage your personal song collection
- Store lyrics with chord notations
- Edit and delete songs
- Cloud-synced with Firebase
- Secure authentication with Google Sign-In

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Routing**: React Router 7
- **Backend**: Firebase (Authentication + Firestore)
- **Build Tool**: Vite 7

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Samuel310/guitar-handbook.git
    cd guitar-handbook
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
    VITE_FIREBASE_PROJECT_ID=your_project_id_here
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
    VITE_FIREBASE_APP_ID=your_app_id_here
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication in Firebase Authentication
3. Create a Firestore database
4. Set up Firestore security rules:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /chords-map/{document} {
      allow read: if request.auth != null;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /songs/{songsId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Project Structure

```bash
guitar-handbook/
├── src/
│   ├── config/         # Firebase configuration
│   ├── controller/     # Business logic and API calls
│   ├── model/          # TypeScript interfaces and types
│   ├── store/          # Redux store and slices
│   ├── view/           # React components and pages
│   │   ├── components/ # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   └── pages/      # Page components
│   ├── App.tsx
│   └── main.tsx
├── public/             # Static assets
└── dist/              # Production build output
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Samuel310

## Acknowledgments

- Nashville Number System methodology
- Firebase for backend services
- Vite for blazing fast development experience
