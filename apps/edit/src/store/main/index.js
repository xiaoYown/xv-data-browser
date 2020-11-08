const defaultState = {
  status: 0, // 1 - success; 2 - loading
  data: null
};

const mutations = {
  'main.status': (state, { payload }) => {
    state.status = payload;
    return state;
  },
  'main.init': (state, { payload }) => {
    state.status = 1;
    state.data = payload;
    return state;
  }
}

export const main = (state = defaultState, params) => {
  if (mutations[params.type]) {
    state = mutations[params.type](state, params);
  }
  return Object.assign({}, state);
}