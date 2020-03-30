import React from 'react';
import {View} from 'react-native';
import {Text, Button, Spinner} from 'native-base';

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
            <Text style={styles.titleText1}>local</Text>
            <Text style={styles.titleText2}>lancer</Text>
          </View>
          <Text style={styles.subtitleText}>Work | Hire</Text>
        </View>
        <View style={styles.ctas}>
          <Button
            rounded
            transparent
            disabled={loading}
            style={styles.buttonSignin}
            onPress={this.signIn}>
            {!loading ? (
              <Text style={styles.buttonSigninText}>Let's go</Text>
            ) : (
              <Spinner color="white" size="small" />
            )}
          </Button>
        </View>
      </View>
    );
  }
}

export default Wrapper(AuthScreen);
