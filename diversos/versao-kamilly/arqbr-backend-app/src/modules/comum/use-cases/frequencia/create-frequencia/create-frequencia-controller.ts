import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFrequenciaUseCase } from './create-frequencia-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      espacoEmDias,
      desabilitado
    } = request.body

    const createFrequenciaUseCase = container.resolve(CreateFrequenciaUseCase)

    const result = await createFrequenciaUseCase.execute({
        descricao,
        espacoEmDias,
        desabilitado
      })
      .then(frequenciaResult => {
        return frequenciaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateFrequenciaController }
