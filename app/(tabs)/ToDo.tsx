import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { getUserToken } from '../../firebase/services/AsyncStorage';

export default function ToDo() {
    const [todos, setTodos] = useState([]); // State to hold todo items
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const [isAdding, setIsAdding] = useState(false); // State to manage adding state
    const [isEditing, setIsEditing] = useState(false); // State to manage editing state

    // Validation schema for the form
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(2, 'Title must be at least 2 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(5, 'Description must be at least 5 characters'),
    });

    const AddTodo =(values) => {
        // Function to add a new todo item
        getUserToken()
            .then( async(token) => {
        try {
            console.log('User Token:', token); // Log the user token
            await firestore()
                .collection('users')
                .add({
                    title: values.title,
                    description: values.description,
                    user_id: token,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
        } catch (err) {
            alert('Error adding data: ' + err.message);
        }
            })
            .catch((error) => {
                console.error('Error getting user token:', error);
                alert('Error getting user token');
            }
            );
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>

            </ScrollView>
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

        backgroundColor: '#f0f0f0'
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