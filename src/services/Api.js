import Axios from 'axios';

const baseUrl = 'https://local-lancer.herokuapp.com/api';

const signedUpWithEmail = data =>
  Axios.post(`${baseUrl}/signedUpWithEmail`, data);
const getUserInfo = firebaseId =>
  Axios.get(`${baseUrl}/getUserInfo?firebaseId=${firebaseId}`);
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

export const Api = {
  signedUpWithEmail,
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
};
