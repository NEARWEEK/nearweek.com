import { KeyPair, keyStores } from "near-api-js";
import { nearConfig } from "../../config/nearConfig";
import { thunk } from "easy-peasy";
import { getKeyPair } from "../helpers/getKeyPair";

const { networkId } = nearConfig;

export const onRedirectFromWallet = thunk(async (actions, payload, helpers) => {
  const { history } = payload;
  const state = helpers.getStoreState();
  const wallet = state.main.entities.wallet;
  const keyStore = wallet._keyStore;
  try {
    const accountId = wallet.getAccountId();
    let keyPair = await getKeyPair(state);
    if (!keyPair) {
      keyPair = KeyPair.fromRandom("ed25519");
      await keyStore.setKey(networkId, accountId, keyPair);
      const publicKey = keyPair.getPublicKey();
      const account = wallet.account();
      await account.addKey(publicKey);
    }

    history.replace(history.location.pathname);
  } catch (e) {
    console.log(`${e}`);
  }
});
