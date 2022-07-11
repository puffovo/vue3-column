import axios, { AxiosResponse } from 'axios'
// import exp from 'constants'
import { PostProps } from '../src/testData'

interface myData{
  data: string,
  code?: number,
  username?: string,
  sqlData?:string,
  existStatus?:number
}

export function requestLogin (email: string, password: string): Promise<AxiosResponse<myData>> {
  // axios.post返回的是一个promise对象，可以调用.then和.catch方法
  // 接收到的响应式myData类型
  return axios.post('user/login', { email, password })
}

export function requestUser (): Promise<AxiosResponse<myData>> {
  return axios.post('user/current')
}
// 注册
export function registerUser (email:string, password:string, username:string): Promise<AxiosResponse<myData>> {
  return axios.post('user/register', { email, password, username })
}

// 验证邮箱是否注册
export function registerAlready (email:string) :Promise<AxiosResponse<myData>> {
  return axios.post('user/validate', { email })
}

// 专栏列表
export function requestColumn (): Promise<AxiosResponse<myData>> {
  return axios.post('column/list')
}
// 获取指定id专栏
export function requestColumnItem (id: number): Promise<AxiosResponse<myData>> {
  return axios.get(`column/detail?id=${id}`)
}
// 文章列表
export function requestPost (): Promise<AxiosResponse<myData>> {
  return axios.get('post/list')
}
// 获取图片
export function requestIcon () :Promise<AxiosResponse<myData>> {
  return axios.get('post/getimg')
}
// 创建文章
export function requestCreatePost (item: PostProps): Promise<AxiosResponse<myData>> {
  return axios.post('post/create', { ...item })
}
// 删除文章
export function requestDeletePost (id: string): Promise<AxiosResponse<myData>> {
  return axios.post('post/delete', { id })
}
