
Built by https://www.blackbox.ai

---

```markdown
# Warm Hug | A Comforting Companion

Welcome to **Warm Hug**, a digital sanctuary designed to provide comfort and emotional support through various features that encourage self-reflection, creativity, and connection.

## Project Overview

**Warm Hug** offers users a space to express their feelings, check in on their moods, maintain a journal, engage in gentle breathing rituals, and chat with an AI companion. The goal is to provide an empathetic environment where users can explore their emotions without judgment or pressure.

## Features

- **Mood Check-In**: Users can express their current emotional states through mood colors and emojis.
- **Journaling**: A space for free writing or utilizing gentle prompts to guide reflections.
- **Breathing Rituals**: Calming breathing exercises designed to help users recenter.
- **Creative Prompts**: Offers users the opportunity to stimulate their creative expression.
- **Chat Companion**: Engage in conversations with an AI that provides supportive responses.
  
## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/warm-hug.git
   cd warm-hug
   ```

2. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

3. Ensure that you configure Firebase in the `firebase.js` file with your project's credentials.

## Usage

- Open `index.html` in a web browser to start your journey.
- You can navigate between different sections using the links or buttons provided in the app.

### Credential Configuration

Make sure to update the Firebase configuration in `firebase.js` before running the app:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Dependencies

The project relies on the following libraries and frameworks:

- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [Firebase](https://firebase.google.com/)

## Project Structure

- `index.html`: The main entry point of the application.
- `mood-checkin.html`: A dedicated page for checking in on moods.
- `journal.html`: A page for writing journal entries and viewing previous entries.
- `chat.html`: An interface for interacting with the AI chat companion.
- `rituals.html`: Contains different breathing and relaxation rituals.
- `firebase.js`: Initializes and configures Firebase services.
- `auth.js`: Handles user authentication and state changes.
- `mood.js`: Manages the state and functionality for mood submissions.
- `journal.js`: Handles journal entry management.
- `gemini-chat.js`: Manages chat interactions with the AI.
- `gemini-rituals.js`: Manages the logic behind the breathing rituals and prompts.

## Contribution

Feel free to fork the repository, make changes, and submit pull requests. Any contributions to enhance the features or improve the user experience are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).
```