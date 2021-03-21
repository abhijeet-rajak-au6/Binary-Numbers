import React, { Component } from "react";
import Alert from "../errors/Alert";
import FormInput from "../FormInput/FormInput";
import { connect } from "react-redux";
import { userRegister } from "../../redux/actions/userAction";
import { removeAlert, setAlert } from "../../redux/actions/alertAction";
import { mapUserStateToProps } from "../../redux/mapStateToProps";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    account_no: "",
    role: "customer",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, auth, account_no } = event.target;
    const { userRegister, history, setAlert, removeAlert } = this.props;


    try {
      if (!auth.value) {
        setAlert("please select registration type", "error");
        setTimeout(() => {
          removeAlert();
        }, 3000);
        return;
        // this.setState({
        //   errors: {
        //     msg: "please select registration type ",
        //     messageType: "fail",
        //   },
        // });
        // return;
      }
      let payload;
      if (auth.value === "customer") {
        payload = {
          name: name.value,
          email: email.value,
          password: password.value,
          account_no: account_no.value,
          role: auth.value,
        };
      } else {
        payload = {
          name: name.value,
          email: email.value,
          password: password.value,
          role: auth.value,
        };
      }

      const message = await userRegister(payload);
      if (message.includes("user registered sucessfully")) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
      setAlert(err, "error");
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };
  render() {
    const { email, password, name, errors, account_no, role } = this.state;
    // const { message, messageType } = this.props.notifyData;
    const { alert } = this.props;
    return (
      <div className="login d-flex flex-row justify-content-center">
        <div className="card w-50">
          <div className="card-body">
            {alert.message ? <Alert {...alert} /> : null}
            <h1 className="text-primary text-center mb-5">
              {" "}
              <i className="fas fa-lock"></i> Register
            </h1>

            <form onSubmit={this.handleSubmit}>
              <div className="registeras text-center">
                <input
                  onChange={(e) => this.setState({ role: e.target.value })}
                  type="radio"
                  id="male"
                  name="auth"
                  value="banker"
                />
                <label className="mr-4" htmlFor="male">
                  Register as Banker
                </label>
                <input
                  onChange={(e) => this.setState({ role: e.target.value })}
                  type="radio"
                  id="female"
                  name="auth"
                  value="customer"
                />
                <label htmlFor="female">Register as Customer</label>
              </div>

              <FormInput
                labelText="User Name"
                CustomOnChange={this.handleChange}
                type="text"
                name="name"
                customClass="form-control"
                id="exampleInputName1"
                placeholder="Enter User Name ...."
                value={name}
              />
              <FormInput
                labelText="Email address"
                CustomOnChange={this.handleChange}
                type="email"
                name="email"
                customClass="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email ...."
                value={email}
              />

              {role === "customer" && (
                <FormInput
                  labelText="Account No"
                  CustomOnChange={this.handleChange}
                  type="number"
                  name="account_no"
                  customClass="form-control"
                  id="exampleInputAccountNo1"
                  placeholder="Enter Account no ...."
                  value={account_no}
                />
              )}

              <FormInput
                labelText="Password"
                CustomOnChange={this.handleChange}
                type="password"
                name="password"
                customClass="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password ...."
                value={password}
              />
              <FormInput
                type="submit"
                customClass="btn btn-primary d-block mx-auto"
              >
                Register
              </FormInput>
              <Link to="/login">Sign In</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapUserStateToProps, {
  userRegister,
  removeAlert,
  setAlert,
})(Register);
