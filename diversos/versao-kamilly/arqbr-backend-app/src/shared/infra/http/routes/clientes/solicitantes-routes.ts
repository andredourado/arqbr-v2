import { Router } from 'express'
import { CreateSolicitanteController } from '@modules/clientes/use-cases/solicitante/create-solicitante/create-solicitante-controller'
import { ListSolicitanteController } from '@modules/clientes/use-cases/solicitante/list-solicitante/list-solicitante-controller'
import { CountSolicitanteController } from '@modules/clientes/use-cases/solicitante/count-solicitante/count-solicitante-controller'
import { SelectSolicitanteController } from '@modules/clientes/use-cases/solicitante/select-solicitante/select-solicitante-controller'
import { IdSelectSolicitanteController } from '@modules/clientes/use-cases/solicitante/id-select-solicitante/id-select-solicitante-controller'
import { GetSolicitanteController } from '@modules/clientes/use-cases/solicitante/get-solicitante/get-solicitante-controller'
import { UpdateSolicitanteController } from '@modules/clientes/use-cases/solicitante/update-solicitante/update-solicitante-controller'
import { DeleteSolicitanteController } from '@modules/clientes/use-cases/solicitante/delete-solicitante/delete-solicitante-controller'
import { MultiDeleteSolicitanteController } from '@modules/clientes/use-cases/solicitante/multi-delete-solicitante/multi-delete-solicitante-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const solicitantesRoutes = Router()

const createSolicitanteController = new CreateSolicitanteController()
const listSolicitanteController = new ListSolicitanteController()
const countSolicitanteController = new CountSolicitanteController()
const selectSolicitanteController = new SelectSolicitanteController()
const idSelectSolicitanteController = new IdSelectSolicitanteController()
const getSolicitanteController = new GetSolicitanteController()
const updateSolicitanteController = new UpdateSolicitanteController()
const deleteSolicitanteController = new DeleteSolicitanteController()
const multiDeleteSolicitanteController = new MultiDeleteSolicitanteController()

solicitantesRoutes.post('/', ensureAuthenticated, createSolicitanteController.handle )
solicitantesRoutes.get('/', ensureAuthenticated, listSolicitanteController.handle)
solicitantesRoutes.post('/count', ensureAuthenticated, countSolicitanteController.handle)
solicitantesRoutes.get('/select/:id', ensureAuthenticated, idSelectSolicitanteController.handle)
solicitantesRoutes.get('/select', ensureAuthenticated, selectSolicitanteController.handle)
solicitantesRoutes.get('/:id', ensureAuthenticated, getSolicitanteController.handle)
solicitantesRoutes.put('/:id', ensureAuthenticated, updateSolicitanteController.handle)
solicitantesRoutes.delete('/:id', ensureAuthenticated, deleteSolicitanteController.handle)
solicitantesRoutes.delete('/', ensureAuthenticated, multiDeleteSolicitanteController.handle)

export { solicitantesRoutes }
