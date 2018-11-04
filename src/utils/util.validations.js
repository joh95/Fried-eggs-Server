let validBalance = balance => (balance > 0 ? true : false);

let validExitsUser = (model, user) => {
  model.findOne({
    cc: user
  }).then(data => {
    let response = data != null ? true : false;
    console.log(response);
    return response;
  });
};

let validAmount = (actualAmount, transactionAmount) => {
  return actualAmount - transactionAmount > 0 ? true : false;
};
let getUser = (model, user) => {
  return model.findOne({
    cc: user
  }).then(data => data);
};

let updateUser = (model, user) => {
  return model.updateOne({
    cc: user.cc
  }, user).then(data => data);
};

module.exports = {
  validBalance,
  validExitsUser,
  getUser,
  validAmount,
  updateUser
};