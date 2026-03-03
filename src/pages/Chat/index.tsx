/*
 * @creater: panan
 * @message: AI 聊天页面 - 支持自定义 BaseURL 和 APIKey
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 15:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/Chat/index.tsx
 */
import { useEffect, useRef, useState } from 'react';
import { Input, Button, Space, Drawer, Form, message, Spin, Empty } from 'antd';
import { SendOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getChatResponse } from './services/chatService';
import { getStorageConfig, setStorageConfig } from './utils/storage';
import MessageList from './components/MessageList';
import ConfigModal from './components/ConfigModal';

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
 * AI 聊天页面主组件
 */
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [configVisible, setConfigVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<{ baseUrl: string; apiKey: string }>({
    baseUrl: '',
    apiKey: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * 初始化：从 localStorage 加载配置
   */
  useEffect(() => {
    const storedConfig = getStorageConfig();
    if (storedConfig) {
      setConfig(storedConfig);
    }
  }, []);

  /**
   * 自动滚动到最新消息
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * 处理发送消息
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      message.warning('请输入消息内容');
      return;
    }

    if (!config.baseUrl || !config.apiKey) {
      message.error('请先配置 API 信息');
      setConfigVisible(true);
      return;
    }

    // 创建用户消息
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // 调用 API 获取响应
      const response = await getChatResponse(
        inputValue,
        messages,
        config.baseUrl,
        config.apiKey
      );

      // 创建助手消息
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : '获取响应失败，请检查配置'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理配置保存
   */
  const handleConfigSave = (baseUrl: string, apiKey: string) => {
    setConfig({ baseUrl, apiKey });
    setStorageConfig({ baseUrl, apiKey });
    setConfigVisible(false);
    message.success('配置已保存');
  };

  /**
   * 处理清空聊天记录
   */
  const handleClearChat = () => {
    setMessages([]);
    message.success('聊天记录已清空');
  };

  /**
   * 处理按 Enter 发送消息
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* 聊天头部 */}
      <div className={styles.chatHeader}>
        <h2>🤖 AI 聊天助手</h2>
        <Button
          type="text"
          icon={<SettingOutlined />}
          onClick={() => setConfigVisible(true)}
          className={styles.settingBtn}
        />
      </div>

      {/* 消息列表区域 */}
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <Empty
            description="开始一段对话吧"
            style={{ marginTop: '100px' }}
          />
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className={styles.loadingArea}>
          <Spin tip="AI 正在思考..." />
        </div>
      )}

      {/* 输入框区域 */}
      <div className={styles.inputArea}>
        <Space.Compact style={{ width: '100%' }}>
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息（Shift + Enter 换行，Enter 发送）"
            rows={3}
            disabled={loading}
            className={styles.input}
          />
        </Space.Compact>
        <div className={styles.actionBar}>
          <Space>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              loading={loading}
              disabled={!inputValue.trim()}
              className={styles.sendBtn}
            >
              发送
            </Button>
            <Button onClick={handleClearChat} disabled={messages.length === 0}>
              清空
            </Button>
          </Space>
        </div>
      </div>

      {/* 配置抽屉 */}
      <ConfigModal
        visible={configVisible}
        onClose={() => setConfigVisible(false)}
        onSave={handleConfigSave}
        initialConfig={config}
      />
    </div>
  );
};

export default ChatPage;

/**
 * 路由预加载
 */
export const clientLoader = async () => {
  return {
    name: 'panan-chat-loader',
  };
};
