import { Router } from 'express'
import { CreateClienteController } from '@modules/clientes/use-cases/cliente/create-cliente/create-cliente-controller'
import { ListClienteController } from '@modules/clientes/use-cases/cliente/list-cliente/list-cliente-controller'
import { CountClienteController } from '@modules/clientes/use-cases/cliente/count-cliente/count-cliente-controller'
import { SelectClienteController } from '@modules/clientes/use-cases/cliente/select-cliente/select-cliente-controller'
import { IdSelectClienteController } from '@modules/clientes/use-cases/cliente/id-select-cliente/id-select-cliente-controller'
import { GetClienteController } from '@modules/clientes/use-cases/cliente/get-cliente/get-cliente-controller'
import { UpdateClienteController } from '@modules/clientes/use-cases/cliente/update-cliente/update-cliente-controller'
import { DeleteClienteController } from '@modules/clientes/use-cases/cliente/delete-cliente/delete-cliente-controller'
import { MultiDeleteClienteController } from '@modules/clientes/use-cases/cliente/multi-delete-cliente/multi-delete-cliente-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const clientesRoutes = Router()

const createClienteController = new CreateClienteController()
const listClienteController = new ListClienteController()
const countClienteController = new CountClienteController()
const selectClienteController = new SelectClienteController()
const idSelectClienteController = new IdSelectClienteController()
const getClienteController = new GetClienteController()
const updateClienteController = new UpdateClienteController()
const deleteClienteController = new DeleteClienteController()
const multiDeleteClienteController = new MultiDeleteClienteController()

clientesRoutes.post('/', ensureAuthenticated, createClienteController.handle )
clientesRoutes.post('/list', ensureAuthenticated, listClienteController.handle)
clientesRoutes.post('/count', ensureAuthenticated, countClienteController.handle)
clientesRoutes.get('/select/:id', ensureAuthenticated, idSelectClienteController.handle)
clientesRoutes.get('/select', ensureAuthenticated, selectClienteController.handle)
clientesRoutes.get('/:id', ensureAuthenticated, getClienteController.handle)
clientesRoutes.put('/:id', ensureAuthenticated, updateClienteController.handle)
clientesRoutes.delete('/:id', ensureAuthenticated, deleteClienteController.handle)
clientesRoutes.delete('/', ensureAuthenticated, multiDeleteClienteController.handle)

export { clientesRoutes }
