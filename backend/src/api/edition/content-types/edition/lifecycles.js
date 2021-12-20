module.exports = {
  /**
   * Triggered before user creation.
   */
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;
  },

  afterCreate(event) {
    const { result, params } = event;
    // do something to the result;
  },
};
