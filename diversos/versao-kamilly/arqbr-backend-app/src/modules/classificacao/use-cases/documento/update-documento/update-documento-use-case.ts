import { inject, injectable } from 'tsyringe'
import { Documento } from '@modules/classificacao/infra/typeorm/entities/documento'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  clienteId: string
  contratoId: string
  departamentoId: string
  tipoDocumentoId: string
  nip: string
  caixaArqbr: string
  conteudoQrCode: string
  statusId: string
  pessoaId: string
}

@injectable()
class UpdateDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute({
    id,
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    nip,
    caixaArqbr,
    conteudoQrCode,
    statusId,
    pessoaId
  }: IRequest): Promise<HttpResponse> {
    const documento = await this.documentoRepository.update({
      id,
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      nip,
      caixaArqbr,
      conteudoQrCode,
      statusId,
      pessoaId
    })

    return documento
  }
}

export { UpdateDocumentoUseCase }
