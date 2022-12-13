package com.ivy.expensely.controller;

import com.ivy.expensely.model.User;
import com.ivy.expensely.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("/user")
    public String addUser(@RequestBody User user){
         int val=userService.addUser(user);
         if (val==1){
              return "Sign Up Successfull";
         }else {
              return "User Exists";
         }
    }

    @CrossOrigin
    @PostMapping("/verify")
    public Long verifyUser(@RequestBody User user){
        long logedinUser = userService.verifyUser(user);
            if(logedinUser!=0 && logedinUser!=2){
                return logedinUser;
            } else if(logedinUser==0){
                return Long.valueOf(0);
            } else {
                return Long.valueOf(2);
            }
    }

    @CrossOrigin
    @GetMapping("/viewer/{param_id}")
    public Optional<User> findUser(@PathVariable long param_id) {
        return userService.findUserById(param_id);
    }
}
