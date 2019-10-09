import React from 'react';
import {View, TextInput, Alert, Text, ActivityIndicator} from 'react-native';
import {Button} from 'native-base';
import {auth} from '@react-native-firebase/auth';
import styles from './SingupStyles';
import {Api} from '../../services/Api';

class SignupScreen extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    loading: false,
  };
  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  signup = async () => {
    const {email, password} = this.state;
    if (!email || !password) {
      Alert.alert("Nope, can't do", 'No empty emails / passwords');
      return;
    }
    this.setState({loading: true});
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const body = {email};
          Api.signedUpWithEmail(body)
            .then(res => {
              console.log('TCL: SignupScreen -> signup -> res', res);
              this.props.navigation.navigate('Signin');
            })
            .catch(err => {
              console.log('TCL: SignupScreen -> signup -> err', err);
            });
        })
        .catch(error => {
          console.log('TCL: SignupScreen -> signUp -> error', error);
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert('Something went wrong', error.message);
        })
        .finally(() => {
          this.setState({loading: false});
        });
    } catch (err) {
      console.log('error signing up: ', err);
      Alert.alert('Something went wrong', 'Please try again later.');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <Text style={styles.signupText}>Sign Up</Text>
        </View>
        <View style={styles.lower}>
          <View style={styles.inputs}>
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="gray"
                onChangeText={val => this.onChangeText('email', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor="gray"
                onChangeText={val => this.onChangeText('password', val)}
              />
            </View>
            <Button success style={styles.buttonSubmit} onPress={this.signup}>
              {this.state.loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonSubmitText}>Done</Text>
              )}
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default SignupScreen;
