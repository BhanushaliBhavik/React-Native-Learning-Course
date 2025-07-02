import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import UseStore from './store';

const Counter = () => {
    const {count, increment, decrement, reset} = UseStore();
  return (
    <View>
      <Text>Counter: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
      <Button title="Reset" onPress={reset} />
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({})