import { Router } from 'express'
import { CreateUnidadeController } from '@modules/armazenamento/use-cases/unidade/create-unidade/create-unidade-controller'
import { ListUnidadeController } from '@modules/armazenamento/use-cases/unidade/list-unidade/list-unidade-controller'
import { CountUnidadeController } from '@modules/armazenamento/use-cases/unidade/count-unidade/count-unidade-controller'
import { SelectUnidadeController } from '@modules/armazenamento/use-cases/unidade/select-unidade/select-unidade-controller'
import { IdSelectUnidadeController } from '@modules/armazenamento/use-cases/unidade/id-select-unidade/id-select-unidade-controller'
import { GetUnidadeController } from '@modules/armazenamento/use-cases/unidade/get-unidade/get-unidade-controller'
import { UpdateUnidadeController } from '@modules/armazenamento/use-cases/unidade/update-unidade/update-unidade-controller'
import { DeleteUnidadeController } from '@modules/armazenamento/use-cases/unidade/delete-unidade/delete-unidade-controller'
import { MultiDeleteUnidadeController } from '@modules/armazenamento/use-cases/unidade/multi-delete-unidade/multi-delete-unidade-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const unidadesRoutes = Router()

const createUnidadeController = new CreateUnidadeController()
const listUnidadeController = new ListUnidadeController()
const countUnidadeController = new CountUnidadeController()
const selectUnidadeController = new SelectUnidadeController()
const idSelectUnidadeController = new IdSelectUnidadeController()
const getUnidadeController = new GetUnidadeController()
const updateUnidadeController = new UpdateUnidadeController()
const deleteUnidadeController = new DeleteUnidadeController()
const multiDeleteUnidadeController = new MultiDeleteUnidadeController()

unidadesRoutes.post('/', ensureAuthenticated, createUnidadeController.handle )
unidadesRoutes.get('/', ensureAuthenticated, listUnidadeController.handle)
unidadesRoutes.post('/count', ensureAuthenticated, countUnidadeController.handle)
unidadesRoutes.get('/select/:id', ensureAuthenticated, idSelectUnidadeController.handle)
unidadesRoutes.get('/select', ensureAuthenticated, selectUnidadeController.handle)
unidadesRoutes.get('/:id', ensureAuthenticated, getUnidadeController.handle)
unidadesRoutes.put('/:id', ensureAuthenticated, updateUnidadeController.handle)
unidadesRoutes.delete('/:id', ensureAuthenticated, deleteUnidadeController.handle)
unidadesRoutes.delete('/', ensureAuthenticated, multiDeleteUnidadeController.handle)

export { unidadesRoutes }
