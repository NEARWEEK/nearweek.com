import { thunk } from "easy-peasy";
import { apiConfig } from "../../config/apiConfig";
import { nearConfig } from "../../config/nearConfig";
import { getKeyPair } from "../helpers/getKeyPair";
import { getSignature } from "../helpers/getSignature";

const { networkId } = nearConfig;

export const onSubmitArticle = thunk(async (actions, payload, helpers) => {
  const state = helpers.getStoreState();
  const wallet = state.main.entities.wallet;
  const accountId = wallet.getAccountId();
  const showMessage = actions.showMessage;
  const { data, setLoading, setIsSubmitSuccessful } = payload;

  try {
    const keyPair = await getKeyPair(state);
    const signature = await getSignature(keyPair, data.Title);
    data.public_key = keyPair.publicKey.toString();
    data.account_id = accountId;
    data.signature = signature;
    const newArticle = await apiConfig.postArticle({ data });
    showMessage("You successfully created your article!");
  } catch (e) {
    console.log(`Error: ${e}`);
    showMessage(`${e}`);
  } finally {
    setLoading(false);
    setIsSubmitSuccessful(true);
  }
});
