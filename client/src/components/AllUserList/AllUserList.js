import React from "react";
import { mapUserStateToProps } from "../../redux/mapStateToProps";
import { connect } from "react-redux";

function AllUserList(props) {
  if (props.allUserErr) {
    return <h4 className="text-center mt-5">No User Balance found</h4>;
  }
  
  return props.allUserList && props.allUserList.length ? (
    <table className="table mt-5">
      <thead>
        <tr>
          <th scope="col">SlNo</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total Balance</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.allUserList.map((user, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.total_balance}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={()=>props.clickTransaction(user.id)}
              >
                See All transaction
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
}

export default connect(mapUserStateToProps, null)(AllUserList);
