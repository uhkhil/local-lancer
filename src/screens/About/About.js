import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import {Colors} from '../../theme/Theme';
import {Wrapper} from '../../hocs/Wrapper';

class AboutScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.theme.background]}>
        <Text style={styles.aboutText}>mAde wiTh LoVe FroM pUnE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutText: {
    textAlign: 'center',
    color: Colors.white,
  },
});

export default Wrapper(AboutScreen);
