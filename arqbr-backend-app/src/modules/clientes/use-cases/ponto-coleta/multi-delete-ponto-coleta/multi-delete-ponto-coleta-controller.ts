import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePontoColetaUseCase } from './multi-delete-ponto-coleta-use-case'
import { ListPontoColetaUseCase } from '../list-ponto-coleta/list-ponto-coleta-use-case'

class MultiDeletePontoColetaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePontoColetaUseCase = container.resolve(MultiDeletePontoColetaUseCase)
    await multiDeletePontoColetaUseCase.execute(ids)


    // restore list with updated records

    const listPontoColetaUseCase = container.resolve(ListPontoColetaUseCase)
    const pontosColeta = await listPontoColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(pontosColeta)
  }
}

export { MultiDeletePontoColetaController }
