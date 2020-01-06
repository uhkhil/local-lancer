import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

export class NoData extends React.Component {
  render() {
    const {text} = this.props;
    return (
      <View style={styles.container}>
        {/* Icon will come here */}
        <Text style={styles.emptyText}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 25,
    color: 'darkgray',
  },
});
