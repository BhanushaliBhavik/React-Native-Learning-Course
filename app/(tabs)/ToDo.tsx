import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { auth } from '../../firebase/firebaseConfig'; // Adjust the import path as necessary

export default function ToDo() {
    const [todos, setTodos] = useState([]); // State to hold todo items
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const [isAdding, setIsAdding] = useState(false); // State to manage adding state
    const [isEditing, setIsEditing] = useState(false); // State to manage editing state
    const [user, setUser] = useState(null); // State to hold the current user

    useEffect(() => {
        // Function to fetch todo items from Firestore
        const fetchTodos = async () => {
            try {
                const user = auth.currentUser; // Get the current user
                console.log('Current User:', user); // Log the current user for debugging
                
                if (user) {
                    setUser(user); // Set the user state
                    const snapshot = await firestore()
                        .collection('todo') // Ensure this matches your Firestore collection name
                        .where('userId', '==', user.uid) // Filter todos by the current user's UID
                        .get();

                    const todosData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        
                    }));
                    setTodos(todosData); // Set the fetched todos to state
                    setLoading(false); // Set loading to false after fetching
                } else {
                    setTodos([]); // If no user, set todos to empty array
                }
            } catch (err) {
                console.error('Error fetching todos:', err);
                setError(err.message); // Set error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchTodos(); // Call the function to fetch todos

        // Optional: Listen for changes in the 'todo' collection
        const unsubscribe = firestore()
            .collection('todo')
            .where('userId', '==', user ? user.uid : '')
            .onSnapshot(snapshot => {
                const updatedTodos = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTodos(updatedTodos); // Update todos with real-time changes
            });

        return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

    // Validation schema for the form
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(2, 'Title must be at least 2 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(5, 'Description must be at least 5 characters'),
    });

    const AddTodo = async(values) => {
        // Function to add a new todo item
        
        try {
            const user = auth.currentUser; // Get the current user
            if (user) {
            await firestore()
                .collection('todo') // Ensure this matches your Firestore collection name
                .add({
                    title: values.title,
                    description: values.description,
                    userId: user.uid, // Use the current user's UID
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    complete: false, // Default value for new todos
                });
            setIsAdding(false); // Close the modal after adding
            setTodos(prevTodos => [
                ...prevTodos,
                {
                    title: values.title,
                    description: values.description,
                    userId: user.uid,
                    createdAt: new Date(),
                    complete: false, // Default value for new todos
                },
            ]);
            } else {
                alert('You must be logged in to add a todo.');
            }
        } catch (err) {
            alert('Error adding data: ' + err.message);
        }
        
    }

    const toggleTodoComplete = async (todoId, currentValue) => {
        // Function to toggle the completion status of a todo item
        try {
            await firestore()
                .collection('todo')
                .doc(todoId)
                .update({
                    complete: !currentValue, // Toggle the current value
                });
            // Optionally, update the local state to reflect the change immediately
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === todoId ? { ...todo, complete: !currentValue } : todo
                )
            );
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
            style={{ flex: 1 , marginTop: 20 , marginHorizontal: 10, borderRadius: 10, backgroundColor: '#fff'}}
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{flex:1, paddingRight: 10}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        </View>
                        <Switch
                            value={item.complete}
                            onValueChange={toggleTodoComplete.bind(null, item.id, item.complete)}
                        />
                    </View>
                )}
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text>No todos found.</Text>
                    </View>
                }
                
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setIsAdding(true);
                }}
            >
                <Text style={styles.addButtonText}>+</Text>

            </TouchableOpacity>
            <Modal
                visible={isAdding}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    setIsAdding(false);

                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }} >
                            <Text style={{ fontSize: 18 }}>Add Todo</Text>
                            <TouchableOpacity
                                onPress={() => setIsAdding(false)}

                            >
                                <Ionicons name="close" size={24} color="black" style={{ paddingHorizontal: 5, paddingVertical: 3 }} />
                            </TouchableOpacity>
                        </View>
                        {/* Add your form for adding/editing todo here */}
                        <Formik
                            initialValues={{ title: '', description: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                AddTodo(values); // Call the function to add todo
                                console.log('Submitted:', values);

                                resetForm(); // Reset the form
                                setIsAdding(false); // Close the modal
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <View>
                                    <Text>Title</Text>
                                    <TextInput
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                        placeholder="Enter title"
                                        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
                                    />
                                    {errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}

                                    <Text>Description</Text>
                                    <TextInput
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        value={values.description}
                                        placeholder="Enter description"
                                        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
                                    />
                                    {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}

                                    <TouchableOpacity
                                        onPress={() => handleSubmit()}
                                        style={{ backgroundColor: '#007BFF', padding: 15, borderRadius: 5 }}
                                    >
                                        <Text style={{ color: '#fff', textAlign: 'center' }}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#ffffff'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        backgroundColor: '#007BFF',
    },
    addButtonText: {
        color: '#fff', fontSize: 24,
        padding: 15, borderRadius: 50
    }
})