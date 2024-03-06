import { privateAxios } from "./helper";
import { myAxios } from "./helper";
export const createPost = (postData) => {
  //console.log(postData);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};

export const loadPost = (postId) => {
  return myAxios.get("/posts/" + postId).then((response) => response.data);
};

export const uploadPostImage = (pdf, postId) => {
  let formData = new FormData();
  formData.append("pdf", pdf);

  return privateAxios
    .post(`/post/pdf/upload/${postId}`, formData,{
      headers:{
        'Content-Type':'application/pdf'
      }
    })
    .then((response) => response.data);
};
