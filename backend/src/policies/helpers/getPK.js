const nearAPI = require("near-api-js");
const config = require("./nearConfig");

const getPK = async (account_id, publicKey) => {
  const near = await nearAPI.connect({
    ...config.getNearConfig(process.env.NEAR_NETWORK),
  });
  let publicKeys = [];
  let { keys } = await near.connection.provider.query(
    `access_key/${account_id}`,
    ""
  );
  if (keys && keys.length) {
    publicKeys = keys.map((item) => item.public_key);
  }
  return publicKeys.includes(publicKey);
};

module.exports = {
  getPK,
};
