/*
 * @creater: panan
 * @message: API 配置模态框组件
 * @since: 2026-03-03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 15:00:00
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
  onSave: (baseUrl: string, apiKey: string) => void;
  initialConfig: { baseUrl: string; apiKey: string };
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
      form.setFieldsValue(initialConfig);
    }
  }, [visible, initialConfig, form]);

  /**
   * 处理保存配置
   */
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave(values.baseUrl, values.apiKey);
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
      width={500}
    >
      <Alert
        message="提示"
        description="请输入您的 OpenAI 兼容 API 的 Base URL 和 API Key。支持 Claude Code 标准 API 格式。"
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
          tooltip="例如：https://api.openai.com/v1 或其他兼容 API 的地址"
        >
          <Input
            placeholder="https://api.openai.com/v1"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          label="API Key"
          name="apiKey"
          rules={[
            { required: true, message: '请输入 API Key' },
            { min: 10, message: 'API Key 长度不足' },
          ]}
          tooltip="您的 OpenAI API Key 或其他兼容 API 的密钥"
        >
          <Input.Password
            placeholder="sk-..."
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
        <h4>常见 API 地址：</h4>
        <ul>
          <li>
            <strong>OpenAI:</strong> https://api.openai.com/v1
          </li>
          <li>
            <strong>Claude Code:</strong> https://api.openai.com/v1 (兼容格式)
          </li>
          <li>
            <strong>本地模型:</strong> http://localhost:8000/v1
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ConfigModal;
