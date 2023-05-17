import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDepartamentoUseCase } from './update-departamento-use-case'

class UpdateDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      nome,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateDepartamentoUseCase = container.resolve(UpdateDepartamentoUseCase)

    const result = await updateDepartamentoUseCase.execute({
        id,
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

export { UpdateDepartamentoController }
