import React from 'react';
import {View, ToastAndroid} from 'react-native';
import {Text, Button, DeckSwiper, Icon, Thumbnail, Badge} from 'native-base';
import styles from './HomeStyles';
import {ProjectCard} from '../../components/ProjectCard/ProjectCard';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';
import {AppRole} from '../../enums/AppRole';
import {Colors} from '../../theme/Theme';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://lorempixel.com/400/400/people/3',
      projects: [],
    };
  }

  viewProfile = () => {
    this.props.navigation.navigate('MyProfile');
  };

  viewDMs = () => {
    this.props.navigation.navigate('ChatList');
  };

  fetchProjects = async () => {
    const response = await Api.exploreProjects(this.props.userContext.user._id);
    console.log('TCL: HomeScreen -> fetchProjects -> response', response);
    this.setState({projects: response.data.data});
  };

  componentDidMount() {
    this.fetchProjects();
  }

  giveResponse = async (projectId, response) => {
    const userId = this.props.userContext.user._id;
    console.log(
      'TCL: HomeScreen -> giveResponse -> userId, projectId, response',
      userId,
      projectId,
      response,
    );
    const result = await Api.swipeProject(userId, projectId, response);
    ToastAndroid.show('User response has been logged.', ToastAndroid.SHORT);
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

        <View style={styles.deckContainer}>
          {this.state.projects.length ? (
            <DeckSwiper
              dataSource={this.state.projects}
              renderItem={item => (
                <ProjectCard data={item} giveResponse={this.giveResponse} />
              )}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default Wrapper(HomeScreen);
