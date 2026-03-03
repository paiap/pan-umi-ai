/*
 * @creater: panan
 * @message: 环境配置文件
 * @since: 2025-07-18
 * @文件相对于项目的路径: /pan-umi/src/config/env.ts
 */

// 环境配置
export const ENV_CONFIG = {
  // 开发环境
  development: {
    API_BASE_URL: 'http://localhost:8000',
    USE_MOCK: true,
  },
  // 生产环境
  production: {
    API_BASE_URL: 'https://your-production-api.com', // 请替换为实际的生产环境API地址
    USE_MOCK: true,
  },
  // 测试环境
  test: {
    API_BASE_URL: 'https://your-test-api.com', // 请替换为实际的测试环境API地址
    USE_MOCK: true,
  },
};

// 获取当前环境配置
export const getCurrentEnvConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return ENV_CONFIG[env as keyof typeof ENV_CONFIG] || ENV_CONFIG.development;
};

// 检查是否使用Mock数据
export const shouldUseMock = () => {
  return getCurrentEnvConfig().USE_MOCK;
};

// 获取API基础地址
export const getApiBaseUrl = () => {
  return getCurrentEnvConfig().API_BASE_URL;
};
