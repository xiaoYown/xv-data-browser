const UA = navigator.userAgent;

const IS_CLIENT = /xv-data/.test(UA);

export const openFile = (path) => {
  return new Promise((resolve, reject) => {
    if (IS_CLIENT) {
      XV.fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  })
}