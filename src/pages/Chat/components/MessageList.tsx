/*
 * @creater: panan
 * @message: 聊天消息列表组件
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 15:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/Chat/components/MessageList.tsx
 */
import { useEffect, useRef } from 'react';
import { Avatar, Space } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import styles from './MessageList.less';

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
 * 消息列表组件 Props
 */
interface MessageListProps {
  messages: ChatMessage[];
}

/**
 * 简单的 Markdown 文本渲染
 * 支持基本的代码块、加粗、斜体等格式
 */
const renderMarkdown = (text: string) => {
  // 分割代码块
  const parts = text.split(/```[\s\S]*?```/);
  const codeBlocks = text.match(/```[\s\S]*?```/g) || [];

  let partIndex = 0;
  let codeIndex = 0;

  return text.split(/(\n|```[\s\S]*?```)/g).map((part, idx) => {
    // 代码块处理
    if (part.startsWith('```')) {
      const code = part.replace(/```/g, '').trim();
      return (
        <pre key={idx} style={{ margin: '8px 0', padding: '12px' }}>
          <code>{code}</code>
        </pre>
      );
    }

    // 换行处理
    if (part === '\n') {
      return <br key={idx} />;
    }

    // 普通文本处理
    if (part.trim()) {
      return <span key={idx}>{part}</span>;
    }

    return null;
  });
};

/**
 * 消息列表组件
 * 支持基础文本渲染和代码块展示
 */
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * 自动滚动到最新消息
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * 格式化时间戳
   */
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.messageItem} ${styles[message.role]}`}
        >
          <div className={styles.messageContent}>
            <Space align="flex-start" size={12}>
              <Avatar
                icon={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                className={styles[`avatar-${message.role}`]}
              />
              <div className={styles.messageBubble}>
                <div className={styles.messageHeader}>
                  <span className={styles.messageRole}>
                    {message.role === 'user' ? '你' : 'AI 助手'}
                  </span>
                  <span className={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className={styles.messageText}>
                  {renderMarkdown(message.content)}
                </div>
              </div>
            </Space>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
