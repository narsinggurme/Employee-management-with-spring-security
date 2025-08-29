package com.ng.Employee.controller;

import com.ng.Employee.entity.Employee;
import com.ng.Employee.exception.ResourceNotFound;
import com.ng.Employee.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController
{

	@Autowired
	private EmployeeRepository employeeRepository;

	
	@GetMapping("/")
	public String login()
	{
		return "Authenticate Successfully";
	}
	@PostMapping("/empl")
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee)
	{
		Employee saveEmployee = employeeRepository.save(employee);
		return new ResponseEntity<>(saveEmployee, HttpStatus.CREATED);
	}

	@GetMapping("/employees")
	public List<Employee> gelAllEmployee()
	{
		return employeeRepository.findAll();
	}

	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id)
	{
		Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Employee not found with Id: " + id));
		return ResponseEntity.ok(employee);
	}

	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployeebyId(@PathVariable Integer id, @RequestBody Employee employeeDetails)
	{
		Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Employee not found with Id: " + id));
		employee.setName(employeeDetails.getName());
		employee.setEmail(employeeDetails.getEmail());
		employee.setPhone(employeeDetails.getPhone());
		employee.setDept(employeeDetails.getDept());

		Employee updateEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updateEmployee);
	}

	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable Integer id)
	{
		Optional<Employee> optionalEmployee = employeeRepository.findById(id);

		if (optionalEmployee.isPresent())
		{
			Employee employee = optionalEmployee.get();
			employeeRepository.deleteById(id);
			return ResponseEntity.ok(employee);
		}
		else
		{
			return ResponseEntity.notFound().build();
		}
	}

}
