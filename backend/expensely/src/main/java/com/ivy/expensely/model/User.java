package com.ivy.expensely.model;

import java.util.Set;
import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name="user_table")
public class User {

    @Id
    @SequenceGenerator(initialValue=1000,allocationSize=1,name = "partner_sequence",sequenceName="partner_sequence")
    @GeneratedValue(generator="partner_sequence")
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    public User(Long id) {
        this.id = id;
    }

    public User(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public User() {
    }

}