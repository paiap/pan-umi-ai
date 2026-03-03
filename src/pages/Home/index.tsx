/*
 * @creater: panan
 * @message: 
 * @since: 2024-05-29 17:00:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-22 19:34:12
 * @文件相对于项目的路径: /pan-umi/src/pages/Home/index.tsx
 */
import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { routes } from '../route';
import { Card } from 'antd';
// import { prettyLog } from '@/utils/console';

const HomePage: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    const data = routes.filter((c: any) => c?.path !== '/access' && c?.path !== '/home' && c?.menu !== false)
    console.log(data)
    setDataSource(data)
  }, [])

  const handleClick = (item: any) => {
    console.log(item)
    window.open(`${window.location.origin}/panan${item?.path}`)
  }

  const generateRandomGradient = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    const color1 = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    const color2 = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '百变小工具',
      }}
    >
      <div className={styles.cardContainer}>
        {dataSource.map((item) => (
          <div className={styles.card} key={item?.path}>
            <Card
              hoverable
              className={styles.cardContent}
              style={{ background: generateRandomGradient() }}
              onClick={() => handleClick(item)}
            >
              <p className={styles.cardName}>{item?.name}</p>
            </Card>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default HomePage;

// 路由预加载
export const clientLoader = async () => {
  return {
    name: 'panan-clientLoader',
  }
}