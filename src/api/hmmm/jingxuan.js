
import { createAPI } from '@/utils/request'
// 学科简单列表
export const simple = data => createAPI('/subjects/simple', 'get', data)
// 获取学科目录
export const xueke = data => createAPI(`/directorys/simple?subjectID=${data}`, 'get', data)
// 学科所属标签
export const biaoqian = data => createAPI(`/tags/simple?subjectID=${data}`, 'get', data)
// 用户简单列表
export const users = data => createAPI('/users/simple', 'get', data)
// 精选题库列表
export const choice = data => createAPI('/questions/choice', 'get', data)
// 精选题库删除
export const remove = data => createAPI(`/questions/${data.id}`, 'delete', data)
// 精选题库上下架
export const choicePublish = data =>
  createAPI(`/questions/choice/${data.id}/${data.publishState}`, 'post', data)
  // 审核
export const choiceCheck = data =>
  createAPI(`/questions/check/${data.id}`, 'post', data)
// 精选题库预览
export const zuihou = data => createAPI(`/questions/${data.id}`, 'get', data)
