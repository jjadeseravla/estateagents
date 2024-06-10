import apiRequest from "./apiReq"

export const singlePageLoader = async ({ req, params }) => {
  console.log('params', params)
  const res = await apiRequest("/posts/"+params.id);
  return res.data;
}