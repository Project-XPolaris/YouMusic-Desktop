export interface ListResponseContainer<T> {
  count: number
  data:T[]
}
export interface BaseResponse {
  success: boolean
}
