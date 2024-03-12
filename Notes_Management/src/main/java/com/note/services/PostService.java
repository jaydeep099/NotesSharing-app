package com.note.services;


import com.note.dto.PostDto;
import com.note.dto.PostResponse;

import java.util.List;

public interface PostService {
    PostDto createPost(PostDto postDto , Integer userId , Integer categoryId);
    PostDto UpdatePost(PostDto postDto , Integer postId);

    void deletePost(Integer postId);

    PostResponse getAllPost(Integer pageNumber , Integer pageSize, String sortBy,String sortDir);

    PostDto getPostById(Integer postId);

    List<PostDto> getPostByCategory (Integer categoryId);

    List<PostDto> getPostByUser(Integer userId);

    List<PostDto> searchPosts(String keyword);
}
