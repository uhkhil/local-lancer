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
        console.log('TCL: signIn -> result', result);
        firebaseId = result.user.uid;
        // TODO: Use the token
        const token = await result.user.getIdToken();
    }
    await postAuth(firebaseId, context);
    console.log('TCL: data', data);
    return true;
  } catch (err) {
    console.log('TCL: signIn -> err', err);
    return false;
  }
};

const signOut = () => {};

const storeUserInfo = (context, data) => {
  console.log('TCL: storeUserInfo -> context, data', context, data);
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
  console.log('TCL: postAuth -> firebaseId, context', firebaseId, context);
  try {
    console.log('TCL: firebaseId', firebaseId);
    const res = await Api.getUserInfo(firebaseId);
    const userInfo = res.data.data[0];
    console.log('TCL: postAuth -> res', res);
    storeUserInfo(context, userInfo);
  } catch (err) {
    console.warn(err);
  }
};

const checkNavigationFlow = async (context, navigation) => {
  navigation.navigate('Home');
};

export const Auth = {
  signIn,
  signOut,
  postAuth,
  checkNavigationFlow,
};
