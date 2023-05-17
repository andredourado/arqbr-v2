import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectEscalaUseCase } from './id-select-escala-use-case'

class IdSelectEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectEscalaUseCase = container.resolve(IdSelectEscalaUseCase)

    const escala = await idSelectEscalaUseCase.execute({
      id: id as string
    })

    return response.json(escala.data)
  }
}

export { IdSelectEscalaController }
