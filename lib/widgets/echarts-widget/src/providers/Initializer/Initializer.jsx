import { cloneElement, useEffect, useState } from "react";
import * as wamp from "../../libs/wamp/connection";

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    (async () => {
      await wamp.getSession();
      setInit(true);
    })();
  }, [store, history]);

  return isInit ? cloneElement(children, { history }) : <div>Loading...</div>;
};
