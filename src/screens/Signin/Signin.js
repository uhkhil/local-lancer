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

import styles from './SigninStyles';
import {Auth} from '../../services/Auth';
import {Wrapper} from '../../hocs/Wrapper';

class SigninScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

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

  signUp = () => {
    this.props.navigation.navigate('Signup');
  };

  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Sign In</Text>
        </View>
        <View style={styles.form}>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input />
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
            <Text style={styles.actionButtonText}>Sign In</Text>
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText} onPress={this.signUp}>
            Sign Up
          </Text>
        </View>
      </View>
    );
  }
}

export default Wrapper(SigninScreen);

// import React from 'react';
// import {View, TextInput, Alert, Text, ActivityIndicator} from 'react-native';
// import {Button} from 'native-base';
// import styles from './SigninStyles';
// import {Auth} from '../../services/Auth';
// import {Wrapper} from '../../hocs/Wrapper';

// class SigninScreen extends React.Component {
//   state = {
//     username: '',
//     password: '',
//     email: '',
//     phone_number: '',
//     loading: false,
//   };

//   onChangeText = (key, val) => {
//     this.setState({[key]: val});
//   };

//   signin = async () => {
//     let {password, email} = this.state;
//     if (!email) {
//       email = 'akhilnareshkumar+r0@gmail.com';
//       password = 'password';
//     }
//     if (!email || !password) {
//       Alert.alert("Nope, can't do", 'No empty emails / passwords');
//       return;
//     }
//     this.setState({loading: true});
//     const result = await Auth.signIn(
//       {
//         type: 'email',
//         email,
//         password,
//       },
//       this.props.userContext,
//     );
//     if (!result) {
//       Alert.alert(
//         'Something went wrong',
//         'Please check your email and password',
//       );
//       this.setState({loading: false});
//       return;
//     }
//     Auth.checkNavigationFlow(
//       this.props.userContext,
//       this.props.navigation,
//       this.props.theme,
//     );
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.upper}>
//           <Text style={styles.signupText}>Sign In</Text>
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
//             <Button success style={styles.buttonSubmit} onPress={this.signin}>
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

// export default Wrapper(SigninScreen);
