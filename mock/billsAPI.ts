/*
 * @creater: panan
 * @message: 
 * @since: 2025-03-26 10:46:48
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-26 17:29:42
 * @文件相对于项目的路径: /pan-umi/mock/billsAPI.ts
 */
import { Request, Response } from 'express';

const tpcOptions = [
  { label: '项目组A', value: 'TPC-A' },
  { label: '项目组B', value: 'TPC-B' },
  { label: '项目组C', value: 'TPC-C' },
];

const generateTpcData = (month: string, tpc: string) => {
  return Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    tpc,
    userName: `用户${index + 1}`,
    gpuId: `GPU-${tpc}-${index + 1}`,
    outputTime: month,
    gpuNum: Math.floor(Math.random() * 1000) + 500,
    gpuHours: Math.floor(Math.random() * 100) + 20,
    gpuHourPrice: Math.floor(Math.random() * 50) + 10,
    // status 随机 0,1,2
    status: Math.floor(Math.random() * 4),
    remark: '无',
  }));
};

const generateGpuData = (month: string, tpc: string) => {
  return Array(8).fill(null).map((_, index) => ({
    tpc,
    gpuType: `GPU型号${index + 1}`,
    usageHours: Math.floor(Math.random() * 200) + 50,
    unitPrice: Math.floor(Math.random() * 30) + 20,
    totalAmount: Math.floor(Math.random() * 2000) + 1000,
    status: Math.random() > 0.5 ? '已结算' : '待结算',
  }));
};

const generateCloudData = (month: string, tpc: string) => {
  return Array(6).fill(null).map((_, index) => ({
    tpc,
    serviceType: `云服务${index + 1}`,
    usageAmount: Math.floor(Math.random() * 500) + 100,
    unitPrice: Math.floor(Math.random() * 20) + 10,
    totalCost: Math.floor(Math.random() * 1500) + 500,
    billingCycle: month,
    status: Math.random() > 0.5 ? '已支付' : '未支付',
  }));
};

export default {
  'GET /api/tpc-options': (req: Request, res: Response) => {
    res.json(tpcOptions);
  },
  'GET /api/tpc-data': (req: Request, res: Response) => {
    const { month, tpc } = req.query;
    res.json(generateTpcData(month as string, tpc as string));
  },
  'GET /api/gpu-data': (req: Request, res: Response) => {
    const { month, tpc } = req.query;
    res.json(generateGpuData(month as string, tpc as string));
  },
  'GET /api/cloud-data': (req: Request, res: Response) => {
    const { month, tpc } = req.query;
    res.json(generateCloudData(month as string, tpc as string));
  },
};