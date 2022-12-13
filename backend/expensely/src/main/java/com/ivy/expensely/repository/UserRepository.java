package com.ivy.expensely.repository;

import com.ivy.expensely.model.Expense;
import com.ivy.expensely.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    public Optional<User> findByEmail(String email);
}
