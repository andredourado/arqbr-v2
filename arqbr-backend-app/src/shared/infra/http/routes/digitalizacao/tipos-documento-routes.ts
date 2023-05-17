import { Router } from 'express'
import { CreateTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/create-tipo-documento/create-tipo-documento-controller'
import { ListTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/list-tipo-documento/list-tipo-documento-controller'
import { CountTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/count-tipo-documento/count-tipo-documento-controller'
import { SelectTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/select-tipo-documento/select-tipo-documento-controller'
import { IdSelectTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/id-select-tipo-documento/id-select-tipo-documento-controller'
import { GetTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/get-tipo-documento/get-tipo-documento-controller'
import { UpdateTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/update-tipo-documento/update-tipo-documento-controller'
import { DeleteTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/delete-tipo-documento/delete-tipo-documento-controller'
import { MultiDeleteTipoDocumentoController } from '@modules/digitalizacao/use-cases/tipo-documento/multi-delete-tipo-documento/multi-delete-tipo-documento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const tiposDocumentoRoutes = Router()

const createTipoDocumentoController = new CreateTipoDocumentoController()
const listTipoDocumentoController = new ListTipoDocumentoController()
const countTipoDocumentoController = new CountTipoDocumentoController()
const selectTipoDocumentoController = new SelectTipoDocumentoController()
const idSelectTipoDocumentoController = new IdSelectTipoDocumentoController()
const getTipoDocumentoController = new GetTipoDocumentoController()
const updateTipoDocumentoController = new UpdateTipoDocumentoController()
const deleteTipoDocumentoController = new DeleteTipoDocumentoController()
const multiDeleteTipoDocumentoController = new MultiDeleteTipoDocumentoController()

tiposDocumentoRoutes.post('/', ensureAuthenticated, createTipoDocumentoController.handle )
tiposDocumentoRoutes.post('/list', ensureAuthenticated, listTipoDocumentoController.handle)
tiposDocumentoRoutes.post('/count', ensureAuthenticated, countTipoDocumentoController.handle)
tiposDocumentoRoutes.get('/select/:id', ensureAuthenticated, idSelectTipoDocumentoController.handle)
tiposDocumentoRoutes.get('/select', ensureAuthenticated, selectTipoDocumentoController.handle)
tiposDocumentoRoutes.get('/:id', ensureAuthenticated, getTipoDocumentoController.handle)
tiposDocumentoRoutes.put('/:id', ensureAuthenticated, updateTipoDocumentoController.handle)
tiposDocumentoRoutes.delete('/:id', ensureAuthenticated, deleteTipoDocumentoController.handle)
tiposDocumentoRoutes.delete('/', ensureAuthenticated, multiDeleteTipoDocumentoController.handle)

export { tiposDocumentoRoutes }
