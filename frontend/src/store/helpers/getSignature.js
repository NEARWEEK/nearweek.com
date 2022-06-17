import bs58 from "bs58";
import { Buffer } from "buffer";
function toED25519(key) {
  return `${bs58.encode(Buffer.from(key))}`;
}

export const getSignature = async (keyPair, token) => {
  global.Buffer = Buffer;
  const msg = Buffer.from(token);
  const { signature } = keyPair.sign(msg);
  return toED25519(signature);
};
