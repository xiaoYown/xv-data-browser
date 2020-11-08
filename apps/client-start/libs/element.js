const create = (name = 'div') => {
  return document.createElement(name);
}
export const createBoxTitle = (text) => {
  const el = create();
  el.setAttribute('class', 'box-title');
  el.innerText = text;

  return el;
}

const createFileItem = ({ title, opt, path, fn }) => {
  const el = create();
  el.setAttribute('class', 'file-item');

  const elTitle = create('span');
  elTitle.setAttribute('class', 'file-item-title');
  elTitle.innerText = title;

  switch (opt) {
    case 'OPEN_FILE':
      const elInput = create('input');
      const elLabel = create('label');
      elInput.setAttribute('type', 'file');
      elInput.setAttribute('accept', '.xvd');
      elInput.style.width = 0;
      elInput.style.height = 0;
      elInput.style.display = 'inline-block';
      elInput.addEventListener('change', fn);
      elLabel.appendChild(elInput);
      elLabel.appendChild(elTitle);
      el.appendChild(elLabel);
      break;
    default:
      el.appendChild(elTitle);
  }

  if (path) {
    const elPath = create('span');
    elPath.setAttribute('class', 'file-item-path')
    elPath.innerText = path;

    el.appendChild(elPath);
  }
  return el;
}

export const createFileEl = (files) => {
  const range = document.createDocumentFragment();
  files.map(item => createFileItem(item)).forEach(item => {
    range.appendChild(item);
  });
  return range;
}