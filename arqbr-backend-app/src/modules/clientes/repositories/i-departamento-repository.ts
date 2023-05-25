import { IDepartamentoDTO } from '@modules/clientes/dtos/i-departamento-dto'
import { HttpResponse } from '@shared/helpers'

interface IDepartamentoRepository {
  // create
  create (data: IDepartamentoDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse>


  // select
  select (filter: string, clienteId: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string, filter: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // get
  getByIdentificador (identificador: string): Promise<HttpResponse>


  // update
  update (data: IDepartamentoDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IDepartamentoRepository }
