import React, {Component} from 'react';
import {UserContext} from '../context/UserContext';

export const AppWrapper = App => {
  class WrapperClass extends Component {
    constructor() {
      super();
      this.state = {
        userContext: {
          user: {},
          setUserFields: this.setUserFields,
          clearUserFields: this.clearUserFields,
          userMode: 0,
          setUserMode: this.setUserMode,
        },
      };
    }

    /**
     * Fetches user information from the database and stores it in the userContext.
     *
     * @param {number} mode - Which mode to run the app in freelancer / recruiter. 0 | 1
     * @return {void} Return nothing
     */
    setUserMode = mode => {
      this.setState({userContext: {...this.state.userContext, userMode: mode}});
    };

    setUserFields = fields => {
      this.setState({
        userContext: {
          ...this.state.userContext,
          user: {...this.state.userContext.user, ...fields},
        },
      });
    };

    clearUserFields = () => {
      this.setState({userContext: {...this.state.userContext, user: {}}});
    };

    render() {
      return (
        <UserContext.Provider value={this.state.userContext}>
          <App />
        </UserContext.Provider>
      );
    }
  }
  return WrapperClass;
};

export const Wrapper = Screen => {
  class WrapperClass extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <UserContext.Consumer>
          {userContext => {
            return <Screen {...this.props} userContext={userContext} />;
          }}
        </UserContext.Consumer>
      );
    }
  }
  return WrapperClass;
};
