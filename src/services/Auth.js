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

const signUp = async (email, password) => {
  debugger;
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

// const signInWithEmail = async (email, password, userContext) => {
//   try {
//     if (!email || !password) {
//       throw new Error('Credentials cannot be empty');
//     }
//     const credentials = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);

//     return credentials;
//   } catch (error) {
//     console.warn(error);
//     return null;
//   }
// };

/**
 *
 * @param {object} userContext - The user userContext which will be used to store the user's information
 * Signin/singup a user with Google, create an account in the DB if new user
 */
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
    return result;
  } catch (error) {
    return null;
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
    const userInfo = res.data.data;
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
    navigation.navigate('FreelancerSetup', {newProfile: true});
  }
};

export const Auth = {
  initSocialAuth,
  signUp,
  signIn,
  signOut,
  postAuth,
  checkNavigationFlow,
};
