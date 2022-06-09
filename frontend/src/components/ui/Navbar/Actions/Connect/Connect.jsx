import Button from "@mui/material/Button";
import { useStoreActions } from "easy-peasy";

const isConnectWallet =
  process.env.REACT_APP_CONNECT_WALLET === "true" || false;

const Connect = () => {
  const onConnectWallet = useStoreActions(
    (actions) => actions.main.onConnectWallet
  );

  const connectWalletHandler = () => {
    onConnectWallet();
  };

  return (
    <div>
      {isConnectWallet && (
        <Button
          disableElevation={true}
          variant="contained"
          onClick={connectWalletHandler}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

export default Connect;
