import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCampoDocumentoUseCase } from './count-campo-documento-use-case'

class CountCampoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCampoDocumentoUseCase = container.resolve(CountCampoDocumentoUseCase)

    const camposDocumentoCount = await countCampoDocumentoUseCase.execute({
      search: search as string
    })

    return response.status(camposDocumentoCount.statusCode).json(camposDocumentoCount)
  }
}

export { CountCampoDocumentoController }
