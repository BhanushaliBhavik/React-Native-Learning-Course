import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { loginUser, logoutUser } from "./AsyncStorage"; // Assuming you have a loginUser function to handle user state
export const SignIn = async (email: string, password: string) => {
  console.log("Signing in with email:", email);

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    loginUser(user); // Assuming loginUser is defined to handle user login state
    return user; // or userCredential, depending on what you want to use
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const SignUp = (email: string, password: string) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(async(userCredential) => {
      // Create Firestore user document
      const user = userCredential.user;
      const uid = user.uid;
      console.log("Creating user with UID:", uid);
      
      await firestore()
        .collection("users")
        .doc(uid)
        .set({
          email,
          createdAt: firestore.FieldValue.serverTimestamp(),
          // add more fields here
        })
        .then(() => {
          Alert.alert("User Created", `Welcome ${email}`);
        });
        console.log(user);
        console.log(auth.currentUser);
        
        
        loginUser(auth.currentUser); // Assuming loginUser is defined to handle user login state
    })
    .catch((error) => Alert.alert("Sign Up Failed", error.message));
};


export const SignOut = async () => {
    await auth.signOut();
    try {
        await logoutUser(); // Clear user token on sign out
    } catch (error) {
        console.error("Error during sign out:", error);
    }
}
