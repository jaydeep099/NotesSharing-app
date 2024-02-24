package com.note.services;

import com.note.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto registerNewUser(UserDto userDto);
    UserDto createUser(UserDto user);
    UserDto UpdateUser(UserDto user , Integer userId);
    UserDto getUserById(Integer userId);
    List<UserDto> getAllUser();
    void deleteUser(Integer userid);

}
