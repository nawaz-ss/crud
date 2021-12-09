import { Component } from "react";
import ReactTooltip from "react-tooltip";

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let name = fields["name"]

        //Name
        if (!name) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof name !== "undefined") {
            if (name.length > 1) {
                let wordsArray = name.split(" ")
                console.log(name)
                console.log(wordsArray)
                wordsArray.map(word => {
                    if (!word.match(/^[a-zA-Z]+$/)) {
                        console.log(word)
                        formIsValid = false;
                        errors["name"] = "Only letters";
                    }
                })
            }
            else {
                if (!name.match(/^[a-zA-Z]+$/)) {
                    formIsValid = false;
                    errors["name"] = "Only letters";
                }
            }

        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");
            let spaceIndex = fields["email"].indexOf(" ")
            //console.log(spaceIndex)

            if (spaceIndex !== -1) {
                formIsValid = false
                errors["email"] = "Email cannot contain spaces"
            }

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["email"].indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Phone
        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "Please enter your phone number.";
        }

        if (typeof fields["phone"] !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(fields["phone"])) {
                formIsValid = false;
                errors["phone"] = "Please enter only number.";
            } else if (fields["phone"].length !== 10) {
                formIsValid = false;
                errors["phone"] = "Please enter valid phone number.";
            }
        }

        this.setState({ errors });
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            console.log("Form submitted");
        } else {
            console.log("Form has errors.");
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    render() {
        return (
            <div>
                <form
                    name="contactform"
                    className="contactform"
                    onSubmit={this.contactSubmit.bind(this)}
                >
                    <div className="col-md-6">
                        <fieldset>
                            <input
                                ref="name"
                                type="text"
                                size="30"
                                placeholder="Name"
                                onChange={this.handleChange.bind(this, "name")}
                                value={this.state.fields["name"]}
                            />
                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                            <br />
                            <input
                                refs="email"
                                type="text"
                                size="30"
                                placeholder="Email"
                                onChange={this.handleChange.bind(this, "email")}
                                value={this.state.fields["email"]}
                            />
                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            <br />
                            <input
                                refs="phone"
                                type="text"
                                size="30"
                                placeholder="Phone"
                                onChange={this.handleChange.bind(this, "phone")}
                                value={this.state.fields["phone"]}
                            />
                            <span style={{ color: "red" }}>{this.state.errors["phone"]}</span>
                            <br />
                            <input
                                refs="address"
                                type="text"
                                size="30"
                                placeholder="Address"
                                onChange={this.handleChange.bind(this, "address")}
                                value={this.state.fields["address"]}
                            />
                            <br />
                            <Button data-tip data-for="registerTip" type="submit">
                                Register
                            </Button>

                            <ReactTooltip id="registerTip" place="top" effect="solid" type="warning">
                                Tooltip for the register Button
                            </ReactTooltip>
                        </fieldset>
                    </div>
                </form>
            </div>
        );
    }
}

export default Test