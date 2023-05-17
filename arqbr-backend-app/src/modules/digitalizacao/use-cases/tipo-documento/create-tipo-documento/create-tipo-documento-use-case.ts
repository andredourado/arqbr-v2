import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/digitalizacao/repositories/i-tipo-documento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  departamentoId: string
  descricao: string
  identificador: string
  estrategiaQuebra: string
  prazoDescarteAnos: string
  desabilitado: boolean
}

@injectable()
class CreateTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    clienteId,
    departamentoId,
    descricao,
    identificador,
    estrategiaQuebra,
    prazoDescarteAnos,
    desabilitado
  }: IRequest): Promise<TipoDocumento> {
    const result = await this.tipoDocumentoRepository.create({
        clienteId,
        departamentoId,
        descricao,
        identificador,
        estrategiaQuebra,
        prazoDescarteAnos,
        desabilitado
      })
      .then(tipoDocumentoResult => {
        return tipoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateTipoDocumentoUseCase }
