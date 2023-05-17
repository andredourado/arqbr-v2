import { inject, injectable } from 'tsyringe'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { HttpResponse } from '@shared/helpers'
import { ICampoDTO } from '@modules/digitalizacao/dtos/i-campo-dto'
import { ICampoRepository } from '@modules/digitalizacao/repositories/i-campo-repository'

interface IRequest {
  id: string
  clienteId: string
  contratoId: string
  departamentoId: string
  tipoDocumentoId: string
  descricaoVersao: string
  qrcode: string
  campos: ICampoDTO[]
  file: string
  pageQuantity: string
  desabilitado: boolean
}

@injectable()
class UpdateVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository,
    @inject('CampoRepository')
    private campoRepository: ICampoRepository
  ) {}

  async execute({
    id,
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    descricaoVersao,
    qrcode,
    campos,
    file,
    pageQuantity,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const versaoDocumento = await this.versaoDocumentoRepository.update({
      id,
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      descricaoVersao,
      qrcode,
      file,
      pageQuantity,
      desabilitado
    })

    await this.campoRepository.delete(id)
    
    await this.campoRepository.create({
      versaoDocumentoId: id,
      campos
    })

    return versaoDocumento
  }
}

export { UpdateVersaoDocumentoUseCase }
