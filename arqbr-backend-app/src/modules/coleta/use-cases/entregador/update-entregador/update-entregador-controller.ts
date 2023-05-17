import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateEntregadorUseCase } from './update-entregador-use-case'

class UpdateEntregadorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      cpfCnpj,
      nome,
      email,
      endereco,
      numero,
      complemento,
      cep,
      telefonesFixos,
      celular,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateEntregadorUseCase = container.resolve(UpdateEntregadorUseCase)

    const result = await updateEntregadorUseCase.execute({
        id,
        cpfCnpj,
        nome,
        email,
        endereco,
        numero,
        complemento,
        cep,
        telefonesFixos,
        celular,
        desabilitado
      })
      .then(entregadorResult => {
        return entregadorResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateEntregadorController }
