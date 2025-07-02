import { observer } from "mobx-react";
import React from "react";
import { Button, Text, View } from "react-native";
import store from "./store";

const Counter = observer(() => {
  return (
    <View>
      
      <Text>Count: {store.count}</Text>
      <Button title="Increment" onPress={() => store.increment()} />
      <Button title="Decrement" onPress={() => store.decrement()} />
    </View>
  );
});

export default Counter;
