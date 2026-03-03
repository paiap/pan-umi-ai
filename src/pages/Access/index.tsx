/*
 * @creater: panan
 * @message: 权限测试
 * @since: 2024-05-29 14:04:49
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-05 15:01:31
 * @文件相对于项目的路径: /pan-umi/src/pages/Access/index.tsx
 */
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useClientLoaderData, useModel } from '@umijs/max';
import { useEffect } from 'react';
import { Button, Space } from 'antd';
import Guide from '@/components/Guide';
import styles from './index.less';

const AccessPage: React.FC = () => {
  const { name, setName } = useModel('global');
  const { initialState, setInitialState }: any = useModel('@@initialState');
  const { data } = useClientLoaderData()

  console.log(data)

  useEffect(() => {
    if (!initialState?.user) return
    console.log(initialState?.user)
    setName(initialState?.user)
  }, [initialState])

  return (
    <PageContainer ghost header={{
      title: (
        <Space>
          <span>权限演示</span>
          <Button type='primary' onClick={() => setInitialState({ ...initialState, user: initialState?.user === 'panan' ? 'other' : 'panan' })}>更新</Button>
        </Space>
      ),
    }}>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default AccessPage;




export const clientLoader = async () => {
  return {
    name: 'panan',
  }
}