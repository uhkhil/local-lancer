import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, Badge, Text} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import {Colors} from '../../theme/Theme';
import {Wrapper} from '../../hocs/Wrapper';
import {AppRole} from '../../enums/AppRole';
import {FIRESTORE} from '../../constants';

class MessagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUnreadCount();
  }

  state = {
    unreadCount: 0,
  };

  fetchUnreadCount = async () => {
    const userId = this.props.userContext.user._id;
    const mode = this.props.userContext.userMode;

    const userRef = await firestore()
      .collection(FIRESTORE.COLLECTIONS.USERS)
      .doc(userId);
    this.unsubscribe = userRef.onSnapshot(snap => {
      if (!snap.exists) {
        return;
      }
      const data = snap.data();
      switch (mode) {
        case AppRole.freelancer:
          if (data.unreadCountFreelancer) {
            this.setState({unreadCount: data.unreadCountFreelancer});
          } else {
            this.setState({unreadCount: 1});
          }
          break;
        case AppRole.recruiter:
          if (data.unreadCountRecruiter) {
            this.setState({unreadCount: data.unreadCountRecruiter});
          } else {
            this.setState({unreadCount: 2});
          }
          break;
      }
    });
  };

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const {unreadCount} = this.state;
    const {style, viewDMs} = this.props;

    return (
      <Button rounded transparent onPress={viewDMs} style={style}>
        <Icon
          type="MaterialIcons"
          style={styles.dmIcon}
          name="mail"
          onPress={this.viewDMs}
        />
        {unreadCount ? (
          <Badge primary style={styles.dmBadge}>
            <Text>{unreadCount}</Text>
          </Badge>
        ) : null}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  dmIcon: {fontSize: 35, color: Colors.white},
  dmBadge: {position: 'absolute', left: 40},
});

export default Wrapper(MessagesComponent);
