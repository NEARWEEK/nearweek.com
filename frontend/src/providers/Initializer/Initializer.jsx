import React from "react";
import { cloneElement, useEffect, useState } from "react";

export const Initializer = ({ store, history, children }) => {
  const [isInit, setInit] = useState(false);
  const actions = store.getActions();
  const onInitApp = actions.main.onInitApp;

  useEffect(() => {
    (async () => {
      await store.persist.resolveRehydration();
      await onInitApp({ history, setInit });
    })();
  }, [store, history, onInitApp]);

  return isInit ? cloneElement(children, { history }) : <div>Loading...</div>;
};
