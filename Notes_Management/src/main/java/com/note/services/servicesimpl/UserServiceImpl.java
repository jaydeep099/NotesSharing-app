package com.note.services.servicesimpl;

import com.note.dto.UserDto;
import com.note.entity.User;
import com.note.exceptions.ResourceNotFoundException;
import com.note.repository.UserRepo;
import com.note.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = this.dtoToUser(userDto);
        User savedUser = this.userRepo.save(user);
        return this.userToDto(savedUser);
    }

    @Override
    public UserDto UpdateUser(UserDto userDto, Integer userId) {
        User user1 = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","id",userId));
        user1.setName(userDto.getName());
        user1.setEmail(userDto.getEmail());
        user1.setPassword(userDto.getPassword());
        user1.setAbout(userDto.getAbout());

        User updateUser = this.userRepo.save(user1);
        UserDto userDto1 = this.userToDto(updateUser);
        return userDto1;
    }

    @Override
    public UserDto getUserById(Integer userId) {
        User user1 = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","id",userId));

        return this.userToDto(user1);
    }

    @Override
    public List<UserDto> getAllUser() {
        List<User> user = this.userRepo.findAll();
       List<UserDto> userDtos =  user.stream().map(user1->this.userToDto(user1)).collect(Collectors.toList());
        return userDtos;
    }

    @Override
    public void deleteUser(Integer userId) {
        User user1 = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","id",userId));
        this.userRepo.delete(user1);
    }

    public User dtoToUser(UserDto userDto){
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());
        return user;
    }

    public UserDto userToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setAbout((user.getAbout()));
        return userDto;
    }
}
