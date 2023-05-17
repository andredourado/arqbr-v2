import { Router } from 'express'
import { CreateUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/create-unidade-sla/create-unidade-sla-controller'
import { ListUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/list-unidade-sla/list-unidade-sla-controller'
import { CountUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/count-unidade-sla/count-unidade-sla-controller'
import { SelectUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/select-unidade-sla/select-unidade-sla-controller'
import { IdSelectUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/id-select-unidade-sla/id-select-unidade-sla-controller'
import { GetUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/get-unidade-sla/get-unidade-sla-controller'
import { UpdateUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/update-unidade-sla/update-unidade-sla-controller'
import { DeleteUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/delete-unidade-sla/delete-unidade-sla-controller'
import { MultiDeleteUnidadeSlaController } from '@modules/comum/use-cases/unidade-sla/multi-delete-unidade-sla/multi-delete-unidade-sla-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const unidadesSlaRoutes = Router()

const createUnidadeSlaController = new CreateUnidadeSlaController()
const listUnidadeSlaController = new ListUnidadeSlaController()
const countUnidadeSlaController = new CountUnidadeSlaController()
const selectUnidadeSlaController = new SelectUnidadeSlaController()
const idSelectUnidadeSlaController = new IdSelectUnidadeSlaController()
const getUnidadeSlaController = new GetUnidadeSlaController()
const updateUnidadeSlaController = new UpdateUnidadeSlaController()
const deleteUnidadeSlaController = new DeleteUnidadeSlaController()
const multiDeleteUnidadeSlaController = new MultiDeleteUnidadeSlaController()

unidadesSlaRoutes.post('/', ensureAuthenticated, createUnidadeSlaController.handle )
unidadesSlaRoutes.get('/', ensureAuthenticated, listUnidadeSlaController.handle)
unidadesSlaRoutes.post('/count', ensureAuthenticated, countUnidadeSlaController.handle)
unidadesSlaRoutes.get('/select/:id', ensureAuthenticated, idSelectUnidadeSlaController.handle)
unidadesSlaRoutes.get('/select', ensureAuthenticated, selectUnidadeSlaController.handle)
unidadesSlaRoutes.get('/:id', ensureAuthenticated, getUnidadeSlaController.handle)
unidadesSlaRoutes.put('/:id', ensureAuthenticated, updateUnidadeSlaController.handle)
unidadesSlaRoutes.delete('/:id', ensureAuthenticated, deleteUnidadeSlaController.handle)
unidadesSlaRoutes.delete('/', ensureAuthenticated, multiDeleteUnidadeSlaController.handle)

export { unidadesSlaRoutes }
