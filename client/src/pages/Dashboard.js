import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapUserStateToProps } from "../redux/mapStateToProps";
import {
  userLogout,
  listAllUserBalance,
  depositmoney,
  withdrawMoney,
  getUserTransaction,
  getLoggedInUserTransaction,
  getBalance,
} from "../redux/actions/userAction";
import AllUserList from "../components/AllUserList/AllUserList";
import FormInput from "../components/FormInput/FormInput";
import Alert from "../components/errors/Alert";

const Dashboard = (props) => {
  const [deposit, setDeposit] = useState("");
  const [withraw, setWithDraw] = useState("");

  useEffect(() => {
    if (props.user.role === "banker") props.listAllUserBalance();
    if (props.user.role === "customer") props.getBalance();
  }, []);

  const handleLogout = async (e) => {
    try {
      props.history.push("/login");
      await props.userLogout();
    } catch (err) {
      console.log(err);
    }
  };

  const handleTransaction = async (id) => {
    // call user transaction
    try {
      props.getUserTransaction(id);
      props.history.push("/user-transaction-list");
    } catch (err) {}
  };

  const handleWithdrawMoney = async (e) => {
    try {
      await props.withdrawMoney(withraw);
      await props.getBalance();
      setWithDraw("");
    } catch (err) {}
  };

  const handleDepositMoney = async (e) => {
    try {
      await props.depositmoney(deposit);
      await props.getBalance();
      setDeposit("");
    } catch (err) {}
  };

  const handleChange = (e) => {
    if (e.target.name === "deposit") setDeposit(e.target.value);
    else setWithDraw(e.target.value);
  };

  const handleSeeYourTransaction = async (e) => {
    try {
      props.getLoggedInUserTransaction();
      props.history.push("/user-transaction-list");
    } catch (err) {}
  };

  let element;

  if (props.user.role === "banker") {
    element = <AllUserList clickTransaction={handleTransaction} />;
  } else {
    element = (
      <>
        {<h2>Total balance: {props.balance}</h2>}
        {props.alert.message ? <Alert {...props.alert} /> : null}
        <div
          className="mt-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormInput
              CustomOnChange={handleChange}
              type="number"
              name="withdraw"
              customClass="form-control"
              id="exampleInputName1"
              placeholder="Enter Withdrawl Money ...."
              value={withraw}
            />
            <button
              onClick={handleWithdrawMoney}
              className="mx-3 btn btn-primary"
            >
              With draw
            </button>{" "}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormInput
              CustomOnChange={handleChange}
              type="number"
              name="deposit"
              customClass="form-control"
              id="exampleInputName1"
              placeholder="Enter Deposit Money ..."
              value={deposit}
            />
            <button
              onClick={handleDepositMoney}
              className="mx-3 btn btn-primary"
            >
              Deposit money
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSeeYourTransaction}
            className="btn btn-primary"
          >
            See Your Transaction
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ margin: "0 auto" }}>{props.user.message}</h1>
        <button
          onClick={handleLogout}
          // style={{ marginLeft: "auto" }}
          className="mx-auto  btn btn-warning"
        >
          Logout
        </button>
      </div>
      {element}
    </>
  );
};

export default connect(mapUserStateToProps, {
  userLogout,
  listAllUserBalance,
  depositmoney,
  withdrawMoney,
  getUserTransaction,
  getLoggedInUserTransaction,
  getBalance,
})(Dashboard);
