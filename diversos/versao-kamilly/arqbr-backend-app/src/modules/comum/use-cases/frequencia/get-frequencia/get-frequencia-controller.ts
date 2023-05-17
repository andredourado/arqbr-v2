import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetFrequenciaUseCase } from './get-frequencia-use-case'

class GetFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getFrequenciaUseCase = container.resolve(GetFrequenciaUseCase)
    const frequencia = await getFrequenciaUseCase.execute(id)

    return response.status(frequencia.statusCode).json(frequencia.data)
  }
}

export { GetFrequenciaController }
