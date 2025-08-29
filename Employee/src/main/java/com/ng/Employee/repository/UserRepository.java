package com.ng.Employee.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ng.Employee.entity.MyUser;

@Repository
public interface UserRepository extends JpaRepository<MyUser, Integer>
{
	Optional<MyUser> findByusername(String username);
}