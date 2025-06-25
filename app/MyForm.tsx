import { Formik } from 'formik';
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[a-zA-Z]+$/, 'Name must contain only letters')
        .min(2, 'Name must be at least 2 characters'),
});

export default function MyForm (){
    return (
        <Formik
            initialValues={{ name: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('Submitted:', values);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Enter your name"
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                    <Button onPress={() => handleSubmit()} title="Submit" />
                </View>
            )}
        </Formik>
    );
};
