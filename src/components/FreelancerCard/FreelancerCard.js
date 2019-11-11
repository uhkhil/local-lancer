import React, {useState} from 'react';
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
import {Animated, Dimensions} from 'react-native';
import {Wrapper} from '../../hocs/Wrapper';
import {styles} from './FreelancerCardStyles';

const width = Dimensions.get('window').width;
const name = person => person.firstName + ' ' + person.lastName;

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(200)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: width,
      duration: 200,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        width: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

class FreelancerCardComponent extends React.Component {
  state = {
    image: 'https://lorempixel.com/400/400/people/5',
    title: 'Web designer needed for a Wordpress website!',
    name: 'Akhil Kumar',
    proximity: '2 km away',
    height: 'auto',
    width: new Animated.Value(300),
  };

  toggleExpansion = () => {
    // Animated.timing(this.state.width, {
    //   toValue: width,
    //   duration: 200,
    // }).start();
  };

  render() {
    return (
      <Animated.View
        style={{
          width: this.state.width,
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
      </Animated.View>
    );
  }
}

export const FreelancerCard = Wrapper(FreelancerCardComponent);
