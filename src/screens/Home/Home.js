import React from 'react';
import {
  View,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {Text} from 'native-base';
import {Pulse} from 'react-native-loader';
import Carousel from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';

import {LLCard} from '../../components/LLCard/LLCard';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';
import {AppRole} from '../../enums/AppRole';
import Messages from './Messages';
import ProfileButton from './ProfileButton';
import styles from './HomeStyles';

const {width} = Dimensions.get('window');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      loading: false,
      currentLocation: {},
    };
    this.init();
  }

  init = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    this.fetchLocation();
  };

  sendLocation = async () => {
    const {currentLocation} = this.state;
    await Api.updateUser(currentLocation);
  };

  fetchLocation = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({currentLocation: position.coords});
          this.fetchCards();
          this.sendLocation();
        },
        error => {
          console.warn('error', error);
        },
        {
          enableHighAccuracy: true,
          useSignificantChanges: true,
        },
      );
    }
  };

  openMatchedModal = cardData => {
    const user = cardData.user;
    const self = this.props.userContext.user;
    this.props.navigation.navigate('MatchedModal', {
      firstName: self.firstName,
      secondName: user.firstName,
      firstImage: self.image,
      secondImage: user.image,
      closeModal: this.closeModal,
      openChat: this.openChat,
    });
  };
  closeModal = () => this.props.navigation.pop();
  openChat = () => {
    this.props.navigation.pop();
    this.props.navigation.navigate('ChatList');
  };

  viewProfile = () => {
    this.props.navigation.navigate('MyProfile');
  };

  viewDMs = () => {
    this.props.navigation.navigate('ChatList');
  };

  viewCardDetails = (data, role) => {
    this.props.navigation.navigate('CardDetails', {
      data,
      role,
      giveResponse: this.giveResponse,
    });
  };

  fetchCards = async () => {
    let response;
    const {longitude, latitude} = this.state.currentLocation;
    this.setState({loading: true});
    switch (this.props.userContext.userMode) {
      case AppRole.freelancer:
        response = await Api.exploreProjects({longitude, latitude});
        this.setState({cards: response.data.data});
        break;
      case AppRole.recruiter:
        response = await Api.exploreFreelancers({longitude, latitude});
        this.setState({cards: response.data.data});
        break;
    }
    this.setState({loading: false});
  };

  giveResponse = async (projectId, response, freelancerId = null, cardData) => {
    const userMode = this.props.userContext.userMode;
    let result;
    switch (userMode) {
      case AppRole.freelancer:
        result = await Api.swipeProject(projectId, response);
        const newProjects = this.state.cards.filter(p => p._id !== projectId);
        this.setState({cards: newProjects});
        break;
      case AppRole.recruiter:
        result = await Api.swipeFreelancer(projectId, freelancerId, response);
        const newFreelancers = this.state.cards.filter(
          f => f.userId !== freelancerId,
        );
        this.setState({cards: newFreelancers});
        break;
      default:
        console.warn('Unknown userMode');
    }
    if (result.data.justMatched) {
      this.openMatchedModal(cardData);
    } else {
      ToastAndroid.show(
        'No match yet. User response has been logged.',
        ToastAndroid.SHORT,
      );
    }
  };

  renderEmpty = () => {
    const userMode = this.props.userContext.userMode;
    return (
      <TouchableOpacity onPress={this.fetchCards} style={styles.empty}>
        <Text style={styles.emptyText}>
          {userMode === AppRole.freelancer
            ? 'No projects around :('
            : 'No freelancers around :('}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {userMode} = this.props.userContext;
    const role =
      userMode === AppRole.recruiter ? AppRole.freelancer : AppRole.recruiter;
    return (
      <View
        style={[styles.container, {backgroundColor: this.props.theme.primary}]}>
        <View style={styles.topPanel}>
          <ProfileButton
            style={styles.profileBtn}
            viewProfile={this.viewProfile}
          />
          <Messages style={styles.dmBtn} viewDMs={this.viewDMs} />
        </View>

        {this.state.loading ? (
          <View style={styles.loading}>
            <Pulse size={100} color="#fff" />
          </View>
        ) : (
          <View style={styles.deckContainer}>
            {this.state.cards.length ? (
              <View style={styles.carouselWrapper}>
                <Carousel
                  data={this.state.cards}
                  renderItem={card => (
                    <LLCard
                      key={card.index}
                      role={role}
                      short={true}
                      data={card.item}
                      giveResponse={this.giveResponse}
                      viewDetails={this.viewCardDetails.bind(
                        null,
                        card.item,
                        role,
                      )}
                    />
                  )}
                  sliderWidth={width}
                  itemWidth={350}
                />
              </View>
            ) : (
              this.renderEmpty()
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Wrapper(HomeScreen);
