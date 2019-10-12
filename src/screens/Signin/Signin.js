import React from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Button} from 'native-base';
import auth from '@react-native-firebase/auth';
import styles from './SigninStyles';
import {Api} from '../../services/Api';

class SigninScreen extends React.Component {
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

  signin = async () => {
    const {password, email} = this.state;
    if (!email || !password) {
      Alert.alert("Nope, can't do", 'No empty emails / passwords');
      return;
    }
    this.setState({loading: true});
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(async res => {
          console.log('TCL: SigninScreen -> signin -> res', res);
          const firebaseId = res.user._user.uid;
          const userInfo = await Api.getUserInfo(firebaseId);
          console.log('TCL: SigninScreen -> signin -> userInfo', userInfo);
          if (userInfo.data.status) {
            const dataObj = userInfo.data.data[0];
            const dataArray = Object.entries(dataObj);
            console.log('TCL: SigninScreen -> signin -> dataArray', dataArray);
            await AsyncStorage.multiSet(dataArray);
          }
          console.log('TCL: SigninScreen -> signin -> userInfo', userInfo);
          const userId = userInfo.data.data._id;
          // const freelancerProfile = await Api.getFreelancerProfile(userId);
          let firstTime = true;
          const userProfile = userInfo.data.data[0];
          if (
            userProfile &&
            (userProfile.freelancerProfile || userProfile.recruiterProfile)
          ) {
            firstTime = false;
          }
          if (firstTime) {
            this.props.navigation.navigate('ProfileSetup');
          } else {
            this.props.navigation.navigate('Home');
          }
        })
        .catch(error => {
          console.log('TCL: SigninScreen -> signIn -> error', error);
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert('Something went wrong', errorMessage);
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
          <Text style={styles.signupText}>Sign In</Text>
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
            <Button success style={styles.buttonSubmit} onPress={this.signin}>
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

export default SigninScreen;
