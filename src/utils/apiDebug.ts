/*
 * @creater: panan
 * @message: API调试工具
 * @since: 2025-07-18
 * @文件相对于项目的路径: /pan-umi/src/utils/apiDebug.ts
 */

export class ApiDebugger {
  private static logs: Array<{
    timestamp: string;
    type: 'request' | 'response' | 'error';
    url: string;
    data: any;
  }> = [];

  // 记录API请求
  static logRequest(url: string, data: any) {
    this.logs.push({
      timestamp: new Date().toISOString(),
      type: 'request',
      url,
      data,
    });
    console.log('📤 API Request:', { url, data });
  }

  // 记录API响应
  static logResponse(url: string, data: any) {
    this.logs.push({
      timestamp: new Date().toISOString(),
      type: 'response',
      url,
      data,
    });
    console.log('📥 API Response:', { url, data });
  }

  // 记录API错误
  static logError(url: string, error: any) {
    this.logs.push({
      timestamp: new Date().toISOString(),
      type: 'error',
      url,
      data: error,
    });
    console.error('🚨 API Error:', { url, error });
  }

  // 获取所有日志
  static getLogs() {
    return this.logs;
  }

  // 清除日志
  static clearLogs() {
    this.logs = [];
  }

  // 导出日志到控制台
  static exportLogs() {
    console.group('🔍 API Debug Logs');
    this.logs.forEach((log, index) => {
      console.log(
        `${index + 1}. [${log.timestamp}] ${log.type.toUpperCase()}: ${
          log.url
        }`,
        log.data,
      );
    });
    console.groupEnd();
  }

  // 检查网络状态
  static checkNetworkStatus() {
    const status = {
      online: navigator.onLine,
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      currentUrl: window.location.href,
      protocol: window.location.protocol,
      host: window.location.host,
    };

    console.log('🌐 Network Status:', status);
    return status;
  }
}

// 在窗口对象上暴露调试器，方便线上调试
if (typeof window !== 'undefined') {
  (window as any).ApiDebugger = ApiDebugger;
}
