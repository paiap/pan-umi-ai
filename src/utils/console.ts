/*
 * @creater: panan
 * @message: prettyLog
 * @since: 2024-09-09 16:20:13
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-09 16:21:16
 * @文件相对于项目的路径: /pan-umi/src/utils/console.ts
 */
// 美化打印实现方法
export const prettyLog = () => {
  const isEmpty = (value: any) => {
      return value === null || value === undefined || value === '';
  };
  const prettyPrint = (title: string, text: string, color: string) => {
      console.log(
          `%c ${title} %c ${text} %c`,
          `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
          `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
          'background:transparent'
      );
  };
  const info = (textOrTitle: string, content = '') => {
      const title = isEmpty(content) ? 'Info' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#909399');
  };
  const error = (textOrTitle: string, content = '') => {
      const title = isEmpty(content) ? 'Error' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#F56C6C');
  };
  const warning = (textOrTitle: string, content = '') => {
      const title = isEmpty(content) ? 'Warning' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#E6A23C');
  };
  const success = (textOrTitle: string, content = '') => {
      const title = isEmpty(content) ? 'Success ' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#67C23A');
  };
  // retu;
  return {
      info,
      error,
      warning,
      success
  };
};
// 创建打印对象
// const log = prettyLog();
