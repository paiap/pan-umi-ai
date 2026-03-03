// 示例方法，没有实际意义
export const trim = (str: string) => {
  return str.trim();
}

/**
 * 格式化数字
 * @param value 数字或null或undefined
 * @returns 如果是整数（包括0），返回整数；如果是小数，保留两位小数；如果是null或undefined，返回'-'
 */
export const formatNumber = (value: number | null | undefined): string | number => {
  if (value === null || value === undefined) {
    return '-';
  }
  
  // 判断是否为整数
  if (Number.isInteger(value)) {
    return value;
  }
  
  // 处理小数，保留两位
  return Number(value.toFixed(2));
}
