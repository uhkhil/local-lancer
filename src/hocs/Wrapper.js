import React, {Component, createContext} from 'react';
import {AppRole} from '../enums/AppRole';
import {FreelancerTheme, RecruiterTheme} from '../theme/Theme';

const UserContext = createContext({});
const ThemeContext = createContext({
  primary: 'lightpink',
});

const greenish = '#44d0af';

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
        themeContext: {
          primary: greenish,
          otherPrimary: greenish,
          background: {
            backgroundColor: greenish,
          },
          color: {
            color: greenish,
          },
          setTheme: this.setTheme,
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
      console.log('TCL: WrapperClass -> mode', mode);
      this.setState({userContext: {...this.state.userContext, userMode: mode}});
    };

    setUserFields = fields => {
      console.log('TCL: WrapperClass -> fields', fields);
      this.setState(
        {
          userContext: {
            ...this.state.userContext,
            user: {...this.state.userContext.user, ...fields},
          },
        },
        () => console.log(this.state),
      );
    };

    clearUserFields = () => {
      this.setState({userContext: {...this.state.userContext, user: {}}});
    };

    setTheme = mode => {
      switch (mode) {
        case AppRole.freelancer:
          this.setState({
            themeContext: {...this.state.themeContext, ...FreelancerTheme},
          });
          break;
        case AppRole.recruiter:
          this.setState({
            themeContext: {...this.state.themeContext, ...RecruiterTheme},
          });
          break;
      }
    };

    render() {
      return (
        <UserContext.Provider value={this.state.userContext}>
          <ThemeContext.Provider value={this.state.themeContext}>
            <App />
          </ThemeContext.Provider>
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
          {userContext => (
            <ThemeContext.Consumer>
              {themeContext => (
                <Screen
                  {...this.props}
                  theme={themeContext}
                  userContext={userContext}
                />
              )}
            </ThemeContext.Consumer>
          )}
        </UserContext.Consumer>
      );
    }
  }
  return WrapperClass;
};
