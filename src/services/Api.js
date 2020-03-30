import Axios from 'axios';
import {firebase} from '@react-native-firebase/auth';
const baseUrl = 'https://0628719c.ngrok.io/api/v0';

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

const signedUp = data => Axios.post(`${baseUrl}/users`, data);
const getUserInfo = () => Axios.get(`${baseUrl}/users`);
const updateUser = data => Axios.patch(`${baseUrl}/users`, data);
const createFreelancerProfile = data =>
  Axios.post(`${baseUrl}/freelancerProfiles`, data);
const getFreelancerProfile = () => Axios.get(`${baseUrl}/freelancerProfiles`);
const updateFreelancerProfile = data =>
  Axios.patch(`${baseUrl}/freelancerProfiles`, data);
const createRecruiterProfile = data =>
  Axios.post(`${baseUrl}/recruiterProfiles`, data);
const getRecruiterProfile = () => Axios.get(`${baseUrl}/recruiterProfiles`);
const updateRecruiterProfile = data =>
  Axios.patch(`${baseUrl}/recruiterProfiles`, data);
const createProject = data => Axios.post(`${baseUrl}/projects`, data);
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
  updateUser,
  createFreelancerProfile,
  getFreelancerProfile,
  updateFreelancerProfile,
  createRecruiterProfile,
  getRecruiterProfile,
  updateRecruiterProfile,
  createProject,
  getProjects,
  exploreProjects,
  swipeProject,
  exploreFreelancers,
  swipeFreelancer,
  onMessageAdd,
  onEnterChat,
  getUserCard,
};
