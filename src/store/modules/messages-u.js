const state = {
  unread: 0
};

const mutations = {
  set_unread(state, unread) {
    state.unread = unread;
  }
};

const actions = {
  setUnread({ commit }, unread) {
    commit("set_unread", unread);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
