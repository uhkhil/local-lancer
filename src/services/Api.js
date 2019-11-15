import Axios from 'axios';

const baseUrl = 'https://local-lancer.herokuapp.com/api';

const signedUp = data => Axios.post(`${baseUrl}/signedUp`, data);
const getUserInfo = userId =>
  Axios.get(`${baseUrl}/getUserInfo?userId=${userId}`);
const createFreelancerProfile = (userId, data) =>
  Axios.post(`${baseUrl}/createFreelancerProfile?userId=${userId}`, data);
const getFreelancerProfile = userId =>
  Axios.get(`${baseUrl}/getFreelancerProfile?userId=${userId}`);
const createRecruiterProfile = (userId, data) =>
  Axios.post(`${baseUrl}/createRecruiterProfile?userId=${userId}`, data);
const createProject = data => Axios.post(`${baseUrl}/createProject`, data);
const getProjects = userId =>
  Axios.get(`${baseUrl}/getProjects?userId=${userId}`);
const exploreProjects = userId =>
  Axios.get(`${baseUrl}/exploreProjects?userId=${userId}`);
const swipeProject = (userId, projectId, response) =>
  Axios.get(`${baseUrl}/swipeProject`, {
    params: {
      userId,
      projectId,
      response,
    },
  });
const exploreFreelancers = userId =>
  Axios.get(`${baseUrl}/exploreFreelancers?userId=${userId}`);
const swipeFreelancer = (userId, projectId, freelancerId, response) => {
  console.log(
    'TCL: userId, projectId, freelancerId, response',
    userId,
    projectId,
    freelancerId,
    response,
  );
  return Axios.get(`${baseUrl}/swipeFreelancer`, {
    params: {
      userId,
      projectId,
      freelancerId,
      response,
    },
  });
};
const onMessageAdd = (channelId, messageObj) =>
  Axios.post(`${baseUrl}/onMessageAdd`, {channelId, messageObj});
const onEnterChat = (channelId, userId) =>
  Axios.get(`${baseUrl}/onEnterChat`, {params: {channelId, userId}});

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
};
