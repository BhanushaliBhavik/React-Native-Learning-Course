import { Ionicons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { auth } from '../../firebase/firebaseConfig'; // Adjust the import path as necessary

import AddTodoComponent from '../components/AddTodoComponent';
import DeleteTodo from '../components/DeleteTodo';
import EditTodo from '../components/EditTodo';
import todo from "../mobex/todo";

const TodoMobex = observer(() => {
        const [loading, setLoading] = useState(true); // State to manage loading state
        const [isAdding, setIsAdding] = useState(false); // State to manage adding state
        const [isEditing, setIsEditing] = useState(false); // State to manage editing state
        const [todoToEdit, setTodoToEdit] = useState(null); // State to hold the todo item being edited
        const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        // Function to fetch todo items from Firestore
        const fetchTodos = async () => {
            try {
                const user = auth.currentUser; // Get the current user
                console.log('Current User:', user); // Log the current user for debugging

                if (user) {
                    console.log("Feching data...");
                    
                    const snapshot = await firestore()
                        .collection('todo') // Ensure this matches your Firestore collection name
                        .where('userId', '==', user.uid) // Filter todos by the current user's UID
                        .get();
                    console.log(snapshot.docs.length, 'todos found'); // Log the number of todos found);

                    const todosData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),

                    }));
                    // console.log(todosData);
                    
                    todo.setTodo(todosData)// Set the fetched todos to state
                    setLoading(false); // Set loading to false after fetching
                    console.log(todo.todos);
                    
                } else {
                    todo.setTodo([]); // If no user, set todos to empty array
                }
            } catch (err) {
                console.error('Error fetching todos:', err);
                // Set error message if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchTodos(); // Call the function to fetch todos


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

    const addTodo = async (values) => {
        // Function to add a new todo item

        try {
            const user = auth.currentUser; // Get the current user
            if (user) {
                console.log("Adding Todo...");
                
                const data = await firestore()
                    .collection('todo') // Ensure this matches your Firestore collection name
                    .add({
                        title: values.title,
                        description: values.description,
                        userId: user.uid, // Use the current user's UID
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        complete: false, // Default value for new todos
                    });
                    console.log("Todo Added sucessfully!");
                    
                setIsAdding(false); // Close the modal after adding

                console.log(data._documentPath._parts[1]);
                
                todo.addTodo({...values, id:data._documentPath._parts[1]});
                // console.log(todos);
                
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
            console.log("Toggle Todo Complete: ", todoId);
            
            await firestore()
                .collection('todo')
                .doc(todoId)
                .update({
                    complete: !currentValue, // Toggle the current value
                });
            // Optionally, update the local state to reflect the change immediately
            console.log("Toogle Todo sucessfully!");
            
            todo.toggleTodoComplete(todoId);
            
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    }

    const editTodo = async (values) => {
        // Function to edit an existing todo item
        try {
            if (todoToEdit) {
                console.log('Editing todo:', todoToEdit);

                await firestore()
                    .collection('todo')
                    .doc(todoToEdit.id)
                    .update({
                        title: values.title,
                        description: values.description,
                    });
                    console.log("Edit Todo sucessfully!");
                    
                setIsEditing(false); // Close the modal after editing
                console.log(values);
                
                todo.updateTodo( todoToEdit.id ,values);
            }
        } catch (err) {
            alert('Error updating todo: ' + err.message);
        }
    }

    const deleteTodo = async (todoId) => {
        try{
            console.log("Deleting Todo: ", todoId);
            
            await firestore()
            .collection("todo")
            .doc(todoId)
            .delete();
            console.log("Todo Delete Sucessfully!");
            
        setIsDeleting(false); // Close the modal after editing
        todo.deleteTodo(todoId)

        } catch(e){
            alert("Error During Deletion:" + e.message)
        }
    }

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator
                size="large"
                color="#0000ff"
                className='my-5'
            /> : <FlatList
                className='flex-1 mt-5 mx-2.5 rounded-xl bg-white pb-14'
                data={todo.todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onLongPress={() => {
                        setTodoToEdit(item)
                        setIsDeleting(true)
                    }}>
                        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Ionicons name={item.complete ? "checkmark-circle" : "ellipse-outline"} size={24} color={item.complete ? "#4CAF50" : "#ccc"} onPress={() => { toggleTodoComplete(item.id, item.complete) }} />
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                                <Text>{item.description}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    // Handle edit action here
                                    console.log('Edit todo:', item);
                                    setTodoToEdit(item); // Set the todo to edit
                                    setIsEditing(true);
                                }}
                                style={{ padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}
                            >
                                <Text style={{ color: '#fff' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text>No todos found.</Text>
                    </View>
                }

            />}
            <TouchableOpacity
                className='absolute bottom-5 right-5 w-16 h-16 justify-center items-center rounded-full elevation-md shadow-slate-700 bg-blue-500'
                onPress={() => {
                    setIsAdding(true);
                }}
            >
                <Text className='color-white text-2xl '>+</Text>

            </TouchableOpacity>

            {isAdding && <AddTodoComponent
                addTodo={addTodo}
                close={() => setIsAdding(false)}
                isAdding={isAdding} />}

            {isEditing && <EditTodo
                isEditing={isEditing}
                close={() => setIsEditing(false)}
                todo={todoToEdit}
                editTodo={editTodo}
            />}
            {isDeleting && <DeleteTodo
                todoId={todoToEdit.id}
                close={() => setIsDeleting(false)}
                deleteTodo={deleteTodo}
                isDeleting={isDeleting}
            />}

        </View>
    )
}
)
export default TodoMobex;

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
    },
    loader: {
        marginVertical: 20,
    }
})