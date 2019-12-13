import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';

import styles from './AuthStyles';
import {Auth} from '../../services/Auth';
import {Wrapper} from '../../hocs/Wrapper';

class AuthScreen extends React.Component {
  state = {
    loading: false,
  };

  signIn = async () => {
    this.setState({loading: true});
    const signedIn = await Auth.signIn(this.props.userContext);
    if (signedIn) {
      await Auth.checkNavigationFlow(
        this.props.userContext,
        this.props.navigation,
        this.props.theme,
      );
    }
    this.setState({loading: false});
  };

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {/* <View style={styles.iconContainer} /> */}
          <View style={styles.title}>
            <Text style={styles.titleText1}>Local</Text>
            <Text style={styles.titleText2}>Lancer</Text>
          </View>
          <Text style={styles.subtitleText}>Freelancing done right</Text>
        </View>
        <View style={styles.ctas}>
          <Button
            bordered
            success
            disabled={loading}
            style={styles.buttonSignin}
            onPress={this.signIn}>
            <Text style={styles.buttonSigninText}>
              {loading ? 'Loading...' : 'Sign In'}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Wrapper(AuthScreen);
