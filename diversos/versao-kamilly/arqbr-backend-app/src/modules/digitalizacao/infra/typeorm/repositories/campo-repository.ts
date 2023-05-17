import { getRepository, Repository } from 'typeorm'
import { ICampoDTO } from '@modules/digitalizacao/dtos/i-campo-dto'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'
import { ICampoRepository } from '@modules/digitalizacao/repositories/i-campo-repository'
import { Campo } from '../entities/campo'

interface ICampos {
  versaoDocumentoId: string
  campos: ICampoDTO[]
}

class CampoRepository implements ICampoRepository {
  private repository: Repository<Campo>

  constructor() {
    this.repository = getRepository(Campo)
  }


  // create
  async create ({
    versaoDocumentoId,
    campos
  }: ICampos): Promise<HttpResponse> {
    try {
      for await (let campo of campos) {
        const newCampo = this.repository.create({
          versaoDocumentoId,
          page: campo.page,
          name: campo.name, 
          startX: campo.startX, 
          startY: campo.startY,
          endX: campo.endX,
          endY: campo.endY,
          linha: campo.linha,
          coluna: campo.coluna,
          resultadoEsperado: campo.resultadoEsperado,
          complemento: campo.complemento,
          mascara: campo.mascara,
          comprimento: campo.comprimento,
          ocorrencia: campo.ocorrencia,
          referencia: campo.referencia,
          localizacao: campo.localizacao
        })
            
        await this.repository.save(newCampo)
          .catch(error => {
            return serverError(error.message)
          })
      }

      return
    } catch (error) {
      return serverError(error.message)
    }
  }

  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete({
        versaoDocumentoId: id
      })

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { CampoRepository }
