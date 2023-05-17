import { Router } from 'express'
import { CreateStatusController } from '@modules/comum/use-cases/status/create-status/create-status-controller'
import { ListStatusController } from '@modules/comum/use-cases/status/list-status/list-status-controller'
import { CountStatusController } from '@modules/comum/use-cases/status/count-status/count-status-controller'
import { SelectStatusController } from '@modules/comum/use-cases/status/select-status/select-status-controller'
import { IdSelectStatusController } from '@modules/comum/use-cases/status/id-select-status/id-select-status-controller'
import { GetStatusController } from '@modules/comum/use-cases/status/get-status/get-status-controller'
import { UpdateStatusController } from '@modules/comum/use-cases/status/update-status/update-status-controller'
import { DeleteStatusController } from '@modules/comum/use-cases/status/delete-status/delete-status-controller'
import { MultiDeleteStatusController } from '@modules/comum/use-cases/status/multi-delete-status/multi-delete-status-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const statusesRoutes = Router()

const createStatusController = new CreateStatusController()
const listStatusController = new ListStatusController()
const countStatusController = new CountStatusController()
const selectStatusController = new SelectStatusController()
const idSelectStatusController = new IdSelectStatusController()
const getStatusController = new GetStatusController()
const updateStatusController = new UpdateStatusController()
const deleteStatusController = new DeleteStatusController()
const multiDeleteStatusController = new MultiDeleteStatusController()

statusesRoutes.post('/', ensureAuthenticated, createStatusController.handle )
statusesRoutes.get('/', ensureAuthenticated, listStatusController.handle)
statusesRoutes.post('/count', ensureAuthenticated, countStatusController.handle)
statusesRoutes.get('/select/:id', ensureAuthenticated, idSelectStatusController.handle)
statusesRoutes.get('/select', ensureAuthenticated, selectStatusController.handle)
statusesRoutes.get('/:id', ensureAuthenticated, getStatusController.handle)
statusesRoutes.put('/:id', ensureAuthenticated, updateStatusController.handle)
statusesRoutes.delete('/:id', ensureAuthenticated, deleteStatusController.handle)
statusesRoutes.delete('/', ensureAuthenticated, multiDeleteStatusController.handle)

export { statusesRoutes }
