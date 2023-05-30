import { inject, injectable } from 'tsyringe'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'
import { HttpResponse, serverError } from '@shared/helpers'
import { ISolicitanteRepository } from '@modules/clientes/repositories/i-solicitante-repository'
import { User } from '@modules/security/infra/typeorm/entities/user'

interface IResponse{
  solicitarFisico: boolean
  dataSolicitacao: Date
  solicitanteId: string
  user: User
}


@injectable()
class SolicitarDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('SolicitanteRepository')
    private solicitanteRepository: ISolicitanteRepository
  ) {}
  
  async execute(ids: string[], dataSolicitacao: Date, user: User): Promise<HttpResponse[]> {
    const result: any[] = []
    for await (const id of ids) {
      const documentoDigital = await this.documentoDigitalRepository.get(id)
      if (documentoDigital.statusCode != 200) {
        result.push(documentoDigital)
        continue
      }
      const solicitante = await this.solicitanteRepository.getByEmail(user.login)
      if (!solicitante) {
        return [serverError(Error('Solicitante não encontrado!'))]
      }
      documentoDigital.data.solicitanteId = solicitante.id
      documentoDigital.data.solicitacaoFisico = !documentoDigital.data.solicitacaoFisico
      documentoDigital.data.dataSolicitacao = dataSolicitacao
      const data = await this.documentoDigitalRepository.update(documentoDigital.data)
      result.push(data)
    }
    return result
  }
}

export { SolicitarDocumentoDigitalUseCase }


