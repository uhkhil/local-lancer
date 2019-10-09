import React from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Text } from 'native-base';
import { Api } from '../../services/Api';

export class ProfileEditScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            output: ''
        }
    }

    fetchUserProfile = (userId) => {
        Api.getFreelancerProfile(userId).then(res => {
            const data = res.data;
            console.log('TCL: EditProfileScreen -> fetchUserProfile -> data', data);
            this.setState({ output: JSON.stringify(data, null, 2) })
        })
    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('_id');
        console.log('TCL: EditProfileScreen -> componentDidMount -> userId', userId);
        this.fetchUserProfile(userId);
    }

    render() {
        return <Container>
            <Text>
                Edit profile page
            </Text>
            <Text>
                Response:

            {this.state.output}
            </Text>
        </Container>
    }
}
