package com.revature.daos;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDAO extends JpaRepository<User,Integer> {

    public List<User> findByUserUserId(int userId);
    public Optional<User> FindByUserId(int userId);
}
