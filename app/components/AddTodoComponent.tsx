import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

const AddTodo = ({ isAdding, addTodo, close }) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(2, 'Title must be at least 2 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(5, 'Description must be at least 5 characters'),
    });
    return (
        <Modal
            visible={isAdding}
            animationType="slide"
            transparent={true}

        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }} >
                        <Text style={{ fontSize: 18 }}>Add Todo</Text>
                        <TouchableOpacity
                            onPress={() => close()}

                        >
                            <Ionicons name="close" size={24} color="black" style={{ paddingHorizontal: 5, paddingVertical: 3 }} />
                        </TouchableOpacity>
                    </View>
                    {/* Add your form for adding/editing todo here */}
                    <Formik
                        initialValues={{ title: "", description: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            addTodo(values); // Call the function to add todo
                            console.log('Submitted:', values);
                            close()

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
                                {typeof errors.title === 'string' && <Text style={{ color: 'red' }}>{errors.title}</Text>}

                                <Text>Description</Text>
                                <TextInput
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    placeholder="Enter description"
                                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
                                />
                                {typeof errors.description === 'string' && <Text style={{ color: 'red' }}>{errors.description}</Text>}
                                {Array.isArray(errors.description) && errors.description.map((err, idx) => (
                                    <Text key={idx} style={{ color: 'red' }}>{err}</Text>
                                ))}

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
    )
}

export default AddTodo;
const styles = StyleSheet.create({})