import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectFrequenciaUseCase } from './id-select-frequencia-use-case'

class IdSelectFrequenciaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectFrequenciaUseCase = container.resolve(IdSelectFrequenciaUseCase)

    const frequencia = await idSelectFrequenciaUseCase.execute({
      id: id as string
    })

    return response.json(frequencia.data)
  }
}

export { IdSelectFrequenciaController }
