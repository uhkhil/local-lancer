import React from 'react';
import {Text, CardItem, View, Button, Icon} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';

import {Wrapper} from '../../hocs/Wrapper';
import {Colors} from '../../theme/Theme';
import {LLCard} from '../../components/LLCard/LLCard';
import {AppRole} from '../../enums/AppRole';

class CardDetailsScreen extends React.Component {
  renderDomains = domains => {
    let extra = 0;
    if (domains.length - 2 > 0) {
      extra = domains.length - 2;
    }
    const {theme} = this.props;
    return (
      <CardItem style={styles.domainContainer}>
        {domains.slice(0, 2).map(domain => (
          <Button rounded info small style={[styles.domain, theme.background]}>
            <Text style={styles.domainText}>{domain.name}</Text>
          </Button>
        ))}
        {extra ? (
          <Button rounded info small style={styles.domainMore}>
            <Text>+{extra} More</Text>
          </Button>
        ) : null}
      </CardItem>
    );
  };

  giveResponse = response => {
    const {data, role, giveResponse} = this.props.navigation.state.params;
    let freelancerId = null;
    let projectId = data._id;
    if (role === AppRole.freelancer) {
      freelancerId = data.userId;
      projectId = data.projectId;
    }
    giveResponse(projectId, response, freelancerId);
    this.props.navigation.pop();
  };

  render() {
    const {theme} = this.props;
    const {data, role} = this.props.navigation.state.params;
    return (
      <ScrollView style={theme.background}>
        <LLCard data={data} short={false} role={role} />
        <View style={styles.actionContainer}>
          <Button
            rounded
            icon
            success
            style={styles.button}
            onPress={this.giveResponse.bind(null, true)}>
            <Icon name="check-bold" type="MaterialCommunityIcons" />
          </Button>
          <Button
            rounded
            icon
            danger
            style={styles.button}
            onPress={this.giveResponse.bind(null, false)}>
            <Icon name="cross" type="Entypo" />
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default Wrapper(CardDetailsScreen);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  card: {
    borderRadius: 10,
  },
  cardItemTop: {borderTopLeftRadius: 10, borderTopRightRadius: 10},
  cardItemBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  title: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  domainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  domain: {
    margin: 5,
    height: 25,
  },
  domainMore: {
    margin: 5,
  },
  domainText: {
    textTransform: 'capitalize',
  },
  description: {
    color: 'gray',
  },
  actionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    padding: 40,
    paddingTop: 20,
  },
  button: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
