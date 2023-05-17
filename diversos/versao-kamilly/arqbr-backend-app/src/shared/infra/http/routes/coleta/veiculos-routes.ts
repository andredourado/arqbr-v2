import { Router } from 'express'
import { CreateVeiculoController } from '@modules/coleta/use-cases/veiculo/create-veiculo/create-veiculo-controller'
import { ListVeiculoController } from '@modules/coleta/use-cases/veiculo/list-veiculo/list-veiculo-controller'
import { CountVeiculoController } from '@modules/coleta/use-cases/veiculo/count-veiculo/count-veiculo-controller'
import { SelectVeiculoController } from '@modules/coleta/use-cases/veiculo/select-veiculo/select-veiculo-controller'
import { IdSelectVeiculoController } from '@modules/coleta/use-cases/veiculo/id-select-veiculo/id-select-veiculo-controller'
import { GetVeiculoController } from '@modules/coleta/use-cases/veiculo/get-veiculo/get-veiculo-controller'
import { UpdateVeiculoController } from '@modules/coleta/use-cases/veiculo/update-veiculo/update-veiculo-controller'
import { DeleteVeiculoController } from '@modules/coleta/use-cases/veiculo/delete-veiculo/delete-veiculo-controller'
import { MultiDeleteVeiculoController } from '@modules/coleta/use-cases/veiculo/multi-delete-veiculo/multi-delete-veiculo-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const veiculosRoutes = Router()

const createVeiculoController = new CreateVeiculoController()
const listVeiculoController = new ListVeiculoController()
const countVeiculoController = new CountVeiculoController()
const selectVeiculoController = new SelectVeiculoController()
const idSelectVeiculoController = new IdSelectVeiculoController()
const getVeiculoController = new GetVeiculoController()
const updateVeiculoController = new UpdateVeiculoController()
const deleteVeiculoController = new DeleteVeiculoController()
const multiDeleteVeiculoController = new MultiDeleteVeiculoController()

veiculosRoutes.post('/', ensureAuthenticated, createVeiculoController.handle )
veiculosRoutes.get('/', ensureAuthenticated, listVeiculoController.handle)
veiculosRoutes.post('/count', ensureAuthenticated, countVeiculoController.handle)
veiculosRoutes.get('/select/:id', ensureAuthenticated, idSelectVeiculoController.handle)
veiculosRoutes.get('/select', ensureAuthenticated, selectVeiculoController.handle)
veiculosRoutes.get('/:id', ensureAuthenticated, getVeiculoController.handle)
veiculosRoutes.put('/:id', ensureAuthenticated, updateVeiculoController.handle)
veiculosRoutes.delete('/:id', ensureAuthenticated, deleteVeiculoController.handle)
veiculosRoutes.delete('/', ensureAuthenticated, multiDeleteVeiculoController.handle)

export { veiculosRoutes }
