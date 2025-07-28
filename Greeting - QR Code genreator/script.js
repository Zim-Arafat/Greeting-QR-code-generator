// Google OAuth 2.0 setup
// TODO: Replace with your Google Client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

// Placeholder for Supabase integration
// TODO: Add Supabase client initialization here

// Elements
const loginSection = document.getElementById('login-section');
const greetingSection = document.getElementById('greeting-card-section');
const googleBtn = document.getElementById('google-signin-btn');
const userPic = document.getElementById('user-pic');
const userName = document.getElementById('user-name');

// Google OAuth 2.0 popup
function openGoogleOAuth() {
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'profile email';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
}

googleBtn.addEventListener('click', openGoogleOAuth);

// Parse access token from URL hash
function getAccessTokenFromUrl() {
    const hash = window.location.hash;
    if (!hash) return null;
    const params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
}

// Fetch user info from Google
async function fetchGoogleUserInfo(token) {
    const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch user info');
    return await res.json();
}

// Show greeting card
function showGreetingCard(user) {
    userPic.src = user.picture;
    userName.textContent = user.name;
    loginSection.style.display = 'none';
    greetingSection.style.display = 'block';
    // TODO: Save user info to Supabase here
}

// On page load, check for access token
window.addEventListener('DOMContentLoaded', async () => {
    const token = getAccessTokenFromUrl();
    if (token) {
        try {
            const user = await fetchGoogleUserInfo(token);
            showGreetingCard(user);
            // Remove token from URL for cleanliness
            window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
            alert('Authentication failed. Please try again.');
        }
    }
}); 