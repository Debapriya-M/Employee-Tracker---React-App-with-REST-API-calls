import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

class Employee extends Component {
  state = {
    employees: [],
    newEmpData: {
      firstName: "",
      lastName: "",
      emailId: "",
    },
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
    axios.post("/employees", this.state.newEmpData).then((response) => {
      let { employees } = this.state;
      employees.push(response.data);
      this.setState({
        employees,
        newEmployeeModal: false,
        newEmpData: {
          firstName: "",
          lastName: "",
          emailId: "",
        },
      });
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
            <FormGroup>
              <Label for="firstName">Enter first name of Employee</Label>
              <Input
                id="firstName"
                value={this.state.newEmpData.firstName}
                onChange={(e) => {
                  let { newEmpData } = this.state;
                  newEmpData.firstName = e.target.value;
                  this.setState({ newEmpData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Enter last name of Employee</Label>
              <Input
                id="lastName"
                value={this.state.newEmpData.lastName}
                onChange={(e) => {
                  let { newEmpData } = this.state;
                  newEmpData.lastName = e.target.value;
                  this.setState({ newEmpData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailId">Enter email ID of Employee</Label>
              <Input
                id="emailId"
                value={this.state.newEmpData.emailId}
                onChange={(e) => {
                  let { newEmpData } = this.state;
                  newEmpData.emailId = e.target.value;
                  this.setState({ newEmpData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addEmployee.bind(this)}>
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
