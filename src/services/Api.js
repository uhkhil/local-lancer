import Axios from 'axios';
import {firebase} from '@react-native-firebase/auth';
const baseUrl = 'https://local-lancer-server-staging.herokuapp.com/api/v0';

// Add necessary headers like Auth
Axios.interceptors.request.use(
  async config => {
    const currentUser = firebase.auth().currentUser;
    const bearerToken = `Bearer ${await currentUser.getIdToken()}`;
    config.headers = {
      ...config.headers,
      Authorization: bearerToken,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// TODO: Handle 403 responses

const signedUp = data => Axios.post(`${baseUrl}/users`, data);
const getUserInfo = () => Axios.get(`${baseUrl}/users`);
const createFreelancerProfile = data =>
  Axios.post(`${baseUrl}/freelancerProfiles`, data);
const getFreelancerProfile = () => Axios.get(`${baseUrl}/freelancerProfiles`);
const createRecruiterProfile = data =>
  Axios.post(`${baseUrl}/recruiterProfiles`, data);
const createProject = data => Axios.post(`${baseUrl}/projects`, data);
const getProjects = () => Axios.get(`${baseUrl}/projects`);
const exploreProjects = () => Axios.get(`${baseUrl}/exploreProjects`);
const swipeProject = (projectId, response) =>
  Axios.get(`${baseUrl}/swipeProject`, {
    params: {
      projectId,
      response,
    },
  });
const exploreFreelancers = () => Axios.get(`${baseUrl}/exploreFreelancers`);
const swipeFreelancer = (projectId, freelancerId, response) => {
  return Axios.get(`${baseUrl}/swipeFreelancer`, {
    params: {
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
  createFreelancerProfile,
  getFreelancerProfile,
  createRecruiterProfile,
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
