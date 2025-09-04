package com.example.wipro.lalitha.Service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.wipro.lalitha.entites.User;
import com.example.wipro.lalitha.enums.Role;

public interface UserService  extends UserDetailsService
{
	User register(String email, String password, Role role);
    User updateUser(Long id, String email, String password, Role role);
    void deleteUser(Long id);
    User getUser(Long id);
    List<User> getAllUsers();
}
