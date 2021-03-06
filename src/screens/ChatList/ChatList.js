import React from 'react';
import {ScrollView} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Badge,
  View,
  Container,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import {Wrapper} from '../../hocs/Wrapper';
import styles from './ChatListStyles';
import {FIRESTORE} from '../../constants';
import {AppRole} from '../../enums/AppRole';
import {NoData} from '../../components/NoData/NoData';

// TODO: Remove moment
const convertTime = time =>
  moment
    .utc(new firestore.Timestamp(time.seconds, time.nanoseconds).toDate())
    .local()
    .calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: 'LT',
      nextDay: '[Tomorrow at] LT',
      lastWeek: 'DD MMM YYYY',
      sameElse: 'DD MMM YYYY',
    });

class ChatListScreen extends React.Component {
  state = {
    chats: [],
  };

  constructor(props) {
    super(props);
    this.fetchChats();
  }

  getChannelName = (projectName, person) => {
    const userMode = this.props.userContext.userMode;
    switch (userMode) {
      case AppRole.recruiter:
        return `${projectName} : ${person.firstName} ${person.lastName}`;
      case AppRole.freelancer:
        return `${person.firstName} ${person.lastName}`;
    }
  };

  fetchChats = () => {
    const user = this.props.userContext.user;
    const userMode = this.props.userContext.userMode;
    let channelsRef;
    switch (userMode) {
      case AppRole.freelancer:
        channelsRef = firestore()
          .collection(FIRESTORE.COLLECTIONS.CHANNELS)
          .where('freelancerId', '==', user._id)
          .orderBy('lastMessageOn', 'desc');
        break;
      case AppRole.recruiter:
        channelsRef = firestore()
          .collection(FIRESTORE.COLLECTIONS.CHANNELS)
          .where('recruiterId', '==', user._id)
          .orderBy('lastMessageOn', 'desc');
        break;
    }

    this.unsubscribe = channelsRef.onSnapshot(
      snap => {
        const docs = snap.docs;
        const chats = [];
        docs.forEach(doc => {
          const data = doc.data();
          const otherGuy = data.users.find(u => {
            return u._id !== user._id;
          });
          const self = data.users.find(u => u._id === user._id);
          const channelObj = {
            channelId: doc.id,
            ...data,
            lastMessageOn: convertTime(data.lastMessageOn),
            name: this.getChannelName(data.projectName, otherGuy),
            image: otherGuy.image,
            unreadCount: self.unreadCount,
          };
          chats.push(channelObj);
        });
        this.setState({
          chats,
        });
      },
      error => {
        console.warn(error);
      },
    );
  };

  openChatWindow = chat => {
    this.props.navigation.navigate('ChatWindow', chat);
  };

  renderList = () => {
    const {chats} = this.state;
    return chats.length ? (
      <List>{this.state.chats.map(chat => this.renderListItem(chat))}</List>
    ) : (
      <NoData style={styles.noData} icon="" text="No messages yet  :(" />
    );
  };

  renderListItem = chat => {
    return (
      <ListItem onPress={() => this.openChatWindow(chat)} thumbnail>
        <Left>
          <Thumbnail source={{uri: chat.image}} />
        </Left>
        <Body>
          <Text>{chat.name}</Text>
          <Text note numberOfLines={1}>
            {chat.lastMessage}
          </Text>
        </Body>
        <Right>
          <Text style={styles.time} note>
            {chat.lastMessageOn}
          </Text>
          {chat.unreadCount ? (
            <Badge style={[styles.badge, this.props.theme.background]} success>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </Badge>
          ) : null}
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <Text style={[styles.header, this.props.theme.color]}>Messages</Text>
        {this.renderList(this.state.chats)}
      </Container>
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default Wrapper(ChatListScreen);
