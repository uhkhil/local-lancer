import Axios from "axios";

const baseUrl = 'https://local-lancer.herokuapp.com/api';

const signedUpWithEmail = (data) => Axios
    .post(`${baseUrl}/signedUpWithEmail`, data)
const getUserInfo = (firebaseId) => Axios
    .get(`${baseUrl}/getUserInfo?firebaseId=${firebaseId}`);
const createFreelancerProfile = (userId, data) => Axios
    .post(`${baseUrl}/createFreelancerProfile?userId=${userId}`, data);
const getFreelancerProfile = (userId) => Axios
    .get(`${baseUrl}/getFreelancerProfile?userId=${userId}`);
const createRecruiterProfile = (userId, data) => Axios
    .post(`${baseUrl}/createRecruiterProfile?userId=${userId}`, data);
const createProject = (data) => Axios
    .post(`${baseUrl}/createProject`, data)
const getProjects = (userId) => Axios
    .get(`${baseUrl}/getProjects?userId=${userId}`);

export const Api = {
    signedUpWithEmail,
    getUserInfo,
    createFreelancerProfile,
    getFreelancerProfile,
    createRecruiterProfile,
    createProject,
    getProjects
}