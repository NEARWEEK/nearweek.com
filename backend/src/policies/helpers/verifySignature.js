const bs58 = require("bs58");
const { utils } = require("near-api-js");

function verifySignature(signature, publicKey, token) {
  try {
    const sign = bs58.decode(signature);
    const msg = Buffer.from(token);
    const pk = utils.PublicKey.fromString(publicKey);
    return pk.verify(msg, sign);
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  verifySignature,
};
