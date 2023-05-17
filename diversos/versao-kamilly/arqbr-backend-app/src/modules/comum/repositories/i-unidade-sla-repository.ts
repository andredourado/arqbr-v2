import { IUnidadeSlaDTO } from '@modules/comum/dtos/i-unidade-sla-dto'
import { HttpResponse } from '@shared/helpers'

interface IUnidadeSlaRepository {
  // create
  create (data: IUnidadeSlaDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse>


  // select
  select (filter: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IUnidadeSlaDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IUnidadeSlaRepository }
