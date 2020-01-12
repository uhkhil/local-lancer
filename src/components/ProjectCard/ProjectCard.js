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
import {styles} from './ProjectCardStyles';

const name = person => person.firstName + ' ' + person.lastName;

class ProjectCardComponent extends React.Component {
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
    const {viewDetails} = this.props;
    console.log('tapped');
    viewDetails();
  };

  render() {
    const {theme} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.cardContainer}
        onPress={this.tapped}>
        <Card style={styles.card}>
          <CardItem style={styles.cardItemTop} header>
            <H1
              numberOfLines={2}
              onPress={this.toggleExpansion}
              style={[styles.title, theme.color]}>
              {this.props.data.title}
            </H1>
          </CardItem>
          {this.renderDomains(this.props.data.domains)}
          <CardItem style={styles.cardItemBottom}>
            <Left>
              <Thumbnail source={{uri: this.props.data.owner.image}} />
              <Body>
                <Text numberOfLines={1}>{name(this.props.data.owner)}</Text>
                <Text note>{this.props.data.owner.proximity}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={styles.cardItemBottom}>
            <Text style={styles.description} numberOfLines={3}>
              {this.props.data.description}
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export const ProjectCard = Wrapper(ProjectCardComponent);
