package com.demo.spring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.spring.handler.EmployeeHandler;
import com.demo.spring.model.Employee;

@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

	@Autowired
	private EmployeeHandler employeeHandler;

	@GetMapping(path = "/employees")
	public List<Employee> getAllEmployees() {
		return employeeHandler.getEmpList();

	}

	@PostMapping(path = "/employees")
	private Employee addEmployee(@RequestBody Employee employee) {
		return employeeHandler.addEmployee(employee);

	}

	@DeleteMapping(path = "/employees/{id}")
	private Map<String, Boolean> deleteEmployeeById(@PathVariable(value = "id") Long empId) throws Exception {
		return employeeHandler.deleteEmployee(empId);
	}

}
