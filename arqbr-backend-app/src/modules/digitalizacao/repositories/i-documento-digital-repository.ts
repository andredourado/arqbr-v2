import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { IDocumentoDigitalDTO, ISolicitacao } from '@modules/digitalizacao/dtos/i-documento-digital-dto'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { HttpResponse } from '@shared/helpers'

interface IDocumentoDigitalRepository {
  // create
  create (data: IDocumentoDigitalDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: any,
    tipoDocumentoId: string,
    user: User,
    solicitante: Solicitante
  ): Promise<HttpResponse>


  // select
  select (filter: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (
    search: string, 
    filter: any,
    tipoDocumentoId: string,
    user: User, 
    solicitante: Solicitante
  ): Promise<HttpResponse>


  // count pages
  countPages (user: User, solicitante: Solicitante): Promise<HttpResponse>


  countProcessing (user: User, solicitante: Solicitante): Promise<HttpResponse>


  // count by tipo documento
  countByTipoDocumento (user: User, solicitante: Solicitante): Promise<HttpResponse>


  // count by departamento
  countByDepartamento (): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // update
  update (data: IDocumentoDigitalDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>

  // get solicitacao
  getDocumentosSolicitados(rowsPerPage: number): Promise<HttpResponse<ISolicitacao[]>>
}

export { IDocumentoDigitalRepository }
