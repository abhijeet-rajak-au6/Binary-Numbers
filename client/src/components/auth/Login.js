import React, { Component } from "react";
import Alert from "../errors/Alert";
import { connect } from "react-redux";
import FormInput from "../FormInput/FormInput";
import { userLogin } from "../../redux/actions/userAction";
import { removeAlert, setAlert } from "../../redux/actions/alertAction";
import { mapUserStateToProps } from "../../redux/mapStateToProps";

import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    const { userLogin, history, setAlert, removeAlert } = this.props;
    try {
      const message = await userLogin({
        email: email.value,
        password: password.value,
      });

      if (message.includes("Welcome")) {
        history.push("/dashboard");
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
    const { email, password, errors } = this.state;
    const { alert } = this.props;
    // const { message, messageType } = this.props.notifyData;
    return (
      <div className="login d-flex flex-row justify-content-center my-5">
        <div className="card w-50">
          <div className="card-body">
            {alert.message ? <Alert {...alert} /> : null}
            <h1 className="text-primary text-center mb-5">
              {" "}
              <i className="fas fa-lock"></i> Login
            </h1>

            <form onSubmit={this.handleSubmit}>
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
                Login
              </FormInput>
              <Link to="/register">Sign Up</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapUserStateToProps, {
  userLogin,
  removeAlert,
  setAlert,
})(Login);
