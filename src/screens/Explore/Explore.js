import React from 'react';
import { View, Image } from 'react-native';
import { Text, Container, Button, DeckSwiper, Card, CardItem, Left, Body, Thumbnail, Icon } from 'native-base';
import styles from './ExploreStyles';
import Axios from 'axios';

const cards = [
    {
        image: 'https://lorempixel.com/400/400/people/1',
        text: 'Test this',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/2',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/3',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/4',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/5',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/6',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/7',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
    {
        image: 'https://lorempixel.com/400/400/people/8',
        text: 'Test this too',
        name: 'Lorem Ipsum',
    },
];
export default class ExploreScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    viewProfile = () => {
        this.props.navigation.navigate('MyProfile');
    }

    viewDMs = () => {
        this.props.navigation.navigate('ChatList');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topPanel}>
                    <Button rounded
                        style={styles.profileBtn}
                        onPress={() => this.viewProfile()}
                    >
                        <Icon name="person" style={styles.profileIcon} />
                    </Button>
                    <Icon name="mail" style={styles.dmBtn} onPress={this.viewDMs} />
                </View>

                <View style={styles.deckContainer}>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={styles.card}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: item.image }} />
                                        <Body>
                                            <Text>{item.text}</Text>
                                            <Text note>NativeBase</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 200, flex: 1 }} source={{ uri: item.image }} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            </View >
        )
    }
}