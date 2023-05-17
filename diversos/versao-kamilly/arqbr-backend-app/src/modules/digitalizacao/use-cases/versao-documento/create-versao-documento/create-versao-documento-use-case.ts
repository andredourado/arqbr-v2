import { inject, injectable } from 'tsyringe'
import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { ICampoRepository } from '@modules/digitalizacao/repositories/i-campo-repository'
import { ICampoDTO } from '@modules/digitalizacao/dtos/i-campo-dto'

interface IRequest {
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
class CreateVersaoDocumentoUseCase {
  constructor(
    @inject('VersaoDocumentoRepository')
    private versaoDocumentoRepository: IVersaoDocumentoRepository,
    @inject('CampoRepository')
    private campoRepository: ICampoRepository
  ) {}

  async execute({
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
  }: IRequest): Promise<VersaoDocumento> {
    const result = await this.versaoDocumentoRepository.create({
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
      .then(versaoDocumentoResult => {
        return versaoDocumentoResult
      })
      .catch(error => {
        return error
      })

    await this.campoRepository.create({
      versaoDocumentoId: result.data.id,
      campos
    })

    return result
  }
}

export { CreateVersaoDocumentoUseCase }
