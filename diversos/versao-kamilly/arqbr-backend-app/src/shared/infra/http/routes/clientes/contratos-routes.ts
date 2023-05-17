import { Router } from 'express'
import { CreateContratoController } from '@modules/clientes/use-cases/contrato/create-contrato/create-contrato-controller'
import { ListContratoController } from '@modules/clientes/use-cases/contrato/list-contrato/list-contrato-controller'
import { CountContratoController } from '@modules/clientes/use-cases/contrato/count-contrato/count-contrato-controller'
import { SelectContratoController } from '@modules/clientes/use-cases/contrato/select-contrato/select-contrato-controller'
import { IdSelectContratoController } from '@modules/clientes/use-cases/contrato/id-select-contrato/id-select-contrato-controller'
import { GetContratoController } from '@modules/clientes/use-cases/contrato/get-contrato/get-contrato-controller'
import { UpdateContratoController } from '@modules/clientes/use-cases/contrato/update-contrato/update-contrato-controller'
import { DeleteContratoController } from '@modules/clientes/use-cases/contrato/delete-contrato/delete-contrato-controller'
import { MultiDeleteContratoController } from '@modules/clientes/use-cases/contrato/multi-delete-contrato/multi-delete-contrato-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const contratosRoutes = Router()

const createContratoController = new CreateContratoController()
const listContratoController = new ListContratoController()
const countContratoController = new CountContratoController()
const selectContratoController = new SelectContratoController()
const idSelectContratoController = new IdSelectContratoController()
const getContratoController = new GetContratoController()
const updateContratoController = new UpdateContratoController()
const deleteContratoController = new DeleteContratoController()
const multiDeleteContratoController = new MultiDeleteContratoController()

contratosRoutes.post('/', ensureAuthenticated, createContratoController.handle )
contratosRoutes.get('/', ensureAuthenticated, listContratoController.handle)
contratosRoutes.post('/count', ensureAuthenticated, countContratoController.handle)
contratosRoutes.get('/select/:id', ensureAuthenticated, idSelectContratoController.handle)
contratosRoutes.get('/select', ensureAuthenticated, selectContratoController.handle)
contratosRoutes.get('/:id', ensureAuthenticated, getContratoController.handle)
contratosRoutes.put('/:id', ensureAuthenticated, updateContratoController.handle)
contratosRoutes.delete('/:id', ensureAuthenticated, deleteContratoController.handle)
contratosRoutes.delete('/', ensureAuthenticated, multiDeleteContratoController.handle)

export { contratosRoutes }
