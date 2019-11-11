import React from 'react';
import {View, ToastAndroid} from 'react-native';
import {Text, Button, DeckSwiper, Icon, Thumbnail, Badge} from 'native-base';
import {Pulse} from 'react-native-loader';

import styles from './HomeStyles';
import {ProjectCard} from '../../components/ProjectCard/ProjectCard';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';
import {AppRole} from '../../enums/AppRole';
import {Colors} from '../../theme/Theme';
import {FreelancerCard} from '../../components/FreelancerCard/FreelancerCard';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://lorempixel.com/400/400/people/3',
      projects: [],
      freelancers: [],
      loading: false,
    };
  }

  viewProfile = () => {
    this.props.navigation.navigate('MyProfile');
  };

  viewDMs = () => {
    this.props.navigation.navigate('ChatList');
  };

  fetchCards = async () => {
    const userId = this.props.userContext.user._id;
    let response;
    this.setState({loading: true});
    switch (this.props.userContext.userMode) {
      case AppRole.freelancer:
        response = await Api.exploreProjects(userId);
        console.log('TCL: HomeScreen -> fetchProjects -> response', response);
        this.setState({projects: response.data.data});
        break;
      case AppRole.recruiter:
        response = await Api.exploreFreelancers(userId);
        console.log('TCL: HomeScreen -> fetchCards -> response', response);
        this.setState({freelancers: response.data.data});
        break;
    }
    this.setState({loading: false});
  };

  componentDidMount() {
    this.fetchCards();
  }

  giveResponse = async (projectId, response, freelancerId = null) => {
    const userId = this.props.userContext.user._id;
    const userMode = this.props.userContext.userMode;
    console.log(
      'TCL: HomeScreen -> giveResponse -> userId, projectId, response',
      userId,
      projectId,
      response,
    );
    let result;
    switch (userMode) {
      case AppRole.freelancer:
        result = await Api.swipeProject(userId, projectId, response);
        const newProjects = this.state.projects.filter(
          p => p._id !== projectId,
        );
        this.setState({projects: newProjects});
        break;
      case AppRole.recruiter:
        result = await Api.swipeFreelancer(
          userId,
          projectId,
          freelancerId,
          response,
        );
        const newFreelancers = this.state.freelancers.filter(
          f => f.userId !== freelancerId,
        );
        this.setState({freelancers: newFreelancers});
        break;
      default:
        console.warn('Unknown userMode');
    }
    console.log('TCL: HomeScreen -> giveResponse -> result', result);
    if (result.data.justMatched) {
      ToastAndroid.show('You matched!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'No match yet. User response has been logged.',
        ToastAndroid.SHORT,
      );
    }
    console.log('TCL: HomeScreen -> giveResponse -> result', result);
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              this.props.userContext.userMode === AppRole.freelancer
                ? Colors.freelancerPrimary
                : Colors.recruiterPrimary,
          },
        ]}>
        <View style={styles.topPanel}>
          <Button
            rounded
            transparent
            style={styles.profileBtn}
            onPress={this.viewProfile}>
            <Thumbnail source={{uri: this.state.image}} />
          </Button>
          <Button
            rounded
            transparent
            onPress={this.viewDMs}
            style={styles.dmBtn}>
            <Icon
              type="MaterialIcons"
              style={styles.dmIcon}
              name="mail"
              onPress={this.viewDMs}
            />
            <Badge primary style={styles.dmBadge}>
              <Text>2</Text>
            </Badge>
          </Button>
        </View>

        {this.state.loading ? (
          <View style={styles.loading}>
            <Pulse size={100} color="#fff" />
          </View>
        ) : this.props.userContext.userMode === AppRole.freelancer ? (
          <View style={styles.deckContainer}>
            {this.state.projects.length ? (
              <DeckSwiper
                dataSource={this.state.projects}
                renderItem={item => (
                  <ProjectCard
                    key={item._id}
                    data={item}
                    giveResponse={this.giveResponse}
                  />
                )}
              />
            ) : null}
          </View>
        ) : (
          <View style={styles.deckContainer}>
            {this.state.freelancers.length ? (
              <DeckSwiper
                dataSource={this.state.freelancers}
                renderItem={item => (
                  <FreelancerCard
                    key={item._id}
                    data={item}
                    giveResponse={this.giveResponse}
                  />
                )}
              />
            ) : null}
          </View>
        )}
      </View>
    );
  }
}

export default Wrapper(HomeScreen);