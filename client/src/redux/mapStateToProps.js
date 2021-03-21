export const mapUserStateToProps = (reduxState) => {
  return {
    user: reduxState.userState.user,
    alert: reduxState.alertState,
    allUserList:reduxState.userState.allUserBalance,
    allUserErr:reduxState.userState.allUserBalanceErr,
    userTransactionList:reduxState.userState.userTransaction,
    balance:reduxState.userState.balance
  };
};
