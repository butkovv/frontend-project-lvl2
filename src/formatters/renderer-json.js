const render = (diffArray) => {
  const replacer = (key, value) => {
    if (typeof value === 'string') {
      return Number.isNaN(Number(value)) ? value : Number(value);
    }
    return value;
  };
  const mappedDiff = diffArray
    .map((node) => JSON.stringify(node, replacer)).join();
  return `{"diff":[${mappedDiff}]}`;
};
export default render;
