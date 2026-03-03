/*
 * @creater: panan
 * @message: 聊天服务 - 处理 API 请求
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 17:00:00
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
 * 构建完整的 API URL
 * 支持多种格式的 Base URL：
 * 1. 完整路径：https://open.bigmodel.cn/api/anthropic
 * 2. OpenAI 格式：https://api.openai.com/v1
 * 3. 简化格式：https://api.openai.com
 */
const buildApiUrl = (baseUrl: string): string => {
  let url = baseUrl.trim();
  
  // 移除末尾的斜杠
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  
  // 如果已经包含 /chat/completions，直接返回
  if (url.includes('/chat/completions')) {
    return url;
  }
  
  // 如果已经包含 /api/anthropic 或其他完整路径标志，直接返回
  if (url.includes('/api/') && !url.endsWith('/v1')) {
    return url;
  }
  
  // 如果以 /v1 结尾，添加 /chat/completions
  if (url.endsWith('/v1')) {
    return `${url}/chat/completions`;
  }
  
  // 如果没有 /v1，尝试添加
  if (!url.includes('/v1')) {
    return `${url}/v1/chat/completions`;
  }
  
  return url;
};

/**
 * 获取聊天响应
 * @param userMessage 用户消息
 * @param messages 历史消息列表
 * @param baseUrl API Base URL
 * @param apiKey API Key
 * @param model 模型名称
 * @returns AI 响应内容
 */
export const getChatResponse = async (
  userMessage: string,
  messages: ChatMessage[],
  baseUrl: string,
  apiKey: string,
  model: string
): Promise<string> => {
  try {
    // 构建完整的 API URL
    const apiUrl = buildApiUrl(baseUrl);

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

    console.log('API Request URL:', apiUrl);
    console.log('Model:', model);
    console.log('Messages:', messageList);

    // 构建请求体 - 只包含必需的字段
    const requestBody: any = {
      model: model,
      messages: messageList,
    };

    // 添加可选参数（如果需要）
    // 注意：不同的 API 可能支持不同的参数
    requestBody.temperature = 0.7;
    requestBody.max_tokens = 2000;

    console.log('Request Body:', requestBody);

    // 调用 API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // 获取响应文本用于调试
    const responseText = await response.text();
    console.log('API Response Status:', response.status);
    console.log('API Response Text:', responseText);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        const errorMsg = errorData.error?.message || errorData.msg || `API 请求失败: ${response.status}`;
        throw new Error(errorMsg);
      } catch (parseError) {
        throw new Error(
          `API 请求失败 (${response.status}): ${responseText || '无响应内容'}`
        );
      }
    }

    const data = JSON.parse(responseText);

    // 提取响应内容（支持多种响应格式）
    const assistantMessage =
      data.choices?.[0]?.message?.content ||
      data.content?.[0]?.text ||
      data.result ||
      '无法获取响应';

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
 * @param model 模型名称
 * @returns 验证结果
 */
export const validateApiConfig = async (
  baseUrl: string,
  apiKey: string,
  model: string
): Promise<{ valid: boolean; message: string }> => {
  try {
    const apiUrl = buildApiUrl(baseUrl);
    
    // 尝试发送一个简单的测试请求
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      return { valid: true, message: 'API 配置有效' };
    } else {
      const text = await response.text();
      return {
        valid: false,
        message: `API 验证失败 (${response.status}): ${text}`,
      };
    }
  } catch (error) {
    return {
      valid: false,
      message: `连接失败: ${error instanceof Error ? error.message : '未知错误'}`,
    };
  }
};
