import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDefinicaoExtracaoUseCase } from './create-definicao-extracao-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateDefinicaoExtracaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      tipoDocumentoId,
      pdf,
      textos
    } = request.body

    const createDefinicaoExtracaoUseCase = container.resolve(CreateDefinicaoExtracaoUseCase)

    const result = await createDefinicaoExtracaoUseCase.execute({
        clienteId,
        departamentoId,
        tipoDocumentoId,
        pdf,
        textos
      })
      .then(definicaoExtracaoResult => {
        return definicaoExtracaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateDefinicaoExtracaoController }
