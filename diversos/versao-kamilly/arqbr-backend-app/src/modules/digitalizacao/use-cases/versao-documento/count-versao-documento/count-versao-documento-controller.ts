import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountVersaoDocumentoUseCase } from './count-versao-documento-use-case'

class CountVersaoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countVersaoDocumentoUseCase = container.resolve(CountVersaoDocumentoUseCase)

    const versoesDocumentoCount = await countVersaoDocumentoUseCase.execute({
      search: search as string
    })

    return response.status(versoesDocumentoCount.statusCode).json(versoesDocumentoCount)
  }
}

export { CountVersaoDocumentoController }
