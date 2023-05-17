import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFrequenciaUseCase } from './update-frequencia-use-case'

class UpdateFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      espacoEmDias,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateFrequenciaUseCase = container.resolve(UpdateFrequenciaUseCase)

    const result = await updateFrequenciaUseCase.execute({
        id,
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

export { UpdateFrequenciaController }
