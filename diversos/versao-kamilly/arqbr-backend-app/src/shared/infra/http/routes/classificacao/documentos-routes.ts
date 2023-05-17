import { Router } from 'express'
import { CreateDocumentoController } from '@modules/classificacao/use-cases/documento/create-documento/create-documento-controller'
import { ListDocumentoController } from '@modules/classificacao/use-cases/documento/list-documento/list-documento-controller'
import { CountDocumentoController } from '@modules/classificacao/use-cases/documento/count-documento/count-documento-controller'
import { SelectDocumentoController } from '@modules/classificacao/use-cases/documento/select-documento/select-documento-controller'
import { IdSelectDocumentoController } from '@modules/classificacao/use-cases/documento/id-select-documento/id-select-documento-controller'
import { GetDocumentoController } from '@modules/classificacao/use-cases/documento/get-documento/get-documento-controller'
import { UpdateDocumentoController } from '@modules/classificacao/use-cases/documento/update-documento/update-documento-controller'
import { DeleteDocumentoController } from '@modules/classificacao/use-cases/documento/delete-documento/delete-documento-controller'
import { MultiDeleteDocumentoController } from '@modules/classificacao/use-cases/documento/multi-delete-documento/multi-delete-documento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const documentosRoutes = Router()

const createDocumentoController = new CreateDocumentoController()
const listDocumentoController = new ListDocumentoController()
const countDocumentoController = new CountDocumentoController()
const selectDocumentoController = new SelectDocumentoController()
const idSelectDocumentoController = new IdSelectDocumentoController()
const getDocumentoController = new GetDocumentoController()
const updateDocumentoController = new UpdateDocumentoController()
const deleteDocumentoController = new DeleteDocumentoController()
const multiDeleteDocumentoController = new MultiDeleteDocumentoController()

documentosRoutes.post('/', ensureAuthenticated, createDocumentoController.handle )
documentosRoutes.get('/', ensureAuthenticated, listDocumentoController.handle)
documentosRoutes.post('/count', ensureAuthenticated, countDocumentoController.handle)
documentosRoutes.get('/select/:id', ensureAuthenticated, idSelectDocumentoController.handle)
documentosRoutes.get('/select', ensureAuthenticated, selectDocumentoController.handle)
documentosRoutes.get('/:id', ensureAuthenticated, getDocumentoController.handle)
documentosRoutes.put('/:id', ensureAuthenticated, updateDocumentoController.handle)
documentosRoutes.delete('/:id', ensureAuthenticated, deleteDocumentoController.handle)
documentosRoutes.delete('/', ensureAuthenticated, multiDeleteDocumentoController.handle)

export { documentosRoutes }
