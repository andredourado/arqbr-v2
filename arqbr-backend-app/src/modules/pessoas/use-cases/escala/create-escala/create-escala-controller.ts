import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateEscalaUseCase } from './create-escala-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pessoaId,
      jornadaId,
      desabilitado
    } = request.body

    const createEscalaUseCase = container.resolve(CreateEscalaUseCase)

    const result = await createEscalaUseCase.execute({
        pessoaId,
        jornadaId,
        desabilitado
      })
      .then(escalaResult => {
        return escalaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateEscalaController }
