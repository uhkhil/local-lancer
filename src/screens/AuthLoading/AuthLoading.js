import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    console.log('heh');
    this.authStateSubscriber = auth().onAuthStateChanged(async user => {
      console.log('TCL: AuthLoadingScreen -> componentDidMount -> user', user);
      // if (user) {
      //   const storedUserInfoKeys = await AsyncStorage.getAllKeys();
      //   storedUserInfoKeys.map()
      // }
      this.props.navigation.navigate(user ? 'Home' : 'Auth');
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
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Splash screen</Text>

        <Button onPress={this.navigateToSignin} title="Not signed in" />

        <Button onPress={this.navigateToHome} title="Already signed in" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
