import Vue from 'vue';
import Vuex from 'vuex';

import { getOsInfo } from '@/utils/os';
import { getBrowserInfo } from '@/utils/browser';
import { clonePure } from '@/utils/util';
import { CreateHistory } from '../../core/operation';

const history = new CreateHistory();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    os: getOsInfo(),
    browser: getBrowserInfo(),
    history,
    items: {
      'genre*sold': {
        title: '示例',
        size: {
          w: 600,
          h: 400
        },
        color: [
          { hex: '#2194ff', a: 0.8 }
        ],
        data: Object.freeze([
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 }
        ])
      }
    }
  },
  mutations: {
    SAVE_DATA (state, payload) {
      const { name, key, data } = payload;

      // 操作记录
      history.push({
        item: state.items[name],
        key,
        data
      });

      if (typeof data === 'object') {
        state.items[name][key] = Object.freeze(clonePure(data));
      } else {
        state.items[name][key] = data;
      }
    },
    MOVE_STEP (state, payload) {
      const { name, direction } = payload;

      if (!history.isAllowMove(direction)) {
        return;
      }

      const { key, data } = history.move(direction);

      if (typeof data === 'object') {
        state.items[name][key] = Object.freeze(clonePure(data));
      } else {
        state.items[name][key] = data;
      }
    }
  },
  actions: {
    saveData: ({ commit }, param) => {
      commit('SAVE_DATA', param);
    },
    moveStep: ({ commit }, param) => {
      commit('MOVE_STEP', param);
    }
  }
});
