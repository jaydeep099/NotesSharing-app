package com.note.controller;

import com.note.dto.ApiResponse;
import com.note.dto.CatergoryDto;
import com.note.dto.PostDto;
import com.note.entity.Post;
import com.note.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class PostController {

    @Autowired
    private PostService postService;
    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto, @PathVariable Integer userId, @PathVariable Integer categoryId){
        PostDto createPost = this.postService.createPost(postDto,userId,categoryId);
        return new ResponseEntity<PostDto>(createPost, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<PostDto>> getPostsByUser(@PathVariable Integer userId){
       List<PostDto> posts= this.postService.getPostByUser(userId);
       return new ResponseEntity<List<PostDto>>(posts,HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}/posts")
    public ResponseEntity<List<PostDto>> getPostsByCategory(@PathVariable Integer categoryId){
        List<PostDto> posts= this.postService.getPostByCategory(categoryId);
        return new ResponseEntity<List<PostDto>>(posts,HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<PostDto>> getAllPost(@RequestParam(value = "pageNumber" , defaultValue = "1" , required = false) Integer pageNumber , @RequestParam(value = "pageSize" , defaultValue = "5" , required = false) Integer pageSize){
        List<PostDto> allPost = this.postService.getAllPost(pageNumber, pageSize);
        return new ResponseEntity<List<PostDto>>(allPost,HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId){
        PostDto postDto= this.postService.getPostById(postId);
        return new ResponseEntity<PostDto>(postDto,HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}")
    public ApiResponse deletePost(@PathVariable Integer postId){
        this.postService.deletePost(postId);
        return new ApiResponse("Post is successfully deleted" ,true);
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<PostDto> UpdatePost(@RequestBody PostDto postDto,@PathVariable Integer postId){
       PostDto updatePost =  this.postService.UpdatePost(postDto,postId);
        return new ResponseEntity<PostDto>(updatePost, HttpStatus.OK);
    }


}
