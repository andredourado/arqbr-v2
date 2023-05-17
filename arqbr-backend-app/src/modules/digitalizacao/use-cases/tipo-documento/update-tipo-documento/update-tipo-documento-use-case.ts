import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  departamentoId: string
  descricao: string
  identificador: string
  estrategiaQuebra: string
  prazoDescarteAnos: string
  desabilitado: boolean
}

@injectable()
class UpdateTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    id,
    clienteId,
    departamentoId,
    descricao,
    identificador,
    estrategiaQuebra,
    prazoDescarteAnos,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const tipoDocumento = await this.tipoDocumentoRepository.update({
      id,
      clienteId,
      departamentoId,
      descricao,
      identificador,
      estrategiaQuebra,
      prazoDescarteAnos,
      desabilitado
    })

    return tipoDocumento
  }
}

export { UpdateTipoDocumentoUseCase }
