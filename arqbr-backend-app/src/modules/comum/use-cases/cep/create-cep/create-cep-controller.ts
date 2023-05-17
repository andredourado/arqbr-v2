import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCepUseCase } from './create-cep-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      codigoCep,
      logradouro,
      estadoId,
      cidadeId,
      bairro
    } = request.body

    const createCepUseCase = container.resolve(CreateCepUseCase)

    const result = await createCepUseCase.execute({
        codigoCep,
        logradouro,
        estadoId,
        cidadeId,
        bairro
      })
      .then(cepResult => {
        return cepResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCepController }
