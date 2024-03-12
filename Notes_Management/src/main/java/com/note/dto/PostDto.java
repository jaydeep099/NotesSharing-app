package com.note.dto;

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
