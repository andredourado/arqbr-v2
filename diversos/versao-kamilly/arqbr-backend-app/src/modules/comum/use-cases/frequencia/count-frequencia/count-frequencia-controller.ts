import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountFrequenciaUseCase } from './count-frequencia-use-case'

class CountFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countFrequenciaUseCase = container.resolve(CountFrequenciaUseCase)

    const frequenciasCount = await countFrequenciaUseCase.execute({
      search: search as string
    })

    return response.status(frequenciasCount.statusCode).json(frequenciasCount)
  }
}

export { CountFrequenciaController }
