/*
 * @creater: panan
 * @message: 单页面应用改造版本 - 集成所有工具模块和 AI 聊天
 * @since: 2024-05-29 17:00:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2026-03-03 15:30:00
 * @文件相对于项目的路径: /pan-umi/src/pages/Home/index.tsx
 */
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { routes } from '../route';
import { Card, Tabs, Space, Button } from 'antd';
import { useModel } from '@umijs/max';
import { trim } from '@/utils/format';
import Guide from '@/components/Guide';
import ChatPage from '../Chat';

/**
 * 单页面应用首页组件
 * 功能：通过 Tabs 组件集成所有工具模块和 AI 聊天，避免页面跳转
 */
const HomePage: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('chat');
  const { name, setName } = useModel('global');
  const { initialState, setInitialState }: any = useModel('@@initialState');

  /**
   * 初始化工具列表
   * 过滤出除了首页和权限演示之外的所有工具
   */
  useEffect(() => {
    const data = routes.filter(
      (c: any) => c?.path !== '/access' && c?.path !== '/' && c?.menu !== false
    );
    setDataSource(data);
  }, []);

  /**
   * 权限演示相关逻辑
   */
  useEffect(() => {
    if (!initialState?.user) return;
    setName(initialState?.user);
  }, [initialState]);

  /**
   * 生成随机渐变色背景
   */
  const generateRandomGradient = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    const color1 = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    const color2 = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  /**
   * 处理工具卡片点击事件
   * 改造为在当前页面内切换 Tab，而不是跳转
   */
  const handleToolClick = (item: any) => {
    setActiveTab(`tool-${item?.path}`);
  };

  /**
   * 权限切换处理
   */
  const handlePermissionToggle = () => {
    setInitialState({
      ...initialState,
      user: initialState?.user === 'panan' ? 'other' : 'panan',
    });
  };

  /**
   * 构建 Tab 项
   */
  const tabItems = [
    {
      key: 'chat',
      label: '💬 AI 聊天',
      children: <ChatPage />,
    },
    {
      key: 'tools',
      label: '🛠 工具中心',
      children: (
        <div className={styles.cardContainer}>
          {dataSource.map((item) => (
            <div className={styles.card} key={item?.path}>
              <Card
                hoverable
                className={styles.cardContent}
                style={{ background: generateRandomGradient() }}
                onClick={() => handleToolClick(item)}
              >
                <p className={styles.cardName}>{item?.name}</p>
              </Card>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'access-demo',
      label: '🔐 权限演示',
      children: (
        <div className={styles.accessContainer}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button type="primary" onClick={handlePermissionToggle}>
              切换用户身份
            </Button>
            <Guide name={trim(name)} />
          </Space>
        </div>
      ),
    },
    ...dataSource.map((item) => ({
      key: `tool-${item?.path}`,
      label: item?.name,
      children: (
        <div className={styles.toolContainer}>
          <p>
            {item?.name}
            工具内容区域
          </p>
          <p>此处将展示 {item?.name} 的具体功能和交互逻辑</p>
        </div>
      ),
    })),
  ];

  return (
    <PageContainer
      ghost
      header={{
        title: '百变小工具 - 单页面应用',
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
        size="large"
      />
    </PageContainer>
  );
};

export default HomePage;

/**
 * 路由预加载
 */
export const clientLoader = async () => {
  return {
    name: 'panan-clientLoader-spa',
  };
};
