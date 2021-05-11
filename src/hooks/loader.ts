import { useState } from 'react'
import { ListResponseContainer } from '../api/base'

export const useDataPageLoader = <T>({
  loader,
  defaultPage = 1,
  defaultPageSize = 20
}:{
  loader:(param:any) => Promise<ListResponseContainer<T>>,
  defaultPage:number,
  defaultPageSize : number
}) => {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState<number>(defaultPage)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize)
  const [total, setTotal] = useState<number>(0)
  const loadData = async ({ page = defaultPage, pageSize = defaultPageSize, extraParams }:any):Promise<void> => {
    const response = await loader({ page, pageSize, ...extraParams })
    setPage(page)
    setPageSize(pageSize)
    setData(response.data)
    setTotal(response.count)
  }
  return {
    data,
    page,
    pageSize,
    total,
    loadData
  }
}
