import {Api} from './Api';
import auth from '@react-native-firebase/auth';
import {AppRole} from '../enums/AppRole';
import {GoogleSignin} from '@react-native-community/google-signin';
import {firebase} from '@react-native-firebase/auth';

const initSocialAuth = () => {
  GoogleSignin.configure({
    webClientId:
      '729838792209-luvcaphtdoh165u21u14ucibl11peh3m.apps.googleusercontent.com',
  });
};

const signIn = async userContext => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    const result = await firebase.auth().signInWithCredential(credential);
    if (result.additionalUserInfo.isNewUser) {
      await Api.signedUp(result.additionalUserInfo.profile);
    }
    await postAuth(result.user.uid, userContext);
    return true;
  } catch (error) {
    return false;
  }
};

const signOut = async userContext => {
  try {
    userContext.clearUserFields();
    await auth().signOut();
    await GoogleSignin.signOut();
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

const storeUserInfo = (userContext, data) => {
  userContext.setUserFields(data);
};

/**
 * Fetches user information from the database and stores it in the userContext.
 *
 * @param {string} uid - The firebase uid for the user
 * @param {object} userContext - The user userContext which will be used to store the user's information
 * @return {void} Returns promise of nothing
 */
const postAuth = async (uid, userContext) => {
  try {
    const res = await Api.getUserInfo(uid);
    console.log('postAuth -> res', res);
    const userInfo = res.data.data[0];
    storeUserInfo(userContext, userInfo);
  } catch (err) {
    console.warn(err);
  }
};

const checkNavigationFlow = async (userContext, navigation, themeContext) => {
  const user = userContext.user;
  console.log('checkNavigationFlow -> user', user);
  if (user.freelancerProfile) {
    userContext.setUserMode(AppRole.freelancer);
    themeContext.setTheme(AppRole.freelancer);
    navigation.navigate('Home');
  } else if (user.recruiterProfile) {
    userContext.setUserMode(AppRole.recruiter);
    themeContext.setTheme(AppRole.recruiter);
    navigation.navigate('Home');
  } else {
    console.log('profile setup page');
    navigation.navigate('ProfileSetup', {newProfile: true});
  }
};

export const Auth = {
  initSocialAuth,
  // signUp,
  signIn,
  signOut,
  postAuth,
  checkNavigationFlow,
};
