import { IFrequenciaColetaDTO } from '@modules/clientes/dtos/i-frequencia-coleta-dto'
import { HttpResponse } from '@shared/helpers'

interface IFrequenciaColetaRepository {
  // create
  create (data: IFrequenciaColetaDTO): Promise<HttpResponse> 


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
  update (data: IFrequenciaColetaDTO): Promise<HttpResponse>


  // delete
  delete (id: string): Promise<HttpResponse>

  
  // multi delete
  multiDelete (ids: string[]): Promise<HttpResponse>
}

export { IFrequenciaColetaRepository }
