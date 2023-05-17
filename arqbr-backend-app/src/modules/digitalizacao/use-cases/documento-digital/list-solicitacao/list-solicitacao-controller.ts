import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSolicitacaoUseCase } from './list-solicitacao-use-case'

class ListSolicitacaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log(request.query)
    const { 
      pageSize
    } = request.query

    console.log(request.user)

    const user = request.user

    const listSolicitacaoUseCase = container.resolve(ListSolicitacaoUseCase)

    const documentosDigitais = await listSolicitacaoUseCase.execute({
      rowsPerPage: Number(pageSize) || 5,
      user
    })

    return response.status(documentosDigitais.statusCode).json(documentosDigitais)
  }
}

export { ListSolicitacaoController }
