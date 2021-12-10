import { Component } from 'react';
import axios, { AxiosResponse, AxiosError } from "axios";
import { Modal, Form, Button } from 'react-bootstrap';
//components
import UserModal from './components/FormValidation/Modal';
import Apis from './APIS/API';
//styling
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'https://61b095283c954f001722a4a6.mockapi.io/users/'

class App extends Component {

  Apis = new Apis()
  state = {
    avatar: 'https://espotz-dev-assets.s3.ap-south-1.amazonaws.com/images/1f34bc30-5333-11ec-b397-3ddde82f00ca',
    name: '',
    contactNo: '',
    email: '',
    users: [],
    role: '',
    currentUser: [],
    message: '',
    openModal: false,
    errors: {}
  }

  componentDidMount() {
    this.getData()
  }

  onReset = () => {
    this.setState({
      name: '',
      email: '',
      contactNo: '',
      role: '',
      errors: {}
    })
  }

  getData = () => {
    console.log('get data called')
    this.Apis.getUser().then(
      (res: AxiosResponse) => {
        var data = res.data
        this.setState({users: data})
        this.onReset()
      }
    ).catch(
      (err: AxiosError) => {
        console.log(err)
      }
    )
  }

  addData = (newUser) => {
    console.log('add data called')
    axios.post(url, newUser)
      .then(
        (res: AxiosResponse) => {
          console.log('Added  Successfully')
          this.getData()
        }
      ).catch(
        (err: AxiosError) => {
          console.log(err)
        }
      )
  }

  deleteData = (user) => {
    console.log('delete data called')
    this.Apis.deleteUser(user.id).then(
      (res: AxiosResponse) => {
        console.log('User deleted Successfully')
        this.getData()
      }
    ).catch(
      (err: AxiosError) => {
        console.log(err)
      }
    )
  }

  updateData = async (e, user) => {
    e.preventDefault()
    console.log('update data called')
    await axios.put(`https://61b095283c954f001722a4a6.mockapi.io/users/${user.id}`, user);
    this.getData()
  }

  onChangeEvent = (e, type) => {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  updateRole = (e) => {
    console.log(e.target.value)
    e.preventDefault()
    this.setState({ role: e.target.value })
  }

  onAddClick = () => {
    const { name, avatar, contactNo, email, role } = this.state
    const newUser = { name, avatar, contactNo, email, role }
    if (this.handleValidation()) {
      this.addData(newUser)
    }

  }

  toggleModalStatus = () => {
    this.setState({ openModal: !this.state.openModal })
  }

  passUserDetails = (user) => {
    //console.log(user)
    this.setState({ currentUser: user })
    this.toggleModalStatus()
  }

  handleValidation = () => {
    let { name, email, contactNo, role } = this.state;
    let errors = {};
    let formIsValid = true;
    //Name
    if (!name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }else if (!name.trim().match(/^[a-zA-Z]+$/)) {
      formIsValid = false;
      errors["name"] = "Only letters";
    }

    //Email
    if (!email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf("@");
      let lastDotPos = email.lastIndexOf(".");
      let spaceIndex = email.indexOf(" ")
      //console.log(spaceIndex)

      if (spaceIndex !== -1) {
        formIsValid = false
        errors["email"] = "Email cannot contain spaces"
      }

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //Phone
    if (!contactNo) {
      formIsValid = false;
      errors["phone"] = "Please enter your phone number.";
    }

    if (typeof contactNo !== "undefined") {

      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(contactNo)) {
        formIsValid = false;
        errors["phone"] = "Please enter only number.";
      } else if (contactNo.length !== 10) {
        formIsValid = false;
        errors["phone"] = "Please enter valid phone number.";
      }
    }
    //Role
    if (!role) {
      formIsValid = false;
      errors["role"] = "Please select your role";
    }

    this.setState({ errors });
    return formIsValid;
  }

  render() {
    const { openModal, currentUser, errors } = this.state
    return (
      <>
        <div className='users-coontainer'>
          <h1>Add User</h1>
          <form>
            <div className='row'>
              <div className='input-container col-12 col-md-6'>
                <label htmlFor="name" className='input-label'>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  className='user-input'
                  value={this.state.name}
                  onChange={e => this.onChangeEvent(e, 'name')}
                />
                <p className="error-text">{errors.name}</p>
              </div>
              <div className='input-container col-12 col-md-6'>
                <label htmlFor="mobile" className='input-label'>Contact</label>
                <input
                  id="mobile"
                  type="number"
                  className='user-input'
                  placeholder="Enter Number"
                  value={this.state.contactNo}
                  onChange={e => this.onChangeEvent(e, 'contactNo')}
                />
                <p className="error-text">{errors.phone}</p>
              </div>
              <div className='input-container col-12 col-md-6'>
                <label htmlFor="email" className='input-label'>Email</label>
                <input
                  id="email"
                  type="text"
                  className='user-input'
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={e => this.onChangeEvent(e, 'email')}
                />
                <p className="error-text">{errors.email}</p>
              </div>
              <div className='input-container col-12 col-md-6'>
                <label htmlFor="role" className='input-label'>Role</label>
                <Form.Select id="role" aria-label="Default select example" onChange={this.updateRole} value={this.state.role}>
                  <option>Select Your Role</option>
                  <option value="React Developer">React Developer</option>
                  <option value="Flutter Developer">Flutter Developer</option>
                  <option value="Test Engineer">Test Engineer</option>
                  <option value="Human Resource">Human Resource</option>
                </Form.Select>
                <p className="error-text">{errors.role}</p>
              </div>
            </div>
            <Button onClick={this.onAddClick} className='me-2'>Add</Button>
            <Button onClick={this.onReset} variant='outline-primary'>Reset</Button>
          </form>

          <h1 className='my-2'>Users List</h1>
          {this.state.users.map((el, id) => {
            return (
              <div className="row  mt-2" key={el.id}>
                <p className="col-4">{el.name}</p>
                <p className="col-4">{el.contactNo}</p>
                <div className="col-4">
                  <Button variant="light mx-2" onClick={(e) => this.passUserDetails(el)}>View</Button>
                  <Button variant="danger" onClick={(e) => this.deleteData(el)}>Delete</Button>
                </div>
              </div>
            )
          })}
        </div>
        <Modal show={openModal} centered size='sm'>
          <Modal.Body>
            <UserModal
              currentUser={currentUser}
              toggleModalStatus={this.toggleModalStatus}
              updateData={this.updateData}
            />
          </Modal.Body>
        </Modal>
      </>

    )
  }
}

export default App;
