import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetFrequenciaColetaUseCase } from './get-frequencia-coleta-use-case'

class GetFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getFrequenciaColetaUseCase = container.resolve(GetFrequenciaColetaUseCase)
    const frequenciaColeta = await getFrequenciaColetaUseCase.execute(id)

    return response.status(frequenciaColeta.statusCode).json(frequenciaColeta.data)
  }
}

export { GetFrequenciaColetaController }
