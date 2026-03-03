/*
 * @creater: panan
 * @message: 
 * @since: 2024-05-29 14:04:49
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-28 21:25:20
 * @文件相对于项目的路径: /pan-umi/src/components/Guide/index.tsx
 */
import { Layout, Row, Typography } from 'antd';
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

import styles from './Guide.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  const el = useRef(null);

  useEffect(() => {
    if (!name) return
    const typed = new Typed(el.current, {
      strings: [`欢迎使用, <strong>${name}</strong> ！`],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [name]);
  return (
    <Layout >
      <Row>
        <Typography.Title level={3} className={styles.title}>
          <span ref={el}></span>
        </Typography.Title>
      </Row>
    </Layout>
  );
};

export default Guide;
