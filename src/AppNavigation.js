import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AuthLoadingScreen from './screens/AuthLoading/AuthLoading';
import AuthScreen from './screens/Auth/Auth';
import SignupScreen from './screens/Signup/Signup';
import SigninScreen from './screens/Signin/Signin';
import ProfileSetupScreen from './screens/ProfileSetup/ProfileSetup';
import ChatListScreen from './screens/ChatList/ChatList';
import ChatWindowScreen from './screens/ChatWindow/ChatWindow';
import ProfileScreen from './screens/Profile/Profile';
import AboutScreen from './screens/About/About';
import PortfolioScreen from './screens/Portfolio/Portfolio';
import ProjectAddScreen from './screens/ProjectAdd/ProjectAdd';
import {ProfileEditScreen} from './screens/ProfileEdit/ProfileEdit';
import {ProjectListScreen} from './screens/ProjectList/ProjectList';
import {AppWrapper} from './hocs/Wrapper';
import HomeScreen from './screens/Home/Home';
import {Auth} from './services/Auth';

Auth.initSocialAuth();

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    MyProfile: ProfileScreen,
    ProfileEdit: ProfileEditScreen,
    MyPortfolio: PortfolioScreen,
    ChatList: ChatListScreen,
    ChatWindow: ChatWindowScreen,
    About: AboutScreen,
    ProjectAdd: ProjectAddScreen,
    ProfileSetup: ProfileSetupScreen,
    ProjectList: ProjectListScreen,
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Signup: SignupScreen,
    Signin: SigninScreen,
  },
  {
    headerMode: 'none',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppWrapper(AppContainer);
