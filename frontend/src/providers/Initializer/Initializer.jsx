import React from "react";
import { cloneElement, useEffect, useState } from "react";
import * as wamp from "../../libs/wamp/connection";

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);
  const actions = store.getActions();
  const onInitApp = actions.main.onInitApp;

  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      await onInitApp({ history, setInit });
      await wamp.getSession();
    })();
  }, [store, history, onInitApp]);

  return isInit ? cloneElement(children, { history }) : <div>Loading...</div>;
};
