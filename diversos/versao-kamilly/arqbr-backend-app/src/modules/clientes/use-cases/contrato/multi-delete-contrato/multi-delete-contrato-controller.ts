import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteContratoUseCase } from './multi-delete-contrato-use-case'
import { ListContratoUseCase } from '../list-contrato/list-contrato-use-case'

class MultiDeleteContratoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteContratoUseCase = container.resolve(MultiDeleteContratoUseCase)
    await multiDeleteContratoUseCase.execute(ids)


    // restore list with updated records

    const listContratoUseCase = container.resolve(ListContratoUseCase)
    const contratos = await listContratoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(contratos)
  }
}

export { MultiDeleteContratoController }
