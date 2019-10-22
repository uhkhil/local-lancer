import {Api} from './Api';

const signUp = data => {};

const signIn = data => {
  console.log('TCL: data', data);
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
 * @param {string} context - The user context which will be used to store the user's information
 * @return {void} Returns nothing
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

export const Auth = {
  signIn,
  signOut,
  postAuth,
};
