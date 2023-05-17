import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountFrequenciaColetaUseCase } from './count-frequencia-coleta-use-case'

class CountFrequenciaColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countFrequenciaColetaUseCase = container.resolve(CountFrequenciaColetaUseCase)

    const frequenciaColetasCount = await countFrequenciaColetaUseCase.execute({
      search: search as string
    })

    return response.status(frequenciaColetasCount.statusCode).json(frequenciaColetasCount)
  }
}

export { CountFrequenciaColetaController }
