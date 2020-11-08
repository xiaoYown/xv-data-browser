import store from '../index';
import { parseQuery } from '../../core/utils/url';

const { loadXVD } = window.XV;

export const initData = () => {
  const filename = parseQuery().file;
  store.dispatch({
    type: 'main.status',
    payload: 2
  });
  setTimeout(() => {
    loadXVD(filename).then(({ code, data }) => {
      if (code === 200) {
        store.dispatch({
          type: 'main.init',
          payload: data.main
        });
        store.dispatch({
          type: 'portion.init',
          payload: data.portions
        });
        store.dispatch({
          type: 'material.init',
          payload: data.portions[0].content
        });
      }
    });
  }, 1000);
};
