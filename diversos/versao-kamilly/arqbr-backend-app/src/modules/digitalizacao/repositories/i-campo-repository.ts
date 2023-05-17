import { ICampoDTO } from '@modules/digitalizacao/dtos/i-campo-dto'
import { HttpResponse } from '@shared/helpers'

interface Data {
  versaoDocumentoId: string
  campos: ICampoDTO[]
}

interface ICampoRepository {
  // create
  create ({ versaoDocumentoId, campos }: Data): Promise<HttpResponse> 

  // delete
  // delete (id: string): Promise<HttpResponse>
  
  // multi delete
  delete (id: string): Promise<HttpResponse>
}

export { ICampoRepository }
