import yaml from 'js-yaml';

export const jsonToYml = (json) => {
  return yaml.safeDump(json);
}
export const ymlToJson = yml => {
  return yaml.safeLoad(yml);
}