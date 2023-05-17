import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateDepartamentoUseCase } from './create-departamento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      nome,
      desabilitado
    } = request.body

    const createDepartamentoUseCase = container.resolve(CreateDepartamentoUseCase)

    const result = await createDepartamentoUseCase.execute({
        clienteId,
        nome,
        desabilitado
      })
      .then(departamentoResult => {
        return departamentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateDepartamentoController }
