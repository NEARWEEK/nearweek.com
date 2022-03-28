module.exports = {
  settings: {
    mailchimp: {
      enabled: true,
      token: process.env.MAILCHIMP,
      listId: process.env.MAILCHIMP_LIST_ID,
    },
  },
};
