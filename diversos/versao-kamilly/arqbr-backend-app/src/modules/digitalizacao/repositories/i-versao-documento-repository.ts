import { IVersaoDocumentoDTO } from '@modules/digitalizacao/dtos/i-versao-documento-dto'
import { HttpResponse } from '@shared/helpers'

interface IVersaoDocumentoRepository {
  // create
  create (data: IVersaoDocumentoDTO): Promise<HttpResponse> 


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
  update (data: IVersaoDocumentoDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IVersaoDocumentoRepository }
