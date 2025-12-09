import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK (singleton pattern)
const initFirebaseAdmin = () => {
    if (!admin.apps.length) {
        // Check if running in Node.js environment (API routes)
        if (typeof window === 'undefined') {
            try {
                // Validate environment variables
                const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
                const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
                const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

                if (!projectId || !clientEmail || !privateKey) {
                    throw new Error(
                        'Missing Firebase Admin credentials. Please set FIREBASE_ADMIN_PROJECT_ID, ' +
                        'FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in .env.local'
                    );
                }

                const serviceAccount = {
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
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
