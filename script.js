// =================================================
// STEP 1: Initialize Supabase
// =================================================
// Replace with your Project URL and anon key from Supabase
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
  // This one line of code handles the entire Google sign-in flow!
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
    // If the user is signed in, show the greeting card
    console.log('User is signed in:', user);
    showGreetingCard(user);
  } else {
    // If the user is not signed in, show the login page
    console.log('User is not signed in.');
    showLoginPage();
  }
});

// =================================================
// STEP 4: UI Update Functions
// =================================================

// Function to show the personalized greeting card
function showGreetingCard(user) {
  // Get user's name and picture from the metadata provided by Google
  userPic.src = user.user_metadata.avatar_url;
  userName.textContent = user.user_metadata.full_name;

  // Hide the login section and show the greeting card section
  loginSection.style.display = 'none';
  greetingSection.style.display = 'block';
}

// Function to show the login page
function showLoginPage() {
  // Hide the greeting card section and show the login section
  greetingSection.style.display = 'none';
  loginSection.style.display = 'block';
}
