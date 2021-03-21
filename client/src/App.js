import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import Dashboard from "../src/pages/Dashboard";
import UserTransactionList from "../src/components/AllUserList/UserTransactionList";
import RouteProtection from "../src/components/RouteProtection/RouteProtection";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App"></div>;
        <Switch>
          {/* <Route path="/"/> */}
          <RouteProtection exact path="/login" component={Login} />
          <RouteProtection exact path="/register" component={Register} />
          <RouteProtection exact path="/dashboard" component={Dashboard} />
          <RouteProtection
            exact
            path="/user-transaction-list"
            component={UserTransactionList}
          />
        <Redirect to="/login" />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
