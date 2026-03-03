export default (initialState: API.UserInfo) => {
  console.log(initialState);
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const home = !!(initialState && initialState.user === 'panan');

  return {
    home,
  };
};
