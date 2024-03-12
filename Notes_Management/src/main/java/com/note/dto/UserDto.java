package com.note.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class UserDto {

    private Integer id;

    @NotEmpty
    @Size(min =  4 , message = "Username must be min of 4 character")
    private String name;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email address is not valid !!")
    private String email;

    @NotEmpty
    @Size(min = 4 , max = 15, message = "password must be min of 4 character and Max 15 character")
    private String password;

    @NotEmpty
    @Size(min = 10, message = "About should of 10 Character Minimum")
    private String about;

    private Set<RoleDto> roles = new HashSet<>();

    @JsonIgnore
    public String getPassword(){
        return this.password;
    }

    @JsonProperty
    public void setPassword(String password){
        this.password = password;
    }
}
