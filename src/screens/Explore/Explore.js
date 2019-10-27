import React from 'react';
import {View} from 'react-native';
import {Text, Button, DeckSwiper, Icon, Thumbnail, Badge} from 'native-base';
import styles from './ExploreStyles';
import {ProjectCard} from '../../components/ProjectCard/ProjectCard';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';

class ExploreScreen extends React.Component {
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
    const response = await Api.exploreProjects(this.props.context.user._id);
    console.log('TCL: ExploreScreen -> fetchProjects -> response', response);
    this.setState({projects: response.data.data});
  };

  componentDidMount() {
    this.fetchProjects();
  }

  giveResponse = async (projectId, response) => {
    const userId = this.props.context.user._id;
    console.log(
      'TCL: ExploreScreen -> giveResponse -> userId, projectId, response',
      userId,
      projectId,
      response,
    );
    const result = await Api.swipeProject(userId, projectId, response);
    console.log('TCL: ExploreScreen -> giveResponse -> result', result);
  };

  render() {
    return (
      <View style={styles.container}>
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

export default Wrapper(ExploreScreen);
