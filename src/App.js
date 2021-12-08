import { Component } from 'react';
// import Test from './components/FormValidation/FormValidation';
import axios, { AxiosResponse, AxiosError } from "axios";
import Apis from './APIS/API';
import './App.css';
const url = 'https://61b095283c954f001722a4a6.mockapi.io/users/'

class App extends Component {

  Apis = new Apis()
  state = {
    avatar: 'https://cdn.fakercloud.com/avatars/dvdwinden_128.jpg',
    name: '',
    contactNo: '',
    users: [],
    currentUser: [],
    message: ''
  }
  componentDidMount() {
    this.getData()
  }

  getData() {
    this.Apis.getUser().then(
      (res: AxiosResponse) => {
        var data = res.data
        console.log(data)
        this.setState({
          users: data,
          message : 'get data'
        });
      }
    ).catch(
      (err: AxiosError) => {
        console.log(err)
      }
    )
  }

  addData(newUser) {
    axios.post(url, newUser)
      .then(function (response) {
        console.log(response);
        this.setState({message :'user Added'})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteData(user) {
    this.Apis.deleteUser(user.id).then(
      (res: AxiosResponse) => {
        console.log('User deleted Successfully')
        this.setState({message :'user Deleted'})
      }
    ).catch(
      (err: AxiosError) => {
        console.log(err)
      }
    )
  }

  updateData(user) {
    this.Apis.updateUser(user).then(
      (res: AxiosResponse) => {
        console.log('Updated Successfully')
        this.setState({message :'user Updated'})
      }
    ).catch(
      (err: AxiosError) => {
        console.log(err)
      }
    )
  }

  onChangeEvent = (e, type) => {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  onAddClick = () => {
    const {name, avatar, contactNo} = this.state
    const newUser = {name,avatar, contactNo}
    this.addData(newUser)
  }

  render() {
    return (
      <>
        <div>
          <h1>Add User</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Name"
            value={this.state.name}
            onChange={e => this.onChangeEvent(e, 'name')}
          />
          <br />
          <label htmlFor="mobile">Contact</label>
          <input
            id="mobile"
            type="number"
            placeholder="Enter Number"
            value={this.state.contactNo}
            onChange={e => this.onChangeEvent(e, 'contactNo')}
          />
          <br />
          <button onClick={this.onAddClick}>Add</button>
          <h1>Users List</h1>
          {this.state.users.map((el, id) => {
            return (
              <ul key={id}>
                <li>{`Name : ${el.name}`}</li>
                <li>{`Contact No  : ${el.contactNo}`}</li>
                <li>{`id : ${el.id}`}</li>
                <li><button onClick={(e) => this.deleteData(el)}>Delete</button></li>
              </ul>
            )
          })}
        </div>

      </>

    )
  }
}

export default App;
