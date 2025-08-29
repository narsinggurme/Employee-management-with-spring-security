package com.ng.Employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ng.Employee.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>
{

}
