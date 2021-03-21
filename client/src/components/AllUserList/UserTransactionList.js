import React from "react";
import { connect } from "react-redux";
import { mapUserStateToProps } from "../../redux/mapStateToProps";

function UserTransactionList(props) {
  if (!props.userTransactionList) {
    return <h1>No Transaction Found</h1>;
  }
  return props.userTransactionList.length ? (
    <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">SlNo</th>
            <th scope="col">Deposited</th>
            <th scope="col">Withdraw</th>
            <th scope="col">Account Id</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>
        <tbody>
          {props.userTransactionList.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.deposited}</td>
              <td>{user.withdraw}</td>
              <td>{user.account_id}</td>
              <td>{user.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : null;
}

export default connect(mapUserStateToProps, null)(UserTransactionList);
