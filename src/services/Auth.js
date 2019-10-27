import {Api} from './Api';
import auth from '@react-native-firebase/auth';

const signUp = data => {};

const signIn = async (data, context) => {
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
    await postAuth(firebaseId, context);
    return true;
  } catch (err) {
    return false;
  }
};

const signOut = () => {};

const storeUserInfo = (context, data) => {
  context.setUserFields(data);
};

/**
 * Fetches user information from the database and stores it in the context.
 *
 * @param {string} firebaseId - The firebase uid for the user
 * @param {object} context - The user context which will be used to store the user's information
 * @return {void} Returns promise of nothing
 */
const postAuth = async (firebaseId, context) => {
  try {
    const res = await Api.getUserInfo(firebaseId);
    const userInfo = res.data.data[0];
    storeUserInfo(context, userInfo);
  } catch (err) {
    console.warn(err);
  }
};

const checkNavigationFlow = async (context, navigation) => {
  const user = context.user;
  if (user.freelancerProfile) {
    navigation.navigate('Home');
    return;
  } else if (user.recruiterProfile) {
    // TODO: Handle this flow for recruiters
    navigation.navigate('Home');
    return;
  } else {
    navigation.navigate('ProfileSetup');
    return;
  }
};

export const Auth = {
  signIn,
  signOut,
  postAuth,
  checkNavigationFlow,
};
