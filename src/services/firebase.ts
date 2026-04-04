// Mock Firebase service - Nuk kemi Firebase të vërtetë
export const firebaseService = {
  // Simulojmë Firebase Auth
  auth: {
    currentUser: null,
    
    createUserWithEmailAndPassword: async (email: string, password: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        user: {
          uid: 'mock-uid-' + Date.now(),
          email,
          displayName: email.split('@')[0]
        }
      };
    },
    
    signInWithEmailAndPassword: async (email: string, password: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        user: {
          uid: 'mock-uid-' + Date.now(),
          email,
          displayName: email.split('@')[0]
        }
      };
    },
    
    signOut: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  },
  
  // Simulojmë Firestore
  firestore: {
    collection: (name: string) => ({
      doc: (id: string) => ({
        set: async (data: any) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          console.log('Saved to Firestore:', data);
          return data;
        },
        get: async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return { exists: false, data: () => null };
        },
        update: async (data: any) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          console.log('Updated in Firestore:', data);
          return data;
        },
        delete: async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          console.log('Deleted from Firestore');
        }
      }),
      add: async (data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Added to Firestore:', data);
        return { id: 'doc-' + Date.now() };
      },
      where: () => ({
        get: async () => {
          await new Promise(resolve => setTimeout(resolve, 500));
          return { docs: [] };
        }
      })
    })
  }
};

// Eksportojmë si default për pajtueshmëri
export default firebaseService;