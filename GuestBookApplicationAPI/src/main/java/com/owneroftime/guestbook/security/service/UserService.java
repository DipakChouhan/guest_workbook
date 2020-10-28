package com.owneroftime.guestbook.security.service;

import com.owneroftime.guestbook.security.model.UserModel;

public interface UserService {
    Void createUser(UserModel userModel) throws Exception;
    UserModel getUserDetailsByEmail(String emailIO);
}
