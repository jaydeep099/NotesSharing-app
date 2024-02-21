package com.note.dto;

import com.note.entity.Category;
import com.note.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PostDto {

    private Integer postId;
    private  String title;
    private String pdfLink;
    private Date addedDate;
    private CatergoryDto category;
    private UserDto user;

}
