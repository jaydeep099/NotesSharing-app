import { myAxios } from "./helper";

export const signup = (user) => {
  return myAxios
    .post("/auth/register", user)
    .then((response) => response.data);
};
export const loginUser = (loginDetail) => {
  return myAxios
  .post("/auth/login", loginDetail)
  .then((response) => response.data);
}

