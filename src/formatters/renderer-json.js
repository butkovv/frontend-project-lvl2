const render = (diffTree) => {
  const mappedDiff = diffTree
    .map((node) => JSON.stringify(node)).join();
  return `{"diff":[${mappedDiff}]}`;
};
export default render;
