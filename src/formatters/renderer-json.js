const render = (diffArray) => {
  const replaceStringValues = (key, value) => {
    if (typeof value === 'string') {
      return Number.isNaN(Number(value)) ? value : Number(value);
    }
    return value;
  };
  const mappedDiff = diffArray
    .map((node) => JSON.stringify(node, replaceStringValues)).join();
  return `{"diff":[${mappedDiff}]}`;
};
export default render;
