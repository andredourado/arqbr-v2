import { inject, injectable } from 'tsyringe'
import { TipoDocumento } from '@modules/clientes/infra/typeorm/entities/tipo-documento'
import { ITipoDocumentoRepository } from '@modules/clientes/repositories/i-tipo-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
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
class UpdateTipoDocumentoUseCase {
  constructor(
    @inject('TipoDocumentoRepository')
    private tipoDocumentoRepository: ITipoDocumentoRepository
  ) {}

  async execute({
    id,
    clienteId,
    contratoId,
    departamentoId,
    descricao,
    composicaoLoteId,
    numeroPaginas,
    mascaraNomeArquivo,
    prazoDescarteAnos,
    desabilitado
  }: IRequest): Promise<HttpResponse> {
    const tipoDocumento = await this.tipoDocumentoRepository.update({
      id,
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

    return tipoDocumento
  }
}

export { UpdateTipoDocumentoUseCase }
