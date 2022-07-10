import autobahn from "autobahn";

let sessionPromise = undefined;

const wampNearExplorerUrl = process.env.REACT_APP_NEAR_EXPLORER_WAMP_HOST;

const createSession = async () => {
  return new Promise((resolve, reject) => {
    console.log("Starting WAMP session...");
    const connection = new autobahn.Connection({
      url: wampNearExplorerUrl,
      realm: "near-explorer",
      retry_if_unreachable: true,
      max_retries: Number.MAX_SAFE_INTEGER,
      max_retry_delay: 10
    });
    connection.onopen = (session) => {
      console.log("WAMP session started");
      resolve(session);
    };
    connection.onclose = (reason) => {
      console.log("WAMP session closed");
      reject(reason);
      return false;
    };
    connection.open();
  });
};

export const getSession = async () => {
  if (!sessionPromise) {
    sessionPromise = createSession();
  }
  const session = await sessionPromise;
  if (!session.isOpen) {
    sessionPromise = createSession();
  }
  return sessionPromise;
};

let wampSubscriptionCache = {};

export const subscribeTopic = async (topic, handler) => {
  if (wampSubscriptionCache[topic]) {
    return;
  }
  const session = await getSession();
  wampSubscriptionCache[topic] = {
    subscription: await session.subscribe(topic, (_args, kwargs) => {
      handler(kwargs);
      const cachedTopic = wampSubscriptionCache[topic];
      if (!cachedTopic) {
        // Bail-out in case we have a race condition of this callback and unsubscription
        return;
      }
      cachedTopic.lastValue = kwargs;
    }),
    lastValue: undefined
  };
};

export const unsubscribeTopic = async (topic) => {
  const cacheItem = wampSubscriptionCache[topic];
  if (!cacheItem) {
    return;
  }
  delete wampSubscriptionCache[topic];
  await cacheItem.subscription.unsubscribe();
};

export const getLastValue = (topic) => {
  return wampSubscriptionCache[topic]?.lastValue;
};

export async function call(procedure, args) {
  const session = await getSession();
  const result = await session.call(procedure, args);
  return result;
}
