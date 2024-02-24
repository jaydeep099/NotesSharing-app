package com.note.dto;

import com.note.entity.Role;
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

    @Email(message = "Email address is not valid !!")
    private String email;

    @NotEmpty
    @Size(min = 4 , max = 15)
    private String password;

    @NotEmpty
    private String about;

    private Set<RoleDto> roles = new HashSet<>();
}
