import React from 'react';
import {
  View,
  Text,
  Button,
  Icon,
  Spinner,
  Form,
  Item,
  Input,
  Textarea,
} from 'native-base';
import {Wrapper} from '../../hocs/Wrapper';
import {ScrollView, Dimensions, ToastAndroid} from 'react-native';
import styles from './RecruiterSetupStyles';
import {RecruiterTheme} from '../../theme/Theme';
import {Api} from '../../services/Api';

const {width} = Dimensions.get('window');
const totalPages = 5;

class RecruiterSetupScreen extends React.Component {
  state = {
    theme: RecruiterTheme,
    submitting: false,
    currentPage: 0,
    title: '',
    allDomains: [],
    domains: [],
    description: '',
    initialLoading: false,
    newProfile: null,
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    this.setState({initialLoading: true});
    const {newProfile} = this.props.navigation.state.params;
    this.setState({newProfile});

    // Fetch domains
    const domainsResponse = await Api.getDomains();
    const {data} = domainsResponse.data;
    this.setState({
      allDomains: data.map(domain => ({...domain, selected: false})),
    });
    // Fetch profile info

    this.setState({initialLoading: false});
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

  selectDomain = _id => {
    const {allDomains} = this.state;
    const newDomains = allDomains.map(domain => {
      if (domain._id === _id) {
        domain.selected = !domain.selected;
      }
      return domain;
    });
    if (newDomains.filter(domain => domain.selected).length > 3) {
      ToastAndroid.show('Only 3 are allowed', ToastAndroid.SHORT);
      return;
    }
    const domains = newDomains.filter(domain => domain.selected);
    this.setState({allDomains: newDomains, domains});
  };

  validDomains = () => {
    const {domains} = this.state;
    return domains.length > 0;
  };

  submit = async () => {
    const {domains, title, description, newProfile} = this.state;
    this.setState({submitting: true});

    if (!title) {
      return;
    } else if (!domains.length) {
      return;
    } else if (!description) {
      return;
    }

    const requestObj = {
      title,
      domains: domains.map(domain => domain._id),
      description: description,
    };

    let apiResponse;
    if (newProfile) {
      apiResponse = await Api.createProject(requestObj);
    } else {
      apiResponse = await Api.editProject(requestObj);
    }

    this.setState({submitting: false});
    if (newProfile) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.pop();
    }
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

  footer = (theme, loading = false, last = false, hidden = false) => {
    let action = this.next;
    if (last) {
      action = this.done;
    }
    return (
      <View style={styles.footer}>
        <Button
          style={[styles.nextButton, hidden ? styles.hidden : null]}
          onPress={action}
          disabled={loading || hidden}>
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

  welcome = () => {
    const {theme, initialLoading} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header(true)}
        <View style={[styles.main, styles.nameEditor]}>
          <Text style={styles.actionText}>
            Welcome! Let's add your first project.
          </Text>
        </View>
        {this.footer(theme, initialLoading)}
      </View>
    );
  };

  title = () => {
    const {theme, title} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header()}
        <View style={[styles.main, styles.nameEditor]}>
          <Text style={styles.actionText}>What are you looking for?</Text>
          <Form style={styles.nameForm}>
            <Item stackedLabel>
              <Input
                placeholder="Website Developer for an NGO"
                style={styles.input}
                value={title}
                onChangeText={text => this.setState({title: text})}
              />
            </Item>
          </Form>
        </View>
        {this.footer(theme, false, false, !title)}
      </View>
    );
  };

  domainSelector = () => {
    const {theme, allDomains, domains} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header()}
        <View style={[styles.main, styles.nameEditor]}>
          <Text style={styles.actionText}>
            Select the domain of your project.
          </Text>
          <View style={styles.chipsPacket}>
            {allDomains.map(domain => (
              <Button
                key={domain._id}
                style={[
                  styles.chip,
                  domain.selected ? styles.chipSelected : null,
                ]}
                onPress={() => this.selectDomain(domain._id)}>
                <Text
                  style={[
                    styles.chipText,
                    domain.selected ? styles.chipTextSelected : null,
                  ]}>
                  {domain.name}
                </Text>
              </Button>
            ))}
          </View>
        </View>
        {this.footer(theme, false, false, domains.length === 0)}
      </View>
    );
  };

  description = () => {
    const {theme, description} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header()}
        <View style={[styles.main, styles.nameEditor]}>
          <Text style={styles.actionText}>Let's add a short description</Text>
          <Form style={styles.nameForm}>
            <Item stackedLabel>
              <Textarea
                style={styles.input}
                value={description}
                numberOfLines={5}
                placeholder="Looking for a developer for a kick-ass idea..."
                onChangeText={text => this.setState({description: text})}
              />
            </Item>
          </Form>
        </View>
        {this.footer(theme, false, false, !description)}
      </View>
    );
  };

  // link = () => {
  //   const {theme, link} = this.state;
  //   return (
  //     <View style={[styles.slide]}>
  //       {this.header()}
  //       <View style={[styles.main, styles.nameEditor]}>
  //         <Text style={styles.actionText}>
  //           Let's add a link to your portfolio
  //         </Text>
  //         <Form style={styles.nameForm}>
  //           <Item stackedLabel>
  //             <Input
  //               placeholder="Behance/Github/Personal website"
  //               style={styles.input}
  //               value={link}
  //               onChangeText={text => this.setState({link: text})}
  //             />
  //           </Item>
  //         </Form>
  //       </View>
  //       {this.footer(theme, false, false, !link)}
  //     </View>
  //   );
  // };

  done = () => {
    const {theme, submitting} = this.state;
    return (
      <View style={[styles.slide]}>
        {this.header()}
        <View style={[styles.main, styles.jcc]}>
          <View style={styles.roleButtons}>
            <Button
              rounded
              iconLeft
              style={[styles.googleButton]}
              disabled={submitting}
              onPress={this.submit}>
              {submitting ? (
                <Spinner size="small" color={theme.primary} />
              ) : (
                <Text style={[styles.roleButtonText, theme.color]}>
                  Let's go!
                </Text>
              )}
            </Button>
          </View>
        </View>
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
        scrollEnabled={false}
        style={{backgroundColor: theme.primary}}>
        {this.welcome()}
        {this.title()}
        {this.domainSelector()}
        {this.description()}
        {this.done()}
      </ScrollView>
    );
  }
}

export default Wrapper(RecruiterSetupScreen);
