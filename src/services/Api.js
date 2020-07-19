import Axios from 'axios';
import {firebase} from '@react-native-firebase/auth';
const baseUrl = 'https://local-lancer-server.herokuapp.com';

// Add necessary headers like Auth
Axios.interceptors.request.use(
  async config => {
    const currentUser = firebase.auth().currentUser;
    const bearerToken = `Bearer ${await currentUser.getIdToken()}`;
    config.headers = {
      ...config.headers,
      Authorization: bearerToken,
    };
    console.log('config', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// TODO: Handle 403 responses

/**
 *
 * @param {UserObj} data
 * Create a user record in the DB if it does not exist
 */
const signedUp = data => Axios.post(`${baseUrl}/users`, data);

/**
 * Fetch user record from the DB and associated recruiter/freelancer profiles if any
 */
const getUserInfo = () => Axios.get(`${baseUrl}/users`);

const getDomains = () => Axios.get(`${baseUrl}/domains`);
const updateUser = data => Axios.patch(`${baseUrl}/users`, data);
const createFreelancerProfile = data =>
  Axios.post(`${baseUrl}/freelancers`, data);
const getFreelancerProfile = () => Axios.get(`${baseUrl}/freelancers`);
const updateFreelancerProfile = data =>
  Axios.patch(`${baseUrl}/freelancers`, data);
const createRecruiterProfile = data =>
  Axios.post(`${baseUrl}/recruiters`, data);
const getRecruiterProfile = () => Axios.get(`${baseUrl}/recruiters`);
const updateRecruiterProfile = data =>
  Axios.patch(`${baseUrl}/recruiters`, data);
const createProject = data => Axios.post(`${baseUrl}/projects`, data);
const editProject = data => Axios.patch(`${baseUrl}/projects`, data);
const getProjects = () => Axios.get(`${baseUrl}/projects`);
const exploreProjects = coords =>
  Axios.post(`${baseUrl}/exploreProjects`, {
    longitude: coords.longitude,
    latitude: coords.latitude,
  });
const swipeProject = (projectId, response) =>
  Axios.post(`${baseUrl}/swipeProject`, {
    body: {
      projectId,
      response,
    },
  });
const exploreFreelancers = coords =>
  Axios.post(`${baseUrl}/exploreFreelancers`, {
    longitude: coords.longitude,
    latitude: coords.latitude,
  });
const swipeFreelancer = (projectId, freelancerId, response) => {
  return Axios.post(`${baseUrl}/swipeFreelancer`, {
    body: {
      projectId,
      freelancerId,
      response,
    },
  });
};
const onMessageAdd = (channelId, messageObj) =>
  Axios.post(`${baseUrl}/onMessageAdd`, {channelId, messageObj});
const onEnterChat = channelId =>
  Axios.get(`${baseUrl}/onEnterChat`, {params: {channelId}});
const getUserCard = role =>
  Axios.get(`${baseUrl}/getUserCard`, {params: {role}});

export const Api = {
  signedUp,
  getUserInfo,
  getDomains,
  updateUser,
  createFreelancerProfile,
  getFreelancerProfile,
  updateFreelancerProfile,
  createRecruiterProfile,
  getRecruiterProfile,
  updateRecruiterProfile,
  createProject,
  editProject,
  getProjects,
  exploreProjects,
  swipeProject,
  exploreFreelancers,
  swipeFreelancer,
  onMessageAdd,
  onEnterChat,
  getUserCard,
};
