# Firebase Permission Error Fix

## Current Error
```
FirebaseError: Missing or insufficient permissions.
```

## Quick Fix - Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **gadget-garage-4a721**
3. Navigate to **Firestore Database** > **Rules** tab
4. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to quotes collection
    match /quotes/{document=**} {
      allow read, write: if true;
    }
    
    // Allow read/write access to appointments collection
    match /appointments/{document=**} {
      allow read, write: if true;
    }
    
    // Allow read/write access to all other documents (for development)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish** to save the rules

## Important Notes

⚠️ **Security Warning**: These rules allow public read/write access to your database. This is fine for development but **NOT for production**.

### For Production:
- Implement Firebase Authentication
- Use user-based rules like:
  ```javascript
  match /quotes/{document=**} {
    allow read: if request.auth != null;
    allow write: if request.auth != null;
  }
  ```

## After Updating Rules

1. Wait 1-2 minutes for rules to propagate
2. Refresh your app
3. Try submitting a quote again

The permission error should be resolved!

