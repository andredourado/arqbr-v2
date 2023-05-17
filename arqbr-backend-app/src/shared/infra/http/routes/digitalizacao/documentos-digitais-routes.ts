import { Router } from 'express'
import { CreateDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/create-documento-digital/create-documento-digital-controller'
import { ListDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/list-documento-digital/list-documento-digital-controller'
import { CountDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/count-documento-digital/count-documento-digital-controller'
import { SelectDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/select-documento-digital/select-documento-digital-controller'
import { IdSelectDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/id-select-documento-digital/id-select-documento-digital-controller'
import { GetDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/get-documento-digital/get-documento-digital-controller'
import { UpdateDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/update-documento-digital/update-documento-digital-controller'
import { DeleteDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/delete-documento-digital/delete-documento-digital-controller'
import { MultiDeleteDocumentoDigitalController } from '@modules/digitalizacao/use-cases/documento-digital/multi-delete-documento-digital/multi-delete-documento-digital-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const documentosDigitaisRoutes = Router()

const createDocumentoDigitalController = new CreateDocumentoDigitalController()
const listDocumentoDigitalController = new ListDocumentoDigitalController()
const countDocumentoDigitalController = new CountDocumentoDigitalController()
const selectDocumentoDigitalController = new SelectDocumentoDigitalController()
const idSelectDocumentoDigitalController = new IdSelectDocumentoDigitalController()
const getDocumentoDigitalController = new GetDocumentoDigitalController()
const updateDocumentoDigitalController = new UpdateDocumentoDigitalController()
const deleteDocumentoDigitalController = new DeleteDocumentoDigitalController()
const multiDeleteDocumentoDigitalController = new MultiDeleteDocumentoDigitalController()

documentosDigitaisRoutes.post('/', ensureAuthenticated, createDocumentoDigitalController.handle )
documentosDigitaisRoutes.post('/list', ensureAuthenticated, listDocumentoDigitalController.handle)
documentosDigitaisRoutes.post('/count', ensureAuthenticated, countDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/select/:id', ensureAuthenticated, idSelectDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/select', ensureAuthenticated, selectDocumentoDigitalController.handle)
documentosDigitaisRoutes.get('/:id', ensureAuthenticated, getDocumentoDigitalController.handle)
documentosDigitaisRoutes.put('/:id', ensureAuthenticated, updateDocumentoDigitalController.handle)
documentosDigitaisRoutes.delete('/:id', ensureAuthenticated, deleteDocumentoDigitalController.handle)
documentosDigitaisRoutes.delete('/', ensureAuthenticated, multiDeleteDocumentoDigitalController.handle)

export { documentosDigitaisRoutes }
