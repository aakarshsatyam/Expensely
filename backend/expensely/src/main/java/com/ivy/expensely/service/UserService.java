package com.ivy.expensely.service;

import com.ivy.expensely.model.User;
import com.ivy.expensely.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public int addUser(User user){
        Optional<User> userDetail= userRepository.findByEmail(user.getEmail());
        if( userDetail.isEmpty()){
             userRepository.save(user);
             return 1;
        }else {
            return 0;
        }
    }
    public long verifyUser(User user) {
        Optional<User> userDetail = userRepository.findByEmail(user.getEmail());
        if (userDetail.isPresent()) {
            long id=userDetail.get().getId();
            String pass=userDetail.get().getPassword();
            if(pass.compareTo(user.getPassword())==0){
                return id;
            }
            else{
                return 0;
            }
        }
        else {
            return 2;
        }
    }

    public Optional<User> findUserById(long param_id) {
        return userRepository.findById(param_id);
    }
}
