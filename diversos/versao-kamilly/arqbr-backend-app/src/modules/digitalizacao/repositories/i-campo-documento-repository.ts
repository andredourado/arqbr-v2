import { ICampoDocumentoDTO } from '@modules/digitalizacao/dtos/i-campo-documento-dto'
import { HttpResponse } from '@shared/helpers'

interface ICampoDocumentoRepository {
  // create
  create (data: ICampoDocumentoDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: any
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
  update (data: ICampoDocumentoDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { ICampoDocumentoRepository }
