import { inject, injectable } from 'tsyringe'
import { DefinicaoExtracao } from '@modules/digitalizacao/infra/typeorm/entities/definicao-extracao'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'

interface IRequest {
  id: string
  clienteId: string
  departamentoId: string
  tipoDocumentoId: string
  pdf: string
  textoQuebra: string
  nomeCampo: string
  titulo: string
  estrategia: string
  texto: string
  inicio: string
  comprimento: number
}

@injectable()
class UpdateDefinicaoExtracaoUseCase {
  constructor(
    @inject('DefinicaoExtracaoRepository')
    private definicaoExtracaoRepository: IDefinicaoExtracaoRepository
  ) {}

  async execute({
    id,
    clienteId,
    departamentoId,
    tipoDocumentoId,
    pdf,
    textoQuebra,
    nomeCampo,
    titulo,
    estrategia,
    texto,
    inicio,
    comprimento
  }: IRequest): Promise<HttpResponse> {
    const definicaoExtracao = await this.definicaoExtracaoRepository.update({
      id,
      clienteId,
      departamentoId,
      tipoDocumentoId,
      textoQuebra,
      nomeCampo,
      titulo,
      estrategia,
      texto,
      inicio,
      comprimento
    })

    return definicaoExtracao
  }
}

export { UpdateDefinicaoExtracaoUseCase }
