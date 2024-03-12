package com.note.controller;

import com.note.config.AppConstants;
import com.note.dto.ApiResponse;
import com.note.dto.PostDto;
import com.note.dto.PostResponse;
import com.note.services.FileService;
import com.note.services.PostService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostService postService;

   @Autowired
   private FileService fileService;

   @Value("${project.pdf}")
   private String path;
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
    public ResponseEntity<PostResponse> getAllPost(@RequestParam(value = "pageNumber" , defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber ,
                                                   @RequestParam(value = "pageSize" , defaultValue =AppConstants.PAGE_SIZE , required = false) Integer pageSize ,
                                                   @RequestParam(value = "sortBy",defaultValue = AppConstants.SORT_BY ,required = false) String sortBy,
                                                   @RequestParam(value = "sortDir",defaultValue = AppConstants.SORT_DIR ,required = false) String sortDir){
        PostResponse postResponse = this.postService.getAllPost(pageNumber, pageSize,sortBy,sortDir);
        return new ResponseEntity<PostResponse>(postResponse,HttpStatus.OK);
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

    @GetMapping("/posts/search/{keywords}")
    public  ResponseEntity<List<PostDto>>  searchPostByTitle(@PathVariable("keywords") String keywords){
    List<PostDto> result = this.postService.searchPosts(keywords);
    return  new ResponseEntity<List<PostDto>>(result,HttpStatus.OK);
    }

    @PostMapping("/post/pdf/upload/{postId}")
    public ResponseEntity<PostDto>  uploadPdf(
            @RequestParam("pdf") MultipartFile pdf,
            @PathVariable Integer postId
            ) throws IOException
    {
        PostDto postDto = this.postService.getPostById(postId);
        String fileName =  this.fileService.uploadpdf(path,pdf);
        postDto.setPdfLink(fileName);
        PostDto updatePost = this.postService.UpdatePost(postDto,postId);
        return  new ResponseEntity<PostDto>(updatePost,HttpStatus.OK);
    }
    @GetMapping(value = "/post/pdf/{pdfName}" , produces = MediaType.APPLICATION_PDF_VALUE)
    public void downloadPdf(@PathVariable("pdfName") String pdfName,
                            HttpServletResponse response) throws IOException {
        InputStream resource = this.fileService.getResources(path,pdfName);
        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());

    }

}
