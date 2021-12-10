import { Component } from "react";
import { Button } from 'react-bootstrap'

class UserModal extends Component {
    state = {
        enableEdit: false,
        userName: this.props.currentUser.name,
        userEmail: this.props.currentUser.email,
        userContact: this.props.currentUser.contactNo,
        userRole: this.props.currentUser.role,
        errors : {}
    }

    updateEditStatus = () => {
        this.setState({ enableEdit: !this.state.enableEdit })
    }

    handleClose = () => {
        this.props.toggleModalStatus()
    }

    updateUserData = (e, type) => {
        e.preventDefault()
        this.setState({
            [type] : e.target.value
        })
    }

    onSaveChanges = (e) => {
        e.preventDefault()
        const {userName,userEmail, userContact, userRole} = this.state
        const {id} = this.props.currentUser
        const updatedData = {
            name : userName,
            email : userEmail,
            contactNo : userContact,
            role : userRole,
            id 
        }
        if (this.handleValidation()){
            this.updateEditStatus()
            this.props.toggleModalStatus()
            console.log(updatedData)
            this.props.updateData(e, updatedData)
        }
    }

    handleValidation = () => {
        let { userName, userEmail, userContact, userRole } = this.state;
        let errors = {};
        let formIsValid = true;
        //Name
        if (!userName) {
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }else if (userName.length<3){
          formIsValid= false;
          errors["name"] = "Min 3 characters required";
        }
        
        //Email
        if (!userEmail) {
          formIsValid = false;
          errors["email"] = "Cannot be empty";
        }
    
        if (typeof userEmail !== "undefined") {
          let lastAtPos = userEmail.lastIndexOf("@");
          let lastDotPos = userEmail.lastIndexOf(".");
          let spaceIndex = userEmail.indexOf(" ")
          //console.log(spaceIndex)
    
          if (spaceIndex !== -1) {
            formIsValid = false
            errors["email"] = "Email cannot contain spaces"
          }
    
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              userEmail.indexOf("@@") === -1 &&
              lastDotPos > 2 &&
              userEmail.length - lastDotPos > 2
            )
          ) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
          }
        }
    
        //Phone
        if (!userContact) {
          formIsValid = false;
          errors["phone"] = "Please enter your phone number.";
        }
    
        if (typeof userContact !== "undefined") {
    
          var pattern = new RegExp(/^[0-9\b]+$/);
          if (!pattern.test(userContact)) {
            formIsValid = false;
            errors["phone"] = "Please enter only number.";
          } else if (userContact.length !== 10 && userContact.length !== 11 ) {
            formIsValid = false;
            errors["phone"] = "Please enter valid phone number.";
          }
        }
        //Role
        if (!userRole) {
          formIsValid = false;
          errors["role"] = "Please select your role";
        }
    
        this.setState({ errors });
        return formIsValid;
      }

    render() {
        const { enableEdit, userName, userEmail, userContact, userRole, errors } = this.state
        return (
            <div className="d-flex flex-column" style={{ alignItems: 'center' }}>
                <img src={this.props.currentUser.avatar} alt='' className="avatar" />
                <form className="d-flex flex-column">
                    <input
                        value={userName}
                        disabled={!enableEdit}
                        className="my-1"
                        onChange={(e) => this.updateUserData(e, 'userName')}
                    />
                    <p className="error-text">{errors.name}</p>
                    <input
                        value={userEmail}
                        disabled={!enableEdit}
                        className="my-1"
                        onChange={(e) => this.updateUserData(e, 'userEmail')}
                    />
                    <p className="error-text">{errors.email}</p>
                    <input
                        value={userContact}
                        disabled={!enableEdit}
                        className="my-1"
                        onChange={(e) => this.updateUserData(e, 'userContact')}
                    />
                    <p className="error-text">{errors.phone}</p>
                    <input
                        value={userRole}
                        disabled={!enableEdit}
                        className="my-1"
                        onChange={(e) => this.updateUserData(e, 'userRole')}
                    />
                    <p className="error-text">{errors.role}</p>
                    <div className="d-flex my-2 mx-auto">
                        <Button variant="secondary me-2" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary me-2" style={{ display: enableEdit ? 'block' : 'none' }} onClick={this.onSaveChanges}>
                            Save Changes
                        </Button>
                        <Button variant="info" style={{ display: (!enableEdit) ? 'block' : 'none' }} onClick={this.updateEditStatus}>
                            Edit
                        </Button>
                    </div>
                </form>
            </div>
        )

    }
}

export default UserModal