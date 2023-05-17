import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTipoDocumentoUseCase } from './count-tipo-documento-use-case'

class CountTipoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTipoDocumentoUseCase = container.resolve(CountTipoDocumentoUseCase)

    const tiposDocumentoCount = await countTipoDocumentoUseCase.execute({
      search: search as string
    })

    return response.status(tiposDocumentoCount.statusCode).json(tiposDocumentoCount)
  }
}

export { CountTipoDocumentoController }
