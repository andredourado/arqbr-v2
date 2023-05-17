import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateEntregadorUseCase } from './create-entregador-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateEntregadorController {
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

    const createEntregadorUseCase = container.resolve(CreateEntregadorUseCase)

    const result = await createEntregadorUseCase.execute({
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

export { CreateEntregadorController }
