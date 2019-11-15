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
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import {Wrapper} from '../../hocs/Wrapper';
import styles from './ChatListStyles';
import {FIRESTORE} from '../../constants';
import {AppRole} from '../../enums/AppRole';

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
    console.log('TCL: ChatListScreen -> fetchChats -> userMode', userMode);
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
            profilePic: 'https://lorempixel.com/400/400/people/1',
            unreadCount: self.unreadCount,
          };
          chats.push(channelObj);
        });
        console.log('TCL: ChatListScreen -> fetchChats -> chats', chats);
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
    return (
      <List>{this.state.chats.map(chat => this.renderListItem(chat))}</List>
    );
  };

  renderListItem = chat => {
    return (
      <ListItem onPress={() => this.openChatWindow(chat)} thumbnail>
        <Left>
          <Thumbnail source={{uri: chat.profilePic}} />
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
      <ScrollView>
        <Text style={[styles.header, this.props.theme.color]}>Messages</Text>
        {this.renderList(this.state.chats)}
      </ScrollView>
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

export default Wrapper(ChatListScreen);
