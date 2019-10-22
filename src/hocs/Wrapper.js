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
        },
      };
    }

    setUserFields = fields => {
      console.log('TCL: WrapperClass -> fields', fields);
      this.setState({
        userContext: {
          ...this.state.userContext,
          user: {...this.state.userContext.user, ...fields},
        },
      });
    };

    clearUserFields = () => {
      this.setState({user: {}});
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
            return <Screen {...this.props} context={userContext} />;
          }}
        </UserContext.Consumer>
      );
    }
  }
  return WrapperClass;
};
