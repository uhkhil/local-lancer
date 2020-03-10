import React from 'react';
import {Container, Text} from 'native-base';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: '',
    };
    this.fetchUserProfile(props.userContext.user._id);
  }

  fetchUserProfile = () => {
    Api.getFreelancerProfile().then(res => {
      const data = res.data;
      this.setState({output: JSON.stringify(data, null, 2)});
    });
  };

  render() {
    return (
      <Container>
        <Text>Edit profile page - pending...</Text>
        <Text>
          Response:
          {this.state.output}
        </Text>
      </Container>
    );
  }
}

export const ProfileEditScreen = Wrapper(ProfileEdit);
