import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Thumbnail, H1, ListItem, List, Button} from 'native-base';
import {Colors} from '../../theme/Theme';
import {Wrapper} from '../../hocs/Wrapper';
import {Auth} from '../../services/Auth';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.userContext.user;
  }

  signout = async () => {
    await Auth.signOut(this.props.userContext);
    this.props.navigation.navigate('Signin');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainSection}>
          <Thumbnail
            style={styles.profileImage}
            source={{uri: 'https://lorempixel.com/400/400/people/1'}}
          />
          <H1 style={styles.name}>
            {this.user.firstName} {this.user.lastName}
          </H1>
          <Button
            style={styles.editButton}
            transparent
            onPress={() => this.props.navigation.navigate('ProfileEdit')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Button>
        </View>
        <View>
          <List>
            <ListItem
              noBorder
              style={styles.item}
              onPress={() => this.props.navigation.navigate('MyPortfolio')}>
              <Text style={styles.itemText}>My Portfolio</Text>
            </ListItem>
            <ListItem
              noBorder
              style={styles.item}
              onPress={() => this.props.navigation.navigate('ProjectList')}>
              <Text style={styles.itemText}>My Projects</Text>
            </ListItem>
            <ListItem
              noBorder
              style={styles.item}
              onPress={() => this.props.navigation.navigate('About')}>
              <Text style={styles.itemText}>About</Text>
            </ListItem>
          </List>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.signout} block style={styles.logoutButton}>
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
  item: {
    // borderLeftWidth: 5,
    // borderLeftColor: Colors.primaryColor,
  },
  itemText: {
    color: Colors.dark,
  },
  logoutButton: {
    backgroundColor: Colors.primaryColor,
  },
  logoutButtonText: {
    color: Colors.white,
  },
});

export default Wrapper(ProfileScreen);
