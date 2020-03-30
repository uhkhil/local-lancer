import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  AsyncStorage,
} from 'react-native';
import {Text, Button, Picker, Item} from 'native-base';
import styles from './ProfileSetupStyles';
import {AppRole} from '../../enums/AppRole';
import {Colors} from '../../theme/Theme';
import {Api} from '../../services/Api';
import {Wrapper} from '../../hocs/Wrapper';

const {width, height} = Dimensions.get('window');

// TODO: Fetch dynamically
const allDomains = [
  {
    _id: '5d66d94bb2ee51fe82d5c6ce',
    name: 'Web designer',
  },
  {
    _id: '5d66d94bb2ee51fe82d5c6cf',
    name: 'Content writer',
  },
  {
    _id: '5d66d94bb2ee51fe82d5c6d0',
    name: 'Graphic designer',
  },
  {
    _id: '5d66d94bb2ee51fe82d5c6d1',
    name: 'Logo creator',
  },
  {
    _id: '5d66d94bb2ee51fe82d5c6d2',
    name: 'Mobile developer',
  },
];

class ProfileSetupScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    const {user, userMode} = props.userContext;
    console.log(
      'ProfileSetupScreen -> constructor -> props.navigation',
      props.navigation,
    );
    const {newProfile} = props.navigation.state.params;
    this.state = {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      role: userMode,
      pageIndex: 0,
      selectedDomain: undefined,
      selectedDomains: [],
      newProfile,
    };
  }

  fetchProfileInfo = async () => {
    try {
      const {userMode} = this.props.userContext;
      if (userMode === AppRole.freelancer) {
        const res = await Api.getFreelancerProfile();
        const {data} = res.data;
        const domains = data[0].freelancerProfile[0].domains;
        console.log(
          'ProfileSetupScreen -> fetchProfileInfo -> domains',
          domains,
        );
        if (domains) {
          this.setState({selectedDomains: domains});
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  componentDidMount() {
    const {newProfile} = this.state;
    if (newProfile) {
      setTimeout(() => {
        this.next();
      }, 1000);
    } else {
      this.fetchProfileInfo();
    }
    this.userId = this.props.userContext.user._id;
  }

  selectRole = role => {
    switch (role) {
      case AppRole.freelancer:
        this.setState({role});
        this.props.userContext.setUserMode(role);
        this.props.theme.setTheme(role);
        this.next();
        break;
      case AppRole.recruiter:
        // TODO: Call API to store profile
        this.setState({role});
        this.props.userContext.setUserMode(role);
        this.props.theme.setTheme(role);
        this.submitProfile(role);
        break;
      default:
    }
  };

  nextPage = pageName => {
    switch (pageName) {
      case 'name':
        if (this.state.firstName === '' || this.state.lastName === '') {
          Alert.alert('Excuse me, sir', 'Your full name is required');
        } else {
          this.next();
        }
        break;
      case 'domain':
        // check domains
        if (!this.state.selectedDomains.length) {
          Alert.alert('Excuse me, sir', 'Please add at least 1 domain');
        } else {
          this.submitProfile(AppRole.freelancer);
        }
        break;
      case 'skill':
        if (!this.state.selectedSkills.length) {
          Alert.alert('Excuse me, sir', 'Please add at least 1 skill');
        } else {
          this.submitProfile(AppRole.freelancer);
        }
        break;
    }
  };

  submitProfile = role => {
    const {newProfile, firstName, lastName, selectedDomains} = this.state;
    let body = {};
    if (role === AppRole.recruiter) {
      this.props.userContext.setUserMode(1);
      body = {
        firstName,
        lastName,
        role,
      };
      if (newProfile) {
        Api.createRecruiterProfile(body)
          .then(res => {
            this.props.navigation.navigate('Home');
          })
          .catch(err => {});
      } else {
        Api.updateRecruiterProfile(body)
          .then(res => {
            this.props.userContext.setUserFields({firstName, lastName});
            this.props.navigation.navigate('Home');
          })
          .catch(err => {});
      }
    } else {
      this.props.userContext.setUserMode(0);
      body = {
        firstName,
        lastName,
        domains: selectedDomains,
      };
      if (newProfile) {
        Api.createFreelancerProfile(body)
          .then(res => {
            this.props.navigation.navigate('Home');
          })
          .catch(err => {});
      } else {
        Api.updateFreelancerProfile(body)
          .then(res => {
            this.props.userContext.setUserFields({firstName, lastName});
            this.props.navigation.navigate('Home');
          })
          .catch(err => {});
      }
    }
    // this.props.navigation.navigate('Home');
  };

  next = () => {
    const newWidth = width * (this.state.pageIndex + 1);
    this.refs._scrollView.scrollTo({x: newWidth, y: 0});
    // TODO: This should be handled on scroll end
    this.setState({pageIndex: this.state.pageIndex + 1});
  };

  renderNextButton(currentSection) {
    return (
      <Button
        style={styles.button}
        onPress={() => this.nextPage(currentSection)}>
        <Text style={[styles.buttonText, this.props.theme.color]}>Next</Text>
      </Button>
    );
  }

  renderWelcome = () => {
    return (
      <View style={[styles.singlePage, this.props.theme.background]}>
        <View style={styles.bigTextContainer}>
          <Text style={styles.bigText}>Let's get you started.</Text>
        </View>
      </View>
    );
  };

  renderName = () => {
    const {firstName, lastName, newProfile} = this.state;
    let text = "Let's start with your name";
    if (!newProfile) {
      text = 'Your name visible to others';
    }
    return (
      <View style={[styles.singlePage, this.props.theme.background]}>
        <View style={styles.mainSection}>
          <Text style={styles.bigText}>{text}</Text>
          <View style={styles.nameContainer}>
            <TextInput
              style={styles.input}
              placeholder="First"
              autoCapitalize="none"
              placeholderTextColor="gray"
              value={firstName}
              onChangeText={val => this.setState({firstName: val})}
            />
            <TextInput
              style={styles.input}
              placeholder="Last"
              autoCapitalize="none"
              placeholderTextColor="gray"
              value={lastName}
              onChangeText={val => this.setState({lastName: val})}
            />
          </View>
        </View>
        <View style={styles.buttonSection}>
          <View style={styles.buttonContainer}>
            {this.renderNextButton('name')}
          </View>
        </View>
      </View>
    );
  };

  addDomain = value => {
    const selectedDomains = this.state.selectedDomains;
    const already = selectedDomains.find(dom => dom._id === value);
    if (already) {
      return;
    }
    const theOne = allDomains.find(dom => dom._id === value);
    selectedDomains.push(theOne);
    this.setState({
      selectedDomains,
      selectedDomain: value,
    });
  };

  removeDomain = value => {
    const selectedDomains = this.state.selectedDomains;
    const newSelectedDomains = selectedDomains.filter(dom => dom._id !== value);
    this.setState({selectedDomains: newSelectedDomains});
  };

  renderDomainPickerItems = () => {
    return allDomains.map(dom => {
      return <Picker.Item key={dom._id} label={dom.name} value={dom._id} />;
    });
  };

  renderSelectedDomains = doms =>
    doms.map(dom => (
      <View key={dom._id} style={styles.chip}>
        <TouchableOpacity onPress={() => this.removeDomain(dom._id)}>
          <Text style={styles.chipText}>{dom.name}</Text>
        </TouchableOpacity>
      </View>
    ));

  renderPicker = () => {
    return (
      <View style={[styles.singlePage, this.props.theme.background]}>
        <View style={styles.twoButtonContainer}>
          <Button
            style={styles.twoButton}
            onPress={() => this.selectRole(AppRole.freelancer)}>
            <Text style={[styles.twoButtonText, this.props.theme.color]}>
              I am a Freelancer
            </Text>
          </Button>
          <Button
            style={styles.twoButton}
            onPress={() => this.selectRole(AppRole.recruiter)}>
            <Text style={[styles.twoButtonText, this.props.theme.color]}>
              I am a Recruiter
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  renderDomain = () => {
    return (
      <View style={[styles.singlePage, this.props.theme.background]}>
        <View style={styles.pickerSection}>
          <Item picker>
            <Picker
              mode="dropdown"
              style={{width: undefined}}
              placeholder="Select Domain"
              placeholderStyle={{color: Colors.white}}
              placeholderIconColor={Colors.white}
              textStyle={{color: Colors.white, textAlign: 'center'}}
              itemStyle={{
                backgroundColor: '#d3d3d3',
                marginLeft: 0,
                paddingLeft: 10,
              }}
              itemTextStyle={{color: '#788ad2'}}
              selectedValue={this.state.selectedDomain}
              onValueChange={event => {
                this.addDomain(event);
              }}>
              {this.renderDomainPickerItems()}
            </Picker>
          </Item>
          <View style={styles.chipsContainer}>
            {this.renderSelectedDomains(this.state.selectedDomains)}
          </View>
        </View>
        <View style={styles.buttonSection}>
          <View style={styles.buttonContainer}>
            {this.renderNextButton('domain')}
          </View>
        </View>
      </View>
    );
  };

  renderAllSet = () => {
    return (
      <View style={[styles.singlePage, this.props.theme.background]}>
        <View style={styles.bigTextContainer}>
          <Image
            style={{
              height: 100,
              width: 100,
              alignSelf: 'center',
              marginTop: -100,
            }}
            source={require('../../assets/icons/check-mark.png')}
          />
          <View style={{marginTop: 40}}>
            <Text style={styles.bigText}>Great!</Text>
            <Text style={styles.bigText}>You're all set!</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {newProfile} = this.state;
    return (
      <ScrollView
        ref="_scrollView"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}>
        {newProfile ? this.renderWelcome() : null}
        {this.renderName()}
        {newProfile ? this.renderPicker() : null}
        {this.state.role === AppRole.freelancer ? this.renderDomain() : null}
        {this.renderAllSet()}
      </ScrollView>
    );
  }
}

export default Wrapper(ProfileSetupScreen);
