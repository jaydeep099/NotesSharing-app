import { privateAxios } from "./helper";
import { myAxios } from "./helper";
export const createPost = (postData) => {
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

export const uploadPostPdf = (pdf, postId) => {
  let formData = new FormData();
  formData.append("pdf", pdf);

  return privateAxios
    .post(`/post/pdf/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "application/pdf",
      },
    })
    .then((response) => response.data);
};

export const loadPostCategoryWise = (categoryId) => {
  return privateAxios
    .get(`/category/${categoryId}/posts`)
    .then((response) => response.data);
};

export const loadPostUserWise = (userId) => {
  return privateAxios
    .get(`/user/${userId}/posts`)
    .then((response) => response.data);
};

export const deletePostService = (postId) => {
  return privateAxios
    .delete(`/posts/${postId}`)
    .then((response) => response.data);
};

export const updatePost = (post , postId) => {
  return privateAxios.put(`/posts/${postId}`,post).then(response => response.data)
}