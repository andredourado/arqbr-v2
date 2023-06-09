import { ITipoDocumentoDTO } from '@modules/digitalizacao/dtos/i-tipo-documento-dto'
import { HttpResponse } from '@shared/helpers'

interface ITipoDocumentoRepository {
  // create
  create (data: ITipoDocumentoDTO): Promise<HttpResponse> 


  // list
  list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse>


  // select
  select (filter: string, clienteId: string, departamentoId: string): Promise<HttpResponse>


  // selectFiltered
  selectFiltered (filter: string, clienteId: string, departamentoId: string): Promise<HttpResponse>
  
  
  // id select
  idSelect (id: string): Promise<HttpResponse>


  // count
  count (search: string, filter: string): Promise<HttpResponse>


  // get
  get (id: string): Promise<HttpResponse>


  // get
  getByIdentificador (identificador: string): Promise<HttpResponse>


  // update
  update (data: ITipoDocumentoDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { ITipoDocumentoRepository }
