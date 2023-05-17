import { inject, injectable } from 'tsyringe'
import { Documento } from '@modules/classificacao/infra/typeorm/entities/documento'
import { IDocumentoRepository } from '@modules/classificacao/repositories/i-documento-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreateDocumentoUseCase {
  constructor(
    @inject('DocumentoRepository')
    private documentoRepository: IDocumentoRepository
  ) {}

  async execute({
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    nip,
    caixaArqbr,
    conteudoQrCode,
    statusId,
    pessoaId
  }: IRequest): Promise<Documento> {
    const result = await this.documentoRepository.create({
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
      .then(documentoResult => {
        return documentoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateDocumentoUseCase }
