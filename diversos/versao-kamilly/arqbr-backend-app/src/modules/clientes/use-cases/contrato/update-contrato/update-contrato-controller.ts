import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateContratoUseCase } from './update-contrato-use-case'

class UpdateContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      identificador,
      aceitaServicosTerceiros,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateContratoUseCase = container.resolve(UpdateContratoUseCase)

    const result = await updateContratoUseCase.execute({
        id,
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

export { UpdateContratoController }
