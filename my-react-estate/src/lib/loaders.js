import apiRequest from "./apiReq";
import { defer } from 'react-router-dom';


export const singlePageLoader = async ({ req, params }) => {
  console.log('params', params)
  const res = await apiRequest("/posts/"+params.id);
  return res.data;
}
export const listPageLoader = async ({ req, params }) => {
  console.log('request', req)
  const query = req.url.split("?")[1];
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise
  })
}

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  })
}