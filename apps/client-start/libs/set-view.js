import { openFile } from './operations';
import { createBoxTitle, createFileEl } from './element';

let isInit = false;

const EL_CREATE = document.querySelector('#create');

const createList = [
  {
    title: 'New file'
  },
  {
    title: 'Open file',
    opt: 'OPEN_FILE',
    prefix: '.xvd',
    fn: (e) => {
      const { path } = e.target.files[0];
      e.target.value = '';
      openFile(path).then(res => {
        XV.openFile(path);
      }).catch(err => {
        console.log(err);
      });
    }
  },
];

const debug = true;

if (debug) {
  XV.openFile('/Volumes/dev-1/xv-data-template-1.xvd');
}

export const initView = () => {
  if (isInit) return;

  EL_CREATE.appendChild(createBoxTitle('Start'));
  EL_CREATE.appendChild(createFileEl(createList));
  
}