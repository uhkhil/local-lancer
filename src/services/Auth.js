import {Api} from './Api';
import auth from '@react-native-firebase/auth';
import {AppRole} from '../enums/AppRole';

const signUp = async data => {
  const {email, password} = data;
  let credential;
  try {
    credential = await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.warn(error);
    return {
      status: false,
      message: error.toString(),
    };
  }
  const result = await Api.signedUp({email});
  return {
    status: true,
  };
};

const signIn = async (data, userContext) => {
  try {
    const {type} = data;
    let firebaseId;
    switch (type) {
      case 'email':
        const {email, password} = data;
        const result = await auth().signInWithEmailAndPassword(email, password);
        firebaseId = result.user.uid;
        // TODO: Use the token
        const token = await result.user.getIdToken();
    }
    await postAuth(firebaseId, userContext);
    return true;
  } catch (err) {
    return false;
  }
};

const signOut = async userContext => {
  try {
    userContext.clearUserFields();
    await auth().signOut();
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
 * @param {string} firebaseId - The firebase uid for the user
 * @param {object} userContext - The user userContext which will be used to store the user's information
 * @return {void} Returns promise of nothing
 */
const postAuth = async (firebaseId, userContext) => {
  try {
    const res = await Api.getUserInfo(firebaseId);
    const userInfo = res.data.data[0];
    storeUserInfo(userContext, userInfo);
  } catch (err) {
    console.warn(err);
  }
};

const checkNavigationFlow = async (userContext, navigation, themeContext) => {
  const user = userContext.user;
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
    navigation.navigate('ProfileSetup');
  }
};

export const Auth = {
  signUp,
  signIn,
  signOut,
  postAuth,
  checkNavigationFlow,
};
