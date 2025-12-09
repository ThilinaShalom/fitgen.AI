import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (singleton pattern)
const initFirebaseAdmin = () => {
    if (!admin.apps.length) {
        // Check if running in Node.js environment (API routes)
        if (typeof window === 'undefined') {
            try {
                // Use environment variables for Firebase Admin credentials
                const serviceAccount = {
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                };

                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
                });

                console.log('Firebase Admin initialized successfully');
            } catch (error) {
                console.error('Error initializing Firebase Admin:', error);
                throw error;
            }
        }
    }
    return admin;
};

export const adminAuth = () => {
    const adminInstance = initFirebaseAdmin();
    return adminInstance.auth();
};

export const adminDb = () => {
    const adminInstance = initFirebaseAdmin();
    return adminInstance.firestore();
};

export default initFirebaseAdmin;
