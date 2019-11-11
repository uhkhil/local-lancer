import React from 'react';
import {
  GiftedChat,
  Message,
  Bubble,
  InputToolbar,
} from 'react-native-gifted-chat';
import {Text} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {Colors} from '../../theme/Theme';
import {FIRESTORE} from '../../constants';

export default class ChatWindowScreen extends React.Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);
    console.log('TCL: ChatWindowScreen -> constructor -> props', props);
  }

  componentDidMount() {
    console.log(
      'TCL: ChatWindowScreen -> componentDidMount -> this.props.navigation.state.params',
      this.props.navigation.state.params,
    );
    this.channelId = this.props.navigation.state.params.channelId;
    this.fetchMessages();
  }

  fetchMessages = async () => {
    console.log(
      'TCL: ChatWindowScreen -> fetchMessages -> this.channelId',
      this.channelId,
    );
    const messagesRef = firestore()
      .collection(FIRESTORE.COLLECTIONS.MESSAGES)
      .where(
        'channelId',
        '==',
        firestore()
          .collection(FIRESTORE.COLLECTIONS.CHANNELS)
          .doc(this.channelId),
      );
    messagesRef.onSnapshot(snap => {
      const messages = [];
      snap.forEach(doc => {
        const messageObj = {
          _id: doc.id,
          ...doc.data(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        };
        messages.push(messageObj);
      });
      console.log(
        'TCL: ChatWindowScreen -> fetchMessages -> messages',
        messages,
      );
      this.setState({messages});
    });
  };

  //   componentWillMount() {
  //     this.setState({
  //       messages: [
  //         {
  //           _id: 1,
  //           text: 'Hello developer',
  //           createdAt: new Date(),
  //           user: {
  //             _id: 2,
  //             name: 'React Native',
  //             avatar: 'https://placeimg.com/140/140/any',
  //           },
  //         },
  //       ],
  //     });
  //   }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{right: {backgroundColor: Colors.primaryColor}}}
      />
    );
  }

  renderInputToolbar(props) {
    return <InputToolbar {...props} />;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderBubble={this.renderBubble}
        renderInputToolbar={this.renderInputToolbar}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
