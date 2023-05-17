import { Router } from 'express'
import { CreateServicoController } from '@modules/comum/use-cases/servico/create-servico/create-servico-controller'
import { ListServicoController } from '@modules/comum/use-cases/servico/list-servico/list-servico-controller'
import { CountServicoController } from '@modules/comum/use-cases/servico/count-servico/count-servico-controller'
import { SelectServicoController } from '@modules/comum/use-cases/servico/select-servico/select-servico-controller'
import { IdSelectServicoController } from '@modules/comum/use-cases/servico/id-select-servico/id-select-servico-controller'
import { GetServicoController } from '@modules/comum/use-cases/servico/get-servico/get-servico-controller'
import { UpdateServicoController } from '@modules/comum/use-cases/servico/update-servico/update-servico-controller'
import { DeleteServicoController } from '@modules/comum/use-cases/servico/delete-servico/delete-servico-controller'
import { MultiDeleteServicoController } from '@modules/comum/use-cases/servico/multi-delete-servico/multi-delete-servico-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const servicosRoutes = Router()

const createServicoController = new CreateServicoController()
const listServicoController = new ListServicoController()
const countServicoController = new CountServicoController()
const selectServicoController = new SelectServicoController()
const idSelectServicoController = new IdSelectServicoController()
const getServicoController = new GetServicoController()
const updateServicoController = new UpdateServicoController()
const deleteServicoController = new DeleteServicoController()
const multiDeleteServicoController = new MultiDeleteServicoController()

servicosRoutes.post('/', ensureAuthenticated, createServicoController.handle )
servicosRoutes.get('/', ensureAuthenticated, listServicoController.handle)
servicosRoutes.post('/count', ensureAuthenticated, countServicoController.handle)
servicosRoutes.get('/select/:id', ensureAuthenticated, idSelectServicoController.handle)
servicosRoutes.get('/select', ensureAuthenticated, selectServicoController.handle)
servicosRoutes.get('/:id', ensureAuthenticated, getServicoController.handle)
servicosRoutes.put('/:id', ensureAuthenticated, updateServicoController.handle)
servicosRoutes.delete('/:id', ensureAuthenticated, deleteServicoController.handle)
servicosRoutes.delete('/', ensureAuthenticated, multiDeleteServicoController.handle)

export { servicosRoutes }
