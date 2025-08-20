package tn.schult.BackendSchult.services;


import tn.schult.BackendSchult.entities.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();

    User getUserById(Integer id);

    User createUser(User user);

    User updateUser(Integer id, User user);

    void deleteUser(Integer id);
}
