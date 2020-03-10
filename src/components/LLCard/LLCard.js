import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  H1,
  Button,
} from 'native-base';
import {TouchableOpacity} from 'react-native';

import {Wrapper} from '../../hocs/Wrapper';
import {styles} from './LLCardStyles';
import {AppRole} from '../../enums/AppRole';

const name = person => person.firstName + ' ' + person.lastName;

class CardComponent extends React.Component {
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

  tapped = () => {
    const {viewDetails, short} = this.props;
    if (short) {
      viewDetails();
    }
  };

  render() {
    const {theme, short} = this.props;
    const {data, role} = this.props;
    let user;
    if (role === AppRole.recruiter) {
      user = data.owner;
    } else {
      user = data.user;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.cardContainer, {margin: short ? 30 : 20}]}
        onPress={this.tapped}>
        <Card style={styles.card}>
          <CardItem style={styles.cardItemTop} header>
            {role === AppRole.recruiter ? (
              <H1
                numberOfLines={short ? 2 : null}
                onPress={this.toggleExpansion}
                style={[styles.title, theme.color]}>
                {this.props.data.title}
              </H1>
            ) : null}
          </CardItem>
          {this.renderDomains(this.props.data.domains)}
          <CardItem style={styles.cardItemBottom}>
            <Left>
              <Thumbnail source={{uri: user.image}} />
              <Body>
                <Text numberOfLines={1}>{name(user)}</Text>
                <Text note>{user.proximity}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={styles.cardItemBottom}>
            <Text style={styles.description} numberOfLines={short ? 3 : null}>
              {this.props.data.description}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export const LLCard = Wrapper(CardComponent);
