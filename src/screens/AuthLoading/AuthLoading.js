import React from 'react';
import auth from '@react-native-firebase/auth';
import {Auth} from '../../services/Auth';
import {Wrapper} from '../../hocs/Wrapper';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.authStateSubscriber = auth().onAuthStateChanged(async user => {
      if (!user) {
        this.props.navigation.navigate('Onboarding');
      } else {
        await Auth.postAuth(user.uid, this.props.userContext);
        await Auth.checkNavigationFlow(
          this.props.userContext,
          this.props.navigation,
          this.props.theme,
        );
      }
    });
  }

  componentWillUnmount() {
    this.authStateSubscriber();
  }

  navigateToSignin = () => {
    this.props.navigation.navigate('Auth');
  };

  navigateToHome = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    // TODO: Add splashscreen / loader
    return null;
  }
}

export default Wrapper(AuthLoadingScreen);
