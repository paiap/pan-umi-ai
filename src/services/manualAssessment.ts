/*
 * @creater: panan
 * @message: 人工评估服务
 * @since: 2025-07-16
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16
 * @文件相对于项目的路径: /pan-umi/src/services/manualAssessment.ts
 */
import { request } from '@umijs/max';

/** 人工评估任务查询参数 */
export interface ManualAssessmentQueryParams {
  /** 任务名称（支持模糊查询） */
  taskName?: string;
  /** 任务类型 */
  taskType?: string;
  /** 模型对比对象（模型名称或ID） */
  comparisonObject?: string;
  /** 任务状态 */
  taskStatus?: string;
  /** 创建人ID */
  createBy?: number;
  /** 开始时间（查询范围开始） */
  startTime?: string;
  /** 结束时间（查询范围结束） */
  endTime?: string;
  /** 当前页 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
}

/** 人工评估任务数据项 */
export interface ManualAssessmentItem {
  /** 任务ID */
  id: string;
  /** 任务名称 */
  name: string;
  /** 任务类型 */
  taskType: string;
  /** 任务类型描述 */
  taskTypeDesc: string;
  /** 任务状态 */
  status: string;
  /** 任务状态描述 */
  statusDesc: string;
  /** 模型对比对象A */
  modelA: string;
  /** 模型对比对象B */
  modelB: string;
  /** 总评估项数 */
  totalItems: number;
  /** 已完成项数 */
  completedItems: number;
  /** 完成进度百分比 */
  progressPercent: number;
  /** 创建人ID */
  createBy: number;
  /** 创建人名称 */
  createByName: string;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
  /** 任务描述 */
  description: string;
}

/** 分页数据结构 */
export interface PageData<T> {
  /** 总数 */
  total: number;
  /** 数据列表 */
  data: T[];
}

/** 通用返回结构 */
export interface ApiResponse<T> {
  /** 状态码 */
  code: string;
  /** 消息 */
  msg: string;
  /** 数据 */
  data: T;
}

/** 获取人工评估任务分页列表 */
export async function getManualAssessmentList(
  params: ManualAssessmentQueryParams,
  options?: { [key: string]: any },
): Promise<ApiResponse<PageData<ManualAssessmentItem>>> {
  return request<ApiResponse<PageData<ManualAssessmentItem>>>(
    '/api/manual/compare/task/v1/page',
    {
      method: 'GET',
      params,
      ...(options || {}),
    },
  );
}
