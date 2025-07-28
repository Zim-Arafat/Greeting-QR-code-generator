// =================================================
// STEP 1: Initialize Supabase
// =================================================

// Your correct Project API URL and anon key
const SUPABASE_URL = 'https://dkdcslwtlvsghuxyorfm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZGNzbHd0bHZzZ2h1eHlvcmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTkyMzksImV4cCI6MjA2OTI5NTIzOX0.atcJ3p9IwGPURcCnGj4aDJQXpsMj7kEMoK2jqmbjKjM';

// Create a single Supabase client for interacting with your database
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =================================================
// STEP 2: Get HTML Elements
// =================================================
const loginSection = document.getElementById('login-section');
const greetingSection = document.getElementById('greeting-card-section');
const googleBtn = document.getElementById('google-signin-btn');
const userPic = document.getElementById('user-pic');
const userName = document.getElementById('user-name');

// =================================================
// STEP 3: Authentication Logic
// =================================================

// Handle the Google Sign-In button click
googleBtn.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error('Error signing in with Google:', error.message);
  }
});

// This function runs when the page loads and whenever the user's
// authentication state changes (e.g., after they sign in).
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user;

  if (user) {
    console.log('User is signed in:', user);
    showGreetingCard(user);
  } else {
    console.log('User is not signed in.');
    showLoginPage();
  }
});

// =================================================
// STEP 4: UI Update Functions
// =================================================

function showGreetingCard(user) {
  // Get the original avatar URL
  let avatarUrl = user.user_metadata.avatar_url;
  
  // FIX FOR BLURRY IMAGE: Request a larger image from Google
  if (avatarUrl && avatarUrl.includes('googleusercontent.com')) {
    avatarUrl = avatarUrl.replace(/=s\d+-c$/, '=s400-c');
  }

  // Set the user's picture and name
  userPic.src = avatarUrl;
  userName.textContent = 'Welcome, ' + user.user_metadata.full_name;

  // Hide the login section and show the greeting card section
  loginSection.style.display = 'none';
  // Use 'flex' to trigger the full-screen overlay styles
  greetingSection.style.display = 'flex';
}

function showLoginPage() {
  greetingSection.style.display = 'none';
  // Note: The login section is inside the 'main' tag which is already a block element.
  // We just need to make sure the greeting card overlay is hidden.
}
