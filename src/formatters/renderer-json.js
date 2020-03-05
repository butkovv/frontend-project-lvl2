const render = (diffArray) => {
  const mappedDiff = diffArray
    .map((node) => JSON.stringify(node)).join();
  return `{"diff":[${mappedDiff}]}`;
};
export default render;
