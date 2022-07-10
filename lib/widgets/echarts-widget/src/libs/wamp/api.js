import * as connection from "./connection";

const getTopicName = (nearNetwork, topic) => {
  return `com.nearprotocol.${nearNetwork}.explorer.${topic}`;
};

const getProcedureName = (nearNetwork, procedure) => {
  return `com.nearprotocol.${nearNetwork}.explorer.${procedure}`;
};
let subscriptions = {};

function subscribe(nearNetwork, topic, handler) {
  if (!subscriptions[topic]) {
    subscriptions[topic] = [];
  }
  subscriptions[topic].push(handler);
  void connection.subscribeTopic(getTopicName(nearNetwork, topic), (data) =>
    subscriptions[topic].forEach((handler) => handler(data))
  );
  const lastValue = connection.getLastValue(topic);
  if (lastValue) {
    handler(lastValue);
  }
  return () => {
    subscriptions[topic] = subscriptions[topic].filter(
      (lookupHandler) => lookupHandler !== handler
    );
    connection.unsubscribeTopic(topic);
  };
}

function getCall(nearNetwork) {
  return (procedure, args) =>
    connection.call(getProcedureName(nearNetwork, procedure), args);
}

const wampApi = { subscribe, getCall };

export default wampApi;
