import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const DeleteTodo = ({isDeleting, close, deleteTodo, todoId}) => {
  return (
    <Modal
            visible={isDeleting}
            animationType="slide"
            transparent={true}

        >
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }} >
                        <Text style={{ fontSize: 18 }}>Delete Todo</Text>
                        <TouchableOpacity
                            onPress={() => close()}
                        >
                            <Ionicons name="close" size={24} color="black" style={{ paddingHorizontal: 5, paddingVertical: 3 }} />
                        </TouchableOpacity>
                        </View>
                    <Text style={{ marginBottom: 20 }}>Are you sure you want to delete this todo?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:16}}>
                        <TouchableOpacity
                            onPress={() => {
                                deleteTodo(todoId); // Call the function to delete todo
                                close(); // Close the modal after deletion
                            }}
                            style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, flex:1, alignItems: "center", justifyContent:"center" }}
                        >
                            <Text style={{ color: '#fff' }}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => close()}
                            style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5, flex:1, alignItems: "center", justifyContent:"center" }}
                        >
                            <Text style={{ color: '#fff' }}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
            </View>
        </Modal>
  )
}

export default DeleteTodo