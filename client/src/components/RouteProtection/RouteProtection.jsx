import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { mapUserStateToProps } from "../../redux/mapStateToProps";

class RouteProtection extends Component {
  static routingPath = ["/login", "/register"];
  render() {
    const { user, component: Component, ...rest } = this.props;
    // console.log(Component);
    console.log("user Obj=", user);
    // const { displayName } = Component;
    // console.log(rest);
    console.log(RouteProtection.routingPath.includes(rest.path));
    return RouteProtection.routingPath.includes(rest.path) ? (
      <Route
        {...rest}
        render={(props) =>
          !user ? <Component {...props} /> : <Redirect to="/dashboard" />
        }
      />
    ) : (
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

export default connect(mapUserStateToProps, null)(RouteProtection);
