import React from 'react';
import {View, TextInput, Alert, Text, ActivityIndicator} from 'react-native';
import {Button} from 'native-base';
import styles from './SingupStyles';
import {Auth} from '../../services/Auth';

class SignupScreen extends React.Component {
  state = {
    password: '',
    email: '',
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
    const result = await Auth.signUp({email, password});
    this.setState({loading: false});
    if (!result.status) {
      Alert.alert('Something went wrong', result.message);
      return;
    }
    this.props.navigation.navigate('Signin');
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
