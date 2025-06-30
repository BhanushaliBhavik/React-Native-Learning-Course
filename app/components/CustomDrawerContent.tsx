// CustomDrawerContent.js
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            {/* Custom Property: Add your custom UI here */}
            <View style={styles.customPropertyContainer}>
                <Text style={styles.customPropertyText}>Welcome, User!</Text>
                <TouchableOpacity style={styles.customButton}>
                    <Text style={styles.buttonText}>Custom Action</Text>
                </TouchableOpacity>
            </View>

            {/* Default Drawer Items */}
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    customPropertyContainer: {
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    customPropertyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    customButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default CustomDrawerContent;
