import React from 'react';
import auth from '@react-native-firebase/auth';
import {Auth} from '../../services/Auth';
import {Wrapper} from '../../hocs/Wrapper';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log('TCL: AuthLoadingScreen -> constructor -> props', props);
  }

  async componentDidMount() {
    this.authStateSubscriber = auth().onAuthStateChanged(async user => {
      console.log('TCL: AuthLoadingScreen -> componentDidMount -> user', user);
      if (!user) {
        this.props.navigation.navigate('Auth');
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
