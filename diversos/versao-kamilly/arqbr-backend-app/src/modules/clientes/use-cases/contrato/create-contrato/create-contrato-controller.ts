import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateContratoUseCase } from './create-contrato-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      identificador,
      aceitaServicosTerceiros,
      desabilitado
    } = request.body

    const createContratoUseCase = container.resolve(CreateContratoUseCase)

    const result = await createContratoUseCase.execute({
        clienteId,
        identificador,
        aceitaServicosTerceiros,
        desabilitado
      })
      .then(contratoResult => {
        return contratoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateContratoController }
