import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Text, Thumbnail, H1, ListItem, List, Button} from 'native-base';
import {Colors} from '../../theme/Theme';
import {Wrapper} from '../../hocs/Wrapper';
import {Auth} from '../../services/Auth';
import {AppRole} from '../../enums/AppRole';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.userContext.user;
  }

  signout = async () => {
    Alert.alert('Log out?', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        onPress: async () => {
          await Auth.signOut(this.props.userContext);
          this.props.navigation.navigate('Registration');
        },
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };

  render() {
    const {userMode} = this.props.userContext;
    return (
      <View style={styles.container}>
        <View style={[styles.mainSection, this.props.theme.background]}>
          <Thumbnail
            style={styles.profileImage}
            source={{uri: this.user.image}}
          />
          <H1 style={styles.name}>
            {this.user.firstName} {this.user.lastName}
          </H1>
          <Button
            style={styles.editButton}
            transparent
            onPress={() =>
              this.props.navigation.navigate('FreelancerSetup', {
                newProfile: false,
              })
            }>
            {/* <Text style={styles.editButtonText}>Edit Profile</Text> */}
          </Button>
        </View>
        <View>
          <List style={styles.list}>
            {/* <ListItem
              noBorder
              style={styles.item}
              onPress={() => this.props.navigation.navigate('MyPortfolio')}>
              <Text style={styles.itemText}>My Card</Text>
            </ListItem> */}
            {/* {userMode === AppRole.recruiter ? (
              <ListItem
                noBorder
                style={styles.item}
                onPress={() => this.props.navigation.navigate('ProjectList')}>
                <Text style={styles.itemText}>My Projects</Text>
              </ListItem>
            ) : null} */}
            <ListItem
              noBorder
              style={styles.item}
              onPress={() => this.props.navigation.navigate('About')}>
              <Text style={styles.itemText}>About</Text>
            </ListItem>
          </List>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.signout}
            block
            style={[
              styles.logoutButton,
              {backgroundColor: this.props.theme.primary},
            ]}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    color: Colors.white,
  },
  profileImage: {
    margin: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  editButtonText: {
    textAlign: 'center',
    color: Colors.white,
  },
  mainSection: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 5,
  },
  list: {
    margin: 15,
  },
  item: {
    marginLeft: 5,
  },
  itemText: {
    color: Colors.dark,
  },
  logoutButton: {
    margin: 10,
  },
  logoutButtonText: {
    color: Colors.white,
  },
});

export default Wrapper(ProfileScreen);
