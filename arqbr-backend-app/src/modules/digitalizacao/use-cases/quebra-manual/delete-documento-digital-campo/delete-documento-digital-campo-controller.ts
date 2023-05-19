import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDocumentoDigitalCampoUseCase } from './delete-documento-digital-campo-use-case'
import { ListDocumentoDigitalCampoUseCase } from '../list-documento-digital-campo/list-documento-digital-campo-use-case'

class DeleteDocumentoDigitalCampoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDocumentoDigitalCampoUseCase = container.resolve(DeleteDocumentoDigitalCampoUseCase)
    await deleteDocumentoDigitalCampoUseCase.execute(id)


    // restore list with updated records

    const listDocumentoDigitalCampoUseCase = container.resolve(ListDocumentoDigitalCampoUseCase)
    const documentosDigitaisCampos = await listDocumentoDigitalCampoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(documentosDigitaisCampos)
  }
}

export { DeleteDocumentoDigitalCampoController }
