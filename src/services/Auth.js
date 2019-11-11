import {Api} from './Api';
import auth from '@react-native-firebase/auth';

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

const signOut = () => {};

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
    console.log('TCL: postAuth -> userInfo', userInfo);
    storeUserInfo(userContext, userInfo);
  } catch (err) {
    console.warn(err);
  }
};

const checkNavigationFlow = async (userContext, navigation) => {
  const user = userContext.user;
  if (user.freelancerProfile) {
    userContext.setUserMode(0);
    navigation.navigate('Home');
    return;
  } else if (user.recruiterProfile) {
    // TODO: Handle this flow for recruiters
    userContext.setUserMode(1);
    navigation.navigate('Home');
    return;
  } else {
    console.log('profile setup page');
    navigation.navigate('ProfileSetup');
    return;
  }
};

export const Auth = {
  signUp,
  signIn,
  signOut,
  postAuth,
  checkNavigationFlow,
};
