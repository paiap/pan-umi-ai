/*
 * @creater: panan
 * @message: 存储工具函数 - 管理本地存储
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 17:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/Chat/utils/storage.ts
 */

/**
 * 配置类型定义
 */
export interface ChatConfig {
  baseUrl: string;
  apiKey: string;
  model?: string;
}

/**
 * 存储键常量
 */
const STORAGE_KEY = 'panan_chat_config';

/**
 * 获取存储的配置
 * @returns 配置对象或 null
 */
export const getStorageConfig = (): ChatConfig | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to parse stored config:', error);
  }
  return null;
};

/**
 * 保存配置到存储
 * @param config 配置对象
 */
export const setStorageConfig = (config: ChatConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save config:', error);
  }
};

/**
 * 清除存储的配置
 */
export const clearStorageConfig = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear config:', error);
  }
};

/**
 * 获取存储的聊天历史
 * @returns 聊天消息数组或空数组
 */
export const getStorageChatHistory = (): any[] => {
  try {
    const stored = localStorage.getItem('panan_chat_history');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to parse chat history:', error);
  }
  return [];
};

/**
 * 保存聊天历史到存储
 * @param messages 聊天消息数组
 */
export const setStorageChatHistory = (messages: any[]): void => {
  try {
    localStorage.setItem('panan_chat_history', JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

/**
 * 清除聊天历史
 */
export const clearStorageChatHistory = (): void => {
  try {
    localStorage.removeItem('panan_chat_history');
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
};
