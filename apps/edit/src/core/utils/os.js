export const getOsInfo = () => {
  const UA = navigator.userAgent.toLowerCase();
  let name = 'Unknown';
  let version = 'Unknown';
  if (UA.indexOf('win') > -1) {
    name = 'Windows';
    if (UA.indexOf('windows nt 5.0') > -1) {
      version = 'Windows 2000';
    } else if (UA.indexOf('windows nt 5.1') > -1 || UA.indexOf('windows nt 5.2') > -1) {
      version = 'Windows XP';
    } else if (UA.indexOf('windows nt 6.0') > -1) {
      version = 'Windows Vista';
    } else if (UA.indexOf('windows nt 6.1') > -1 || UA.indexOf('windows 7') > -1) {
      version = 'Windows 7';
    } else if (UA.indexOf('windows nt 6.2') > -1 || UA.indexOf('windows 8') > -1) {
      version = 'Windows 8';
    } else if (UA.indexOf('windows nt 6.3') > -1) {
      version = 'Windows 8.1';
    } else if (UA.indexOf('windows nt 6.2') > -1 || UA.indexOf('windows nt 10.0') > -1) {
      version = 'Windows 10';
    } else {
      version = 'Unknown';
    }
  } else if (UA.indexOf('iphone') > -1) {
    name = 'Iphone';
  } else if (UA.indexOf('mac') > -1) {
    name = 'Mac';
    version = /[\d]+_[\d]+_[\d]+/.exec(UA)[0].replace(/_/g, '.');
  } else if (UA.indexOf('x11') > -1 || UA.indexOf('unix') > -1 || UA.indexOf('sunname') > -1 || UA.indexOf('bsd') > -1) {
    name = 'Unix';
  } else if (UA.indexOf('linux') > -1) {
    if (UA.indexOf('android') > -1) {
      name = 'Android';
    } else {
      name = 'Linux';
    }
  } else {
    name = 'Unknown';
  }
  return { name, version };
};
