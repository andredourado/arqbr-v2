import { Router } from 'express'
import { CreateServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/create-servico-contratado/create-servico-contratado-controller'
import { ListServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/list-servico-contratado/list-servico-contratado-controller'
import { CountServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/count-servico-contratado/count-servico-contratado-controller'
import { SelectServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/select-servico-contratado/select-servico-contratado-controller'
import { IdSelectServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/id-select-servico-contratado/id-select-servico-contratado-controller'
import { GetServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/get-servico-contratado/get-servico-contratado-controller'
import { UpdateServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/update-servico-contratado/update-servico-contratado-controller'
import { DeleteServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/delete-servico-contratado/delete-servico-contratado-controller'
import { MultiDeleteServicoContratadoController } from '@modules/clientes/use-cases/servico-contratado/multi-delete-servico-contratado/multi-delete-servico-contratado-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const servicosContratadosRoutes = Router()

const createServicoContratadoController = new CreateServicoContratadoController()
const listServicoContratadoController = new ListServicoContratadoController()
const countServicoContratadoController = new CountServicoContratadoController()
const selectServicoContratadoController = new SelectServicoContratadoController()
const idSelectServicoContratadoController = new IdSelectServicoContratadoController()
const getServicoContratadoController = new GetServicoContratadoController()
const updateServicoContratadoController = new UpdateServicoContratadoController()
const deleteServicoContratadoController = new DeleteServicoContratadoController()
const multiDeleteServicoContratadoController = new MultiDeleteServicoContratadoController()

servicosContratadosRoutes.post('/', ensureAuthenticated, createServicoContratadoController.handle )
servicosContratadosRoutes.post('/list', ensureAuthenticated, listServicoContratadoController.handle)
servicosContratadosRoutes.post('/count', ensureAuthenticated, countServicoContratadoController.handle)
servicosContratadosRoutes.get('/select/:id', ensureAuthenticated, idSelectServicoContratadoController.handle)
servicosContratadosRoutes.get('/select', ensureAuthenticated, selectServicoContratadoController.handle)
servicosContratadosRoutes.get('/:id', ensureAuthenticated, getServicoContratadoController.handle)
servicosContratadosRoutes.put('/:id', ensureAuthenticated, updateServicoContratadoController.handle)
servicosContratadosRoutes.delete('/:id', ensureAuthenticated, deleteServicoContratadoController.handle)
servicosContratadosRoutes.delete('/', ensureAuthenticated, multiDeleteServicoContratadoController.handle)

export { servicosContratadosRoutes }
