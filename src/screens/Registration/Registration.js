import React from 'react';
import {
  View,
  Text,
  Button,
  Icon,
  Spinner,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {Wrapper} from '../../hocs/Wrapper';
import {ScrollView, Dimensions} from 'react-native';
import styles from './RegistrationStyles';
import {FreelancerTheme, RecruiterTheme} from '../../theme/Theme';
import {AppRole} from '../../enums/AppRole';
import {Auth} from '../../services/Auth';

const {width} = Dimensions.get('window');
const totalPages = 3;

/**
 * Screen which actually registers a user to the platform.
 * Registering user on Firebase.
 * Creating necessary records in the database.
 */
class RegistrationScreen extends React.Component {
  state = {
    theme: FreelancerTheme,
    signingIn: false,
    signedIn: false,
    saving: false,
    firstName: '',
    lastName: '',
    currentPage: 0,
  };

  changeRole = role => {
    let theme;
    if (role === AppRole.freelancer) {
      theme = FreelancerTheme;
    } else {
      theme = RecruiterTheme;
    }
    this.setState({theme});
  };

  login = async () => {
    this.setState({signingIn: true});
    const signedIn = await Auth.signIn(this.props.userContext);
    // if user registered
    // if profile setup
    this.setState({signingIn: false, signedIn: true});
  };

  done = () => {
    this.setState({saving: true});
    setTimeout(() => {
      this.setState({saving: false});
    }, 3000);
  };

  prev = () => {
    const {currentPage} = this.state;
    if (currentPage <= 0) {
      return;
    }
    const newWidth = width * (currentPage - 1);
    this.refs._scrollView.scrollTo({x: newWidth, y: 0});
    this.setState({currentPage: currentPage - 1});
  };

  next = () => {
    const {currentPage} = this.state;
    if (currentPage >= totalPages - 1) {
      return;
    }
    const newWidth = width * (currentPage + 1);
    this.refs._scrollView.scrollTo({x: newWidth, y: 0});
    this.setState({currentPage: currentPage + 1});
  };

  header = (hide = false) => {
    return (
      <View style={styles.header}>
        {!hide ? (
          <Button transparent style={styles.previousButton} onPress={this.prev}>
            <Icon
              style={styles.previousButtonIcon}
              name="chevron-left"
              type="FontAwesome"
            />
          </Button>
        ) : null}
      </View>
    );
  };

  footer = (theme, loading = false, last = false) => {
    let action = this.next;
    if (last) {
      action = this.done;
    }
    return (
      <View style={styles.footer}>
        <Button style={styles.nextButton} onPress={action} disabled={loading}>
          {loading ? (
            <Spinner color={theme.primary} />
          ) : (
            <Icon
              style={[styles.nextButtonIcon, {color: theme.primary}]}
              name="chevron-right"
              type="FontAwesome"
            />
          )}
        </Button>
      </View>
    );
  };

  roleSelector = () => {
    const {theme} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header(true)}
        <View style={[styles.main, styles.jcc]}>
          <View style={styles.roleButtons}>
            <Button
              rounded
              style={[styles.roleButton, styles.recruiter]}
              onPress={this.changeRole.bind(null, AppRole.recruiter)}
              success>
              <Text style={styles.roleButtonText}>I'm a recruiter</Text>
            </Button>
            <Button
              rounded
              style={[styles.roleButton, styles.freelancer]}
              onPress={this.changeRole.bind(null, AppRole.freelancer)}>
              <Text style={styles.roleButtonText}>I'm a freelancer</Text>
            </Button>
          </View>
        </View>
        {this.footer(theme)}
      </View>
    );
  };

  accountLinker = () => {
    const {theme, signingIn, signedIn} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header()}
        <View style={[styles.main, styles.jcc]}>
          <View style={styles.roleButtons}>
            <Button
              rounded
              iconLeft
              style={[styles.googleButton]}
              disabled={signedIn}
              onPress={this.login}>
              {signedIn ? (
                <Icon name="check" type="FontAwesome" style={theme.color} />
              ) : null}
              <Text style={[styles.roleButtonText, theme.color]}>
                {signedIn ? 'Linked Google' : 'Link Google'}
              </Text>
            </Button>
          </View>
        </View>
        {this.footer(theme, signingIn)}
      </View>
    );
  };

  nameEditor = () => {
    const {theme, saving} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header()}
        <View style={[styles.main, styles.nameEditor]}>
          <Text style={styles.actionText}>Did we say it, right?</Text>
          <Form style={styles.nameForm}>
            <Item stackedLabel>
              <Label style={styles.label}>First Name</Label>
              <Input
                style={styles.input}
                value={this.state.firstName}
                onChangeText={text => this.setState({firstName: text})}
              />
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>Last Name</Label>
              <Input
                style={styles.input}
                value={this.state.lastName}
                onChangeText={text => this.setState({lastName: text})}
              />
            </Item>
          </Form>
        </View>
        {this.footer(theme, saving, true)}
      </View>
    );
  };

  render() {
    const {theme} = this.state;
    return (
      <ScrollView
        ref="_scrollView"
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={{backgroundColor: theme.primary}}>
        {this.roleSelector()}
        {this.accountLinker()}
        {this.nameEditor()}
      </ScrollView>
    );
  }
}

export default Wrapper(RegistrationScreen);
