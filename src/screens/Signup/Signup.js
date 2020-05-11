import React from 'react';
import {View} from 'react-native';
import {
  Text,
  Button,
  Spinner,
  Form,
  Item,
  Label,
  Input,
  Icon,
} from 'native-base';

import styles from './SignupStyles';
import {Auth} from '../../services/Auth';
import {Wrapper} from '../../hocs/Wrapper';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: 'akhilnareshkumar+20200510@gmail.com',
      password: 'akhil@123',
    };
  }

  signIn = () => {
    this.props.navigation.navigate('Signin');
  };

  signUp = async () => {
    // Validate
    const {email, password} = this.state;
    if (!email || !password) {
      console.log('incorrect credentials');
      return;
    }
    await Auth.signUp(email, password);
    // TODO: Handle the verification flow

    // this.signIn();
  };

  signInWithGoogle = async () => {
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
        <View style={styles.title}>
          <Text style={styles.titleText}>Sign Up</Text>
        </View>
        <View style={styles.form}>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
            </Item>
          </Form>
          <View style={styles.socials}>
            <Button icon transparent style={styles.social}>
              <Icon
                name="facebook"
                type="FontAwesome"
                style={styles.socialIcon}
              />
            </Button>
            <Button
              icon
              transparent
              style={styles.social}
              onPress={this.signInWithGoogle}>
              <Icon
                name="google"
                type="FontAwesome"
                style={styles.socialIcon}
              />
            </Button>
          </View>
          <Button style={styles.actionButton}>
            <Text style={styles.actionButtonText} onPress={this.signUp}>
              Sign Up
            </Text>
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText} onPress={this.signIn}>
            Sign In
          </Text>
        </View>
      </View>
    );
  }
}

export default Wrapper(SignupScreen);

// import React from 'react';
// import {View, TextInput, Alert, Text, ActivityIndicator} from 'react-native';
// import {Button} from 'native-base';
// import styles from './SingupStyles';
// import {Auth} from '../../services/Auth';

// class SignupScreen extends React.Component {
//   state = {
//     password: '',
//     email: '',
//     loading: false,
//   };
//   onChangeText = (key, val) => {
//     this.setState({[key]: val});
//   };

//   signup = async () => {
//     const {email, password} = this.state;
//     if (!email || !password) {
//       Alert.alert("Nope, can't do", 'No empty emails / passwords');
//       return;
//     }
//     this.setState({loading: true});
//     const result = await Auth.signUp({email, password});
//     this.setState({loading: false});
//     if (!result.status) {
//       Alert.alert('Something went wrong', result.message);
//       return;
//     }
//     this.props.navigation.navigate('Signin');
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.upper}>
//           <Text style={styles.signupText}>Sign Up</Text>
//         </View>
//         <View style={styles.lower}>
//           <View style={styles.inputs}>
//             <View style={styles.card}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 autoCapitalize="none"
//                 placeholderTextColor="gray"
//                 onChangeText={val => this.onChangeText('email', val)}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry={true}
//                 autoCapitalize="none"
//                 placeholderTextColor="gray"
//                 onChangeText={val => this.onChangeText('password', val)}
//               />
//             </View>
//             <Button success style={styles.buttonSubmit} onPress={this.signup}>
//               {this.state.loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text style={styles.buttonSubmitText}>Done</Text>
//               )}
//             </Button>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// export default SignupScreen;
