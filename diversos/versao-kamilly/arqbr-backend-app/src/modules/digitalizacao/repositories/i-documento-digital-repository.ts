import { IDocumentoDigitalDTO } from '@modules/digitalizacao/dtos/i-documento-digital-dto'
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
  update (data: IDocumentoDigitalDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IDocumentoDigitalRepository }
