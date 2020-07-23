import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  FormGroup,
} from "reactstrap";
import axios from "axios";

class Employee extends Component {
  state = {
    employees: [],
    newEmployeeModal: false,
  };

  componentWillMount() {
    axios.get("/employees").then((response) => {
      console.log(response);
      this.setState({
        employees: response.data,
      });
    });
  }

  toggleNewEmployeeModal() {
    this.setState({
      newEmployeeModal: !this.state.newEmployeeModal,
    });
  }

  addEmployee() {
    axios.post("/employees").then((response) => {
      console.log("Add Employee initiated");
    });
  }

  deleteEmployee(id) {
    axios.delete("/employees/" + id).then((response) => {
      this._refreshEmployees();
    });
  }

  _refreshEmployees() {
    axios.get("/employees").then((response) => {
      this.setState({
        employees: response.data,
      });
    });
  }

  render() {
    let employees = this.state.employees.map((employee) => {
      return (
        <tr>
          <td>{employee.empId}</td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.emailId}</td>
          <td>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteEmployee.bind(this, employee.empId)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App Container">
        <h1 className="m-3">Employee Tracker</h1>
        <Button
          color="primary"
          className="my-5 mx-3"
          onClick={this.toggleNewEmployeeModal.bind(this)}
        >
          Add Employee
        </Button>
        <Modal
          isOpen={this.state.newEmployeeModal}
          toggle={this.toggleNewEmployeeModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewEmployeeModal.bind(this)}>
            Add Employee
          </ModalHeader>
          <ModalBody>
            <FormGroup></FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.toggleNewEmployeeModal.bind(this)}
            >
              Add Employee
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewEmployeeModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table className="mx-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{employees}</tbody>
        </Table>
      </div>
    );
  }
}

export default Employee;
