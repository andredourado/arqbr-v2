import { Router } from 'express'
import { CreateSugestaoController } from '@modules/clientes/use-cases/sugestao/create-sugestao/create-sugestao-controller'
import { ListSugestaoController } from '@modules/clientes/use-cases/sugestao/list-sugestao/list-sugestao-controller'
import { CountSugestaoController } from '@modules/clientes/use-cases/sugestao/count-sugestao/count-sugestao-controller'
import { SelectSugestaoController } from '@modules/clientes/use-cases/sugestao/select-sugestao/select-sugestao-controller'
import { IdSelectSugestaoController } from '@modules/clientes/use-cases/sugestao/id-select-sugestao/id-select-sugestao-controller'
import { GetSugestaoController } from '@modules/clientes/use-cases/sugestao/get-sugestao/get-sugestao-controller'
import { UpdateSugestaoController } from '@modules/clientes/use-cases/sugestao/update-sugestao/update-sugestao-controller'
import { DeleteSugestaoController } from '@modules/clientes/use-cases/sugestao/delete-sugestao/delete-sugestao-controller'
import { MultiDeleteSugestaoController } from '@modules/clientes/use-cases/sugestao/multi-delete-sugestao/multi-delete-sugestao-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const sugestoesRoutes = Router()

const createSugestaoController = new CreateSugestaoController()
const listSugestaoController = new ListSugestaoController()
const countSugestaoController = new CountSugestaoController()
const selectSugestaoController = new SelectSugestaoController()
const idSelectSugestaoController = new IdSelectSugestaoController()
const getSugestaoController = new GetSugestaoController()
const updateSugestaoController = new UpdateSugestaoController()
const deleteSugestaoController = new DeleteSugestaoController()
const multiDeleteSugestaoController = new MultiDeleteSugestaoController()

sugestoesRoutes.post('/', ensureAuthenticated, createSugestaoController.handle )
sugestoesRoutes.post('/list', ensureAuthenticated, listSugestaoController.handle)
sugestoesRoutes.post('/count', ensureAuthenticated, countSugestaoController.handle)
sugestoesRoutes.get('/select/:id', ensureAuthenticated, idSelectSugestaoController.handle)
sugestoesRoutes.get('/select', ensureAuthenticated, selectSugestaoController.handle)
sugestoesRoutes.get('/:id', ensureAuthenticated, getSugestaoController.handle)
sugestoesRoutes.put('/:id', ensureAuthenticated, updateSugestaoController.handle)
sugestoesRoutes.delete('/:id', ensureAuthenticated, deleteSugestaoController.handle)
sugestoesRoutes.delete('/', ensureAuthenticated, multiDeleteSugestaoController.handle)

export { sugestoesRoutes }
