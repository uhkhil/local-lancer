import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Thumbnail,
  Button,
  View,
} from 'native-base';
import {Wrapper} from '../../hocs/Wrapper';
import {styles} from './FreelancerCardStyles';

const name = person => person.firstName + ' ' + person.lastName;

class FreelancerCardComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          margin: 40,
          marginTop: 80,
          alignSelf: 'center',
        }}>
        <Card style={styles.card}>
          {/* <CardItem style={styles.cardItemTop} header>
            <H1 onPress={this.toggleExpansion} style={styles.title}>
              {this.props.data.title}
            </H1>
          </CardItem> */}
          <CardItem>
            {this.props.data.domains.map(domain => (
              <Button rounded info small>
                <Text>{domain.name}</Text>
              </Button>
            ))}
          </CardItem>
          <CardItem style={styles.cardItemBottom}>
            <Left>
              <Thumbnail source={{uri: this.state.image}} />
              <Body>
                <Text>{name(this.props.data.user)}</Text>
                <Text note>{this.props.data.user.proximity}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={styles.cardItemBottom} footer bordered>
            <Left>
              <Button
                transparent
                onPress={this.props.giveResponse.bind(
                  null,
                  this.props.data.projectId,
                  true,
                  this.props.data.userId,
                )}>
                <Text>Accept</Text>
              </Button>
              <Button
                transparent
                onPress={this.props.giveResponse.bind(
                  null,
                  this.props.data.projectId,
                  false,
                  this.props.data.userId,
                )}>
                <Text>Reject</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export const FreelancerCard = Wrapper(FreelancerCardComponent);
