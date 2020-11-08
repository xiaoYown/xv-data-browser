let portions = [];

const defaultState = {
  using: null
};

const mutations = {
  'portion.init': (state, { payload }) => {
    portions = payload;
    state.using = payload[0];
    return state;
  }
}

export const portion = (state = defaultState, params) => {
  if (mutations[params.type]) {
    state = mutations[params.type](state, params);
  }
  return Object.assign({}, state);
}