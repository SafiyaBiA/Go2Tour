# Enable Google Authentication - Quick Steps

## Step 1: Enable Authentication in Firebase Console

1. Go to [Firebase Authentication](https://console.firebase.google.com/project/go2tour-4f555/authentication/providers)
2. Click **"Get Started"**
3. Click on **"Google"** provider
4. Toggle **"Enable"** switch
5. **Project support email**: Select your email from dropdown
6. Click **"Save"**

## Step 2: Add Authorized Domains (if needed)

Firebase automatically authorizes:
- `localhost` (for development)
- `go2tour-4f555.web.app` (for hosting)
- `go2tour-4f555.firebaseapp.com` (for hosting)

If you need custom domains, add them in the "Authorized domains" section.

## Step 3: Test Authentication

Once enabled, you can test:
1. Navigate to http://localhost:5173/login
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected to the homepage

## Step 4: Deploy Secure Firestore Rules

After testing authentication, deploy the secure rules:

1. Go to [Firestore Rules](https://console.firebase.google.com/project/go2tour-4f555/firestore/rules)
2. Replace with content from `firestore.rules`
3. Click **"Publish"**

---

**Ready to test?** Let me know when you've enabled Google Authentication!
