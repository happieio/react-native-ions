import React from 'react';
import { View, Text } from 'react-native';
//import { styles } from './inventory-list.style'

interface Props extends Navigation<{}> {
  state: any
}

export class InventoryDetailScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Inventory Detail'
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Hello</Text>
      </View>
    );
  }
}
