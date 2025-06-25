import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SignIn, SignUp } from "../firebase/services/AuthServices";

 export default function LoginSignUpScreen () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        await SignUp(email, password);
        Alert.alert("Success", "Account created successfully!");
        router.replace("/Home"); // Navigate to Home after sign up
      } else {
        await SignIn(email, password);
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/Home"); // Navigate to Home after login
      }
      // Navigation will be handled by auth state listener in index.tsx
    } catch (error) {
      Alert.alert("Error", error.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>
          {isSignUp ? "Sign Up" : "Log In"}
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!isLoading}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            disabled={isLoading}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color={isLoading ? "#ccc" : "black"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleAuth}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Please wait..." : (isSignUp ? "Sign Up" : "Log In")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setIsSignUp(!isSignUp)}
          disabled={isLoading}
        >
          <Text style={[styles.linkText, isLoading && styles.linkTextDisabled]}>
            {isSignUp
              ? "Already have an account? Log In"
              : "New user? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  innerContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
    marginTop: 15,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#2196F3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    color: "#4a90e2",
    fontSize: 14,
    marginTop: 15,
  },
  linkTextDisabled: {
    color: "#ccc",
  },
});