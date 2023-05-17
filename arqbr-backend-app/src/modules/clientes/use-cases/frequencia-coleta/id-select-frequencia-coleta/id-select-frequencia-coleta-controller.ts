import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectFrequenciaColetaUseCase } from './id-select-frequencia-coleta-use-case'

class IdSelectFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectFrequenciaColetaUseCase = container.resolve(IdSelectFrequenciaColetaUseCase)

    const frequenciaColeta = await idSelectFrequenciaColetaUseCase.execute({
      id: id as string
    })

    return response.json(frequenciaColeta.data)
  }
}

export { IdSelectFrequenciaColetaController }
