import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/clientes/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/clientes/repositories/i-tipo-documento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  clienteId: string
  contratoId: string
  departamentoId: string
  descricao: string
  composicaoLoteId: string
  numeroPaginas: number
  mascaraNomeArquivo: string
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
    contratoId,
    departamentoId,
    descricao,
    composicaoLoteId,
    numeroPaginas,
    mascaraNomeArquivo,
    prazoDescarteAnos,
    desabilitado
  }: IRequest): Promise<TipoDocumento> {
    const result = await this.tipoDocumentoRepository.create({
        clienteId,
        contratoId,
        departamentoId,
        descricao,
        composicaoLoteId,
        numeroPaginas,
        mascaraNomeArquivo,
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
