import React from 'react';
import { View, Alert } from 'react-native';
import { Text, Button } from 'native-base';
import styles from './AuthStyles';
import { Colors } from '../../theme/Theme';

class AuthScreen extends React.Component {

    signup = () => {
        this.props.navigation.navigate('Signup')
    }

    signin = (method = null) => {
        if (method === null) {
            this.props.navigation.navigate('Signin');
            return
        } else if (method === 'google') {
            Alert.alert('Coming soon', 'Google signin will come soon');
        } else if (method === 'facebook') {
            Alert.alert('Coming soon', 'Facebook signin will come soon');
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.iconContainer}></View>
                    <View style={styles.title}>
                        <Text style={styles.titleText1}>
                            Local
                        </Text>
                        <Text style={styles.titleText2}>
                            Lancer
                        </Text>
                    </View>
                    <Text style={styles.subtitleText}>Freelancing done right</Text>
                </View>
                <View style={styles.ctas}>
                    <Button success
                        style={styles.buttonSignUp}
                        onPress={this.signup}
                    >
                        <Text style={{ color: Colors.white }}>Sign Up</Text>
                    </Button>
                    <Button bordered success
                        style={styles.buttonSignin}
                        onPress={() => this.signin()}
                    >
                        <Text style={styles.buttonSigninText}>Sign In</Text>
                    </Button>

                    <View style={styles.others}>
                        <Button rounded success
                            style={styles.buttonGoogle}
                            onPress={() => this.signin('google')}
                        >
                            <Text style={{ color: Colors.white }}>
                                g
                            </Text>
                        </Button>
                        <Button rounded success
                            style={styles.buttonFacebook}
                            onPress={() => this.signin('facebook')}

                        >
                            <Text style={{ color: Colors.white }}>f</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default AuthScreen