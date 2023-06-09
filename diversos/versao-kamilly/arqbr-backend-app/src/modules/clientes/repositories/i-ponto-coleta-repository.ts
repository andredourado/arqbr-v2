import { IPontoColetaDTO } from '@modules/clientes/dtos/i-ponto-coleta-dto'
import { HttpResponse } from '@shared/helpers'

interface IPontoColetaRepository {
  // create
  create (data: IPontoColetaDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse>


  // select
  select (filter: string, clienteId: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IPontoColetaDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IPontoColetaRepository }
