package com.note.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private Integer id;

    @NotEmpty
    @Size(min =  4 , message = "Username must be min of 4 character")
    private String name;

    @Email(message = "Email address is not valid !!")
    private String email;

    @NotEmpty
    @Size(min = 4 , max = 15)
    private String password;

    @NotEmpty
    private String about ;
}
