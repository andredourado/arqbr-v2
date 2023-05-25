import { Router } from 'express'
import { CreateDepartamentoController } from '@modules/clientes/use-cases/departamento/create-departamento/create-departamento-controller'
import { ListDepartamentoController } from '@modules/clientes/use-cases/departamento/list-departamento/list-departamento-controller'
import { CountDepartamentoController } from '@modules/clientes/use-cases/departamento/count-departamento/count-departamento-controller'
import { SelectDepartamentoController } from '@modules/clientes/use-cases/departamento/select-departamento/select-departamento-controller'
import { IdSelectDepartamentoController } from '@modules/clientes/use-cases/departamento/id-select-departamento/id-select-departamento-controller'
import { GetDepartamentoController } from '@modules/clientes/use-cases/departamento/get-departamento/get-departamento-controller'
import { GetDepartamentoByIdentificadorController } from '@modules/clientes/use-cases/departamento/get-departamento-by-identificador/get-departamento-by-identificador-controller'
import { UpdateDepartamentoController } from '@modules/clientes/use-cases/departamento/update-departamento/update-departamento-controller'
import { DeleteDepartamentoController } from '@modules/clientes/use-cases/departamento/delete-departamento/delete-departamento-controller'
import { MultiDeleteDepartamentoController } from '@modules/clientes/use-cases/departamento/multi-delete-departamento/multi-delete-departamento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const departamentosRoutes = Router()

const createDepartamentoController = new CreateDepartamentoController()
const listDepartamentoController = new ListDepartamentoController()
const countDepartamentoController = new CountDepartamentoController()
const selectDepartamentoController = new SelectDepartamentoController()
const idSelectDepartamentoController = new IdSelectDepartamentoController()
const getDepartamentoController = new GetDepartamentoController()
const getDepartamentoByIdentificadorController = new GetDepartamentoByIdentificadorController()
const updateDepartamentoController = new UpdateDepartamentoController()
const deleteDepartamentoController = new DeleteDepartamentoController()
const multiDeleteDepartamentoController = new MultiDeleteDepartamentoController()

departamentosRoutes.post('/', ensureAuthenticated, createDepartamentoController.handle )
departamentosRoutes.post('/list', ensureAuthenticated, listDepartamentoController.handle)
departamentosRoutes.post('/count', ensureAuthenticated, countDepartamentoController.handle)
departamentosRoutes.get('/select/:id', ensureAuthenticated, idSelectDepartamentoController.handle)
departamentosRoutes.get('/select', ensureAuthenticated, selectDepartamentoController.handle)
departamentosRoutes.get('/:id', ensureAuthenticated, getDepartamentoController.handle)
departamentosRoutes.get('/identificador/:identificador', ensureAuthenticated, getDepartamentoByIdentificadorController.handle)
departamentosRoutes.put('/:id', ensureAuthenticated, updateDepartamentoController.handle)
departamentosRoutes.delete('/:id', ensureAuthenticated, deleteDepartamentoController.handle)
departamentosRoutes.delete('/', ensureAuthenticated, multiDeleteDepartamentoController.handle)

export { departamentosRoutes }
