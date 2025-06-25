import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to log in the user
export interface LoginUserParams {
    token: string;
}

export const loginUser = async (token: LoginUserParams['token']): Promise<void> => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

// Function to log out the user
export const logoutUser  = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Function to check if the user is logged in
export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token !== null; // Returns true if token exists, false otherwise
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token; // Returns the token if it exists, null otherwise
  } catch (error) {
    console.error('Error retrieving user token:', error);
    return null;
  }
}