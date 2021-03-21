import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import Dashboard from "../src/pages/Dashboard";
import UserTransactionList from '../src/components/AllUserList/UserTransactionList';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App"></div>;
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/user-transaction-list" component={UserTransactionList}/>
        </Switch>
        <Redirect to="/login" />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
