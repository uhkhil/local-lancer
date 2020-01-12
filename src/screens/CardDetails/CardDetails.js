import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  H1,
  View,
  Button,
  Icon,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';

import {Wrapper} from '../../hocs/Wrapper';
import {Colors} from '../../theme/Theme';

const name = person => person.firstName + ' ' + person.lastName;

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
    const {data, giveResponse} = this.props.navigation.state.params;
    giveResponse(data._id, response, null);
    this.props.navigation.pop();
  };

  render() {
    const {theme} = this.props;
    const {data} = this.props.navigation.state.params;
    return (
      <ScrollView style={theme.background}>
        <View style={[styles.cardContainer]} onPress={this.tapped}>
          <Card style={styles.card}>
            <CardItem style={styles.cardItemTop} header>
              <H1 numberOfLines={2} style={[styles.title, theme.color]}>
                {data.title}
              </H1>
            </CardItem>
            {this.renderDomains(data.domains)}
            <CardItem style={styles.cardItemBottom}>
              <Left>
                <Thumbnail source={{uri: data.owner.image}} />
                <Body>
                  <Text numberOfLines={1}>{name(data.owner)}</Text>
                  <Text note>{data.owner.proximity}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItemBottom}>
              <Text style={styles.description}>{data.description}</Text>
            </CardItem>
          </Card>
        </View>
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
    margin: 20,
    marginTop: 20,
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
