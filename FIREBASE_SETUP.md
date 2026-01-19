# Firebase Setup - Quick Start Guide

## ✅ Step 1: Environment Configuration (DONE)
Your Firebase credentials have been configured in `.env.production`

## 🔥 Step 2: Install Firebase CLI (If not already installed)
```bash
npm install -g firebase-tools
```

## 🔐 Step 3: Login to Firebase
```bash
firebase login
```

## 🚀 Step 4: Initialize Firebase (Optional - already configured)
The following files have been created:
- `.firebaserc` - Project configuration
- `firebase.json` - Hosting and Firestore rules config
- `firestore.rules` - Security rules

## 📊 Step 5: Deploy Firestore Security Rules
```bash
firebase deploy --only firestore:rules
```

## 🗄️ Step 6: Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/project/go2tour-4f555/firestore)
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select a location (e.g., `asia-south1` for India)
5. Click "Enable"

## 🔑 Step 7: Enable Google Authentication
1. Go to [Authentication](https://console.firebase.google.com/project/go2tour-4f555/authentication)
2. Click "Get Started"
3. Click "Google" provider
4. Enable it
5. Add your email as authorized domain
6. Save

## 📥 Step 8: Migrate Data to Firestore
```bash
npm run migrate
```

This will populate your Firestore database with 4 premium Tamil Nadu destinations.

## ✅ Step 9: Test with Real Data
```bash
# Use production environment
npm run dev

# Or build for production
npm run build
npm run preview
```

## 🌐 Step 10: Deploy to Firebase Hosting (Optional)
```bash
npm run build
firebase deploy --only hosting
```

Your app will be live at: `https://go2tour-4f555.web.app`

---

## 🔍 Verify Setup

### Check Firestore
1. Go to [Firestore Console](https://console.firebase.google.com/project/go2tour-4f555/firestore)
2. You should see collections: `destinations`, `users`, `bookings`, etc.

### Check Authentication
1. Go to [Authentication Console](https://console.firebase.google.com/project/go2tour-4f555/authentication)
2. Try signing in with Google on your app
3. User should appear in the "Users" tab

---

## 🐛 Troubleshooting

**Issue:** Migration script fails
- **Solution:** Make sure Firestore is enabled in the console

**Issue:** Authentication doesn't work
- **Solution:** Enable Google provider in Authentication settings

**Issue:** "Permission denied" errors
- **Solution:** Deploy security rules with `firebase deploy --only firestore:rules`

---

## 📝 Next Steps

After successful setup:
1. ✅ Test Google Sign-In
2. ✅ Create a test booking
3. ✅ Verify data appears in Firestore
4. ✅ Test real-time updates
5. 🚀 Deploy to production

**Your Firebase Project:** [go2tour-4f555](https://console.firebase.google.com/project/go2tour-4f555)
