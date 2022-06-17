// path: ./src/policies/is-nearUser.js

const signature = require("./helpers/verifySignature");
const state = require("./helpers/getPK");

module.exports = async (policyCtx, config, { strapi }) => {
  const { body } = policyCtx.request;
  const { data } = JSON.parse(JSON.stringify(body));

  const isUserPK = await state.getPK(data.account_id, data.public_key);

  if (!isUserPK) {
    return false;
  }

  return !!signature.verifySignature(
    data.signature,
    data.public_key,
    data.Title
  );
};
