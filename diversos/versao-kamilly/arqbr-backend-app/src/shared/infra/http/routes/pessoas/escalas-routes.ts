import { Router } from 'express'
import { CreateEscalaController } from '@modules/pessoas/use-cases/escala/create-escala/create-escala-controller'
import { ListEscalaController } from '@modules/pessoas/use-cases/escala/list-escala/list-escala-controller'
import { CountEscalaController } from '@modules/pessoas/use-cases/escala/count-escala/count-escala-controller'
import { SelectEscalaController } from '@modules/pessoas/use-cases/escala/select-escala/select-escala-controller'
import { IdSelectEscalaController } from '@modules/pessoas/use-cases/escala/id-select-escala/id-select-escala-controller'
import { GetEscalaController } from '@modules/pessoas/use-cases/escala/get-escala/get-escala-controller'
import { UpdateEscalaController } from '@modules/pessoas/use-cases/escala/update-escala/update-escala-controller'
import { DeleteEscalaController } from '@modules/pessoas/use-cases/escala/delete-escala/delete-escala-controller'
import { MultiDeleteEscalaController } from '@modules/pessoas/use-cases/escala/multi-delete-escala/multi-delete-escala-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const escalasRoutes = Router()

const createEscalaController = new CreateEscalaController()
const listEscalaController = new ListEscalaController()
const countEscalaController = new CountEscalaController()
const selectEscalaController = new SelectEscalaController()
const idSelectEscalaController = new IdSelectEscalaController()
const getEscalaController = new GetEscalaController()
const updateEscalaController = new UpdateEscalaController()
const deleteEscalaController = new DeleteEscalaController()
const multiDeleteEscalaController = new MultiDeleteEscalaController()

escalasRoutes.post('/', ensureAuthenticated, createEscalaController.handle )
escalasRoutes.get('/', ensureAuthenticated, listEscalaController.handle)
escalasRoutes.post('/count', ensureAuthenticated, countEscalaController.handle)
escalasRoutes.get('/select/:id', ensureAuthenticated, idSelectEscalaController.handle)
escalasRoutes.get('/select', ensureAuthenticated, selectEscalaController.handle)
escalasRoutes.get('/:id', ensureAuthenticated, getEscalaController.handle)
escalasRoutes.put('/:id', ensureAuthenticated, updateEscalaController.handle)
escalasRoutes.delete('/:id', ensureAuthenticated, deleteEscalaController.handle)
escalasRoutes.delete('/', ensureAuthenticated, multiDeleteEscalaController.handle)

export { escalasRoutes }
