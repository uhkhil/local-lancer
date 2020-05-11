import React from 'react';
import {View, Image, Text, Icon} from 'native-base';
import styles from './EmailVerifyStyles';
import {Wrapper} from '../../hocs/Wrapper';

class EmailVerify extends React.Component {
  render() {
    return (
      <View style={[styles.singlePage]}>
        <View style={styles.bigTextContainer}>
          {/* <Image
            style={styles.image}
            source={require('../../assets/icons/check-mark.png')}
          /> */}
          <View style={{marginTop: 40}}>
            <Text style={styles.bigText}>Almost there!</Text>
            <Text style={styles.bigText}>Please verify you email.</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Wrapper(EmailVerify);
