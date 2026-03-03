/*
 * @creater: panan
 * @message:
 * @since: 2024-05-29 17:00:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-05 15:08:27
 * @文件相对于项目的路径: /pan-umi/src/app.ts
 */
// 运行时配置

import { defineApp, matchRoutes } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

/**
 * @function message: 全局初始化数据配置
 * @return {*}
 */
export async function getInitialState(): Promise<{
  name: string;
  user: string;
}> {
  return {
    name: 'panan-umi',
    user: 'panan',
  };
}

export default defineApp({
  layout: () => {
    return {
      logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
      menu: {
        locale: false,
      },
    };
  },
  onRouteChange({
    location,
    clientRoutes,
  }: any) {
    const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
    console.log(route)
  },
});
