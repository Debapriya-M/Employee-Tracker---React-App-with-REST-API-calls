package com.demo.spring.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.spring.model.Employee;
import com.demo.spring.repository.EmployeeRepository;

@Component
public class EmployeeHandler {

	@Autowired
	private EmployeeRepository employeeRepository;

	public List<Employee> getEmpList() {
		List<Employee> response = employeeRepository.findAll();
		if (response == null) {
			response = new ArrayList<>();
		}
		return response;
	}

	public Employee addEmployee(Employee employee) {

		return employeeRepository.save(employee);
	}

	public Map<String, Boolean> deleteEmployee(Long empId) throws Exception {
		Employee employee = employeeRepository.findById(empId)
				.orElseThrow(() -> new Exception("Employee not found for this particular ID ::" + empId));
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted", Boolean.TRUE);
		return response;
	}

}
