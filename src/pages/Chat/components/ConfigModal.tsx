/*
 * @creater: panan
 * @message: API 配置模态框组件
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 17:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/Chat/components/ConfigModal.tsx
 */
import { Modal, Form, Input, Button, Space, message, Alert } from 'antd';
import { useEffect } from 'react';
import styles from './ConfigModal.less';

/**
 * 配置模态框 Props
 */
interface ConfigModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (baseUrl: string, apiKey: string, model: string) => void;
  initialConfig: { baseUrl: string; apiKey: string; model?: string };
}

/**
 * API 配置模态框组件
 */
const ConfigModal: React.FC<ConfigModalProps> = ({
  visible,
  onClose,
  onSave,
  initialConfig,
}) => {
  const [form] = Form.useForm();

  /**
   * 初始化表单数据
   */
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        baseUrl: initialConfig.baseUrl,
        apiKey: initialConfig.apiKey,
        model: initialConfig.model || 'gpt-3.5-turbo',
      });
    }
  }, [visible, initialConfig, form]);

  /**
   * 处理保存配置
   */
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave(values.baseUrl, values.apiKey, values.model);
    } catch (error) {
      message.error('请填写所有必填项');
    }
  };

  return (
    <Modal
      title="API 配置"
      open={visible}
      onCancel={onClose}
      footer={null}
      className={styles.configModal}
      width={550}
    >
      <Alert
        message="支持多种 API 格式"
        description="支持 OpenAI、Claude Code、智谱清言等所有兼容 Claude API 的服务。请输入您的完整 Base URL、API Key 和模型名称。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className={styles.configForm}
      >
        <Form.Item
          label="Base URL"
          name="baseUrl"
          rules={[
            { required: true, message: '请输入 Base URL' },
            {
              pattern: /^https?:\/\/.+/,
              message: '请输入有效的 URL（以 http:// 或 https:// 开头）',
            },
          ]}
          tooltip="输入完整的 API 地址，系统会自动识别并处理"
        >
          <Input
            placeholder="https://open.bigmodel.cn/api/anthropic"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="API Key"
          name="apiKey"
          rules={[
            { required: true, message: '请输入 API Key' },
            { min: 5, message: 'API Key 长度不足' },
          ]}
          tooltip="您的 API 密钥，将安全地存储在本地"
        >
          <Input.Password
            placeholder="输入您的 API Key"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[
            { required: true, message: '请输入模型名称' },
            { min: 1, message: '模型名称不能为空' },
          ]}
          tooltip="输入您要使用的模型名称"
        >
          <Input
            placeholder="例如：gpt-3.5-turbo, glm-4-flash, claude-3-5-sonnet"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={handleSave}>
              保存配置
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <div className={styles.tips}>
        <h4>常见配置示例：</h4>
        <ul>
          <li>
            <strong>OpenAI:</strong> Base URL: https://api.openai.com/v1, Model: gpt-3.5-turbo
          </li>
          <li>
            <strong>智谱清言:</strong> Base URL: https://open.bigmodel.cn/api/anthropic, Model: glm-4-flash
          </li>
          <li>
            <strong>本地 Ollama:</strong> Base URL: http://localhost:11434/v1, Model: mistral
          </li>
          <li>
            <strong>Claude Code:</strong> Base URL: https://api.openai.com/v1, Model: claude-3-5-sonnet
          </li>
        </ul>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
          💡 提示：不同的 API 服务使用不同的模型标识符，请根据您的 API 文档填写正确的模型名称
        </p>
      </div>
    </Modal>
  );
};

export default ConfigModal;
