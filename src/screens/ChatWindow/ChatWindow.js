import React from 'react';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import {Wrapper} from '../../hocs/Wrapper';
import {Colors} from '../../theme/Theme';
import {FIRESTORE} from '../../constants';

class ChatWindowScreen extends React.Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);
    this.user = this.props.userContext.user;
  }

  componentDidMount() {
    this.channelId = this.props.navigation.state.params.channelId;
    this.channelRef = firestore()
      .collection(FIRESTORE.COLLECTIONS.CHANNELS)
      .doc(this.channelId);
    this.fetchMessages();
  }

  fetchMessages = async () => {
    const messagesRef = firestore()
      .collection(FIRESTORE.COLLECTIONS.MESSAGES)
      .where('channel', '==', this.channelRef)
      .orderBy('createdOn', 'desc');
    messagesRef.onSnapshot(snap => {
      const messages = [];
      snap.forEach(doc => {
        const data = doc.data();
        const messageObj = {
          _id: doc.id,
          ...data,
          user: {
            _id: data.from ? data.from : 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          system: !data.from,
        };
        messages.push(messageObj);
      });
      this.setState({messages});
    });
  };

  onSend(messages = []) {
    this.addMessage(messages[messages.length - 1]);
  }

  addMessage = async message => {
    console.log('TCL: ChatWindowScreen -> message', message);
    const messageObj = {
      channel: this.channelRef,
      text: message.text,
      type: 'TEXT',
      createdOn: new Date(),
      from: this.user._id,
    };
    console.log('TCL: ChatWindowScreen -> messageObj', messageObj);
    const result = await firestore()
      .collection(FIRESTORE.COLLECTIONS.MESSAGES)
      .add(messageObj);
    console.log('TCL: ChatWindowScreen -> result', result);
  };

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
          _id: this.user._id,
        }}
      />
    );
  }
}

export default Wrapper(ChatWindowScreen);
