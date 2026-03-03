/*
 * @creater: panan
 * @message: 聊天服务 - 处理 API 请求
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 15:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/Chat/services/chatService.ts
 */

/**
 * 聊天消息类型定义
 */
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

/**
 * OpenAI 兼容 API 消息格式
 */
interface APIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * 获取聊天响应
 * @param userMessage 用户消息
 * @param messages 历史消息列表
 * @param baseUrl API Base URL
 * @param apiKey API Key
 * @returns AI 响应内容
 */
export const getChatResponse = async (
  userMessage: string,
  messages: ChatMessage[],
  baseUrl: string,
  apiKey: string
): Promise<string> => {
  try {
    // 构建消息列表
    const messageList: APIMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // 添加当前用户消息
    messageList.push({
      role: 'user',
      content: userMessage,
    });

    // 调用 API
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // 默认模型，可根据需要调整
        messages: messageList,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `API 请求失败: ${response.status}`
      );
    }

    const data = await response.json();

    // 提取响应内容
    const assistantMessage =
      data.choices?.[0]?.message?.content || '无法获取响应';

    return assistantMessage;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`聊天请求失败: ${error.message}`);
    }
    throw new Error('聊天请求失败，请检查网络连接和 API 配置');
  }
};

/**
 * 验证 API 配置
 * @param baseUrl API Base URL
 * @param apiKey API Key
 * @returns 验证结果
 */
export const validateApiConfig = async (
  baseUrl: string,
  apiKey: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${baseUrl}/models`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};
