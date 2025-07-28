# Crispy Corner - QR Code Greeting Card Generator

A simple web application that generates a personalized digital greeting card after Google sign-in. The card displays the user's Google profile picture, name, and a welcome message.

## Features
- Google OAuth 2.0 authentication
- Personalized greeting card with user info
- Responsive, mobile-friendly design
- Ready for future Supabase backend integration

## Getting Started

### 1. Clone or Download
Download or clone this repository to your local machine.

### 2. Add Images
- Place the provided hero image as `hero.jpg` in the project folder.
- Place the provided logo as `logo.png` in the project folder.

### 3. Set Up Google OAuth
- Go to [Google Cloud Console](https://console.developers.google.com/).
- Create a new project and set up OAuth 2.0 credentials.
- Add your OAuth Client ID to `script.js`:
  ```js
  const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  ```
- Set the redirect URI to your local or deployed URL (e.g., `http://localhost/path/to/index.html`).

### 4. Run Locally
Just open `index.html` in your browser. No server is required for the front-end.

## Project Structure
- `index.html` - Main HTML file
- `styles.css` - Styling for the app
- `script.js` - Handles authentication and greeting card logic
- `hero.jpg` - Hero background image (add manually)
- `logo.png` - University logo (add manually)

## Future Integration: Supabase
- Placeholders are included in `script.js` for Supabase integration.
- You can add Supabase client initialization and user data saving where marked.

## Deployment
- You can deploy this project on [Vercel](https://vercel.com/) or any static hosting provider.

## License
MIT 