// import React from 'react';
// import { StyleSheet, Text, View, VirtualizedList } from 'react-native';

// const DATA = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

// const getItem = (data, index) => ({
//   key: `item-${index}`,
//   title: data[index],
// });

// const getItemCount = (data) => data.length;

// const Temp = () => {
//   return (
//     <View style={styles.container}>
//       <VirtualizedList
//         data={DATA}
//         initialNumToRender={10} // Number of items to render initially
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>{item.title}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.key}
//         getItemCount={getItemCount}
//         getItem={getItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   item: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });

// export default Temp;

import React from 'react'
import { Provider } from 'react-redux'
import Counter from './Redux/counter'
import store from "./Redux/store"

export default function temp() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}