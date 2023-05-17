import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountSolicitanteUseCase } from './count-solicitante-use-case'

class CountSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countSolicitanteUseCase = container.resolve(CountSolicitanteUseCase)

    const solicitantesCount = await countSolicitanteUseCase.execute({
      search: search as string
    })

    return response.status(solicitantesCount.statusCode).json(solicitantesCount)
  }
}

export { CountSolicitanteController }
