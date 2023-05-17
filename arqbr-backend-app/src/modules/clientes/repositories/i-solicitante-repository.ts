import { ISolicitanteDTO } from '@modules/clientes/dtos/i-solicitante-dto'
import { HttpResponse } from '@shared/helpers'
import { Solicitante } from '../infra/typeorm/entities/solicitante'

interface ISolicitanteRepository {
  // create
  create (data: ISolicitanteDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse>


  // select
  select (filter: string, departamentoId: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string, filter: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // get by email
  getByEmail (email: string): Promise<Solicitante>


  // update
  update (data: ISolicitanteDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { ISolicitanteRepository }
