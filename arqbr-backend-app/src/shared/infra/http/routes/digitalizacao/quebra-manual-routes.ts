import { Router } from 'express'
import { CreateDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/create-documento-digital-campo/create-documento-digital-campo-controller'
import { ListDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/list-documento-digital-campo/list-documento-digital-campo-controller'
import { CountDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/count-documento-digital-campo/count-documento-digital-campo-controller'
import { SelectDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/select-documento-digital-campo/select-documento-digital-campo-controller'
import { IdSelectDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/id-select-documento-digital-campo/id-select-documento-digital-campo-controller'
import { GetDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/get-documento-digital-campo/get-documento-digital-campo-controller'
import { UpdateDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/update-documento-digital-campo/update-documento-digital-campo-controller'
import { DeleteDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/delete-documento-digital-campo/delete-documento-digital-campo-controller'
import { MultiDeleteDocumentoDigitalCampoController } from '@modules/digitalizacao/use-cases/documento-digital-campo/multi-delete-documento-digital-campo/multi-delete-documento-digital-campo-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const quebraManualRoutes = Router()

const createDocumentoDigitalCampoController = new CreateDocumentoDigitalCampoController()
const listDocumentoDigitalCampoController = new ListDocumentoDigitalCampoController()
const countDocumentoDigitalCampoController = new CountDocumentoDigitalCampoController()
const selectDocumentoDigitalCampoController = new SelectDocumentoDigitalCampoController()
const idSelectDocumentoDigitalCampoController = new IdSelectDocumentoDigitalCampoController()
const getDocumentoDigitalCampoController = new GetDocumentoDigitalCampoController()
const updateDocumentoDigitalCampoController = new UpdateDocumentoDigitalCampoController()
const deleteDocumentoDigitalCampoController = new DeleteDocumentoDigitalCampoController()
const multiDeleteDocumentoDigitalCampoController = new MultiDeleteDocumentoDigitalCampoController()

quebraManualRoutes.post('/', ensureAuthenticated, createDocumentoDigitalCampoController.handle )
quebraManualRoutes.post('/list', ensureAuthenticated, listDocumentoDigitalCampoController.handle)
quebraManualRoutes.post('/count', ensureAuthenticated, countDocumentoDigitalCampoController.handle)
quebraManualRoutes.get('/select/:id', ensureAuthenticated, idSelectDocumentoDigitalCampoController.handle)
quebraManualRoutes.get('/select', ensureAuthenticated, selectDocumentoDigitalCampoController.handle)
quebraManualRoutes.get('/:id', ensureAuthenticated, getDocumentoDigitalCampoController.handle)
quebraManualRoutes.put('/:id', ensureAuthenticated, updateDocumentoDigitalCampoController.handle)
quebraManualRoutes.delete('/:id', ensureAuthenticated, deleteDocumentoDigitalCampoController.handle)
quebraManualRoutes.delete('/', ensureAuthenticated, multiDeleteDocumentoDigitalCampoController.handle)

export { quebraManualRoutes }