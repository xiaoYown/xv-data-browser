import { clonePure } from '@/utils/util';

class CreateHistory {
  // 历史记录数据
  stack = [] // 记录栈

  step = 0 // 当前步数

  isAllowMove = direction => {
    switch (direction) {
      case -1:
        return this.step > 0;
      case 1:
        return this.step < this.stack.length;
      default:
        return false;
    }
  }

  // 记录一步操作
  push = ({ key, data, old }) => {
    const store = {
      key,
      prev: null,
      next: null
    };
    if (typeof data === 'object') {
      store.next = clonePure(data);
    } else {
      store.next = data;
    }
    if (typeof old === 'object') {
      store.prev = clonePure(old);
    } else {
      store.prev = old;
    }
    this.step += 1;
    this.stack.splice(this.step);
    this.stack.push(store);
  }

  // 记录移动
  move = direction => {
    const increment = direction === 1 ? 0 : -1;
    const { key, prev, next } = this.stack[this.step + increment];
    let data = null;

    switch (direction) {
      case -1:
        this.step -= 1;
        data = prev;
        break;
      case 1:
        this.step += 1;
        data = next;
        break;
    }
    return {
      data,
      key
    };
  }
}

export {
  CreateHistory
};
