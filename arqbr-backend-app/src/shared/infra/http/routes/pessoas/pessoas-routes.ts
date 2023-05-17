import { Router } from 'express'
import { CreatePessoaController } from '@modules/pessoas/use-cases/pessoa/create-pessoa/create-pessoa-controller'
import { ListPessoaController } from '@modules/pessoas/use-cases/pessoa/list-pessoa/list-pessoa-controller'
import { CountPessoaController } from '@modules/pessoas/use-cases/pessoa/count-pessoa/count-pessoa-controller'
import { SelectPessoaController } from '@modules/pessoas/use-cases/pessoa/select-pessoa/select-pessoa-controller'
import { IdSelectPessoaController } from '@modules/pessoas/use-cases/pessoa/id-select-pessoa/id-select-pessoa-controller'
import { GetPessoaController } from '@modules/pessoas/use-cases/pessoa/get-pessoa/get-pessoa-controller'
import { UpdatePessoaController } from '@modules/pessoas/use-cases/pessoa/update-pessoa/update-pessoa-controller'
import { DeletePessoaController } from '@modules/pessoas/use-cases/pessoa/delete-pessoa/delete-pessoa-controller'
import { MultiDeletePessoaController } from '@modules/pessoas/use-cases/pessoa/multi-delete-pessoa/multi-delete-pessoa-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const pessoasRoutes = Router()

const createPessoaController = new CreatePessoaController()
const listPessoaController = new ListPessoaController()
const countPessoaController = new CountPessoaController()
const selectPessoaController = new SelectPessoaController()
const idSelectPessoaController = new IdSelectPessoaController()
const getPessoaController = new GetPessoaController()
const updatePessoaController = new UpdatePessoaController()
const deletePessoaController = new DeletePessoaController()
const multiDeletePessoaController = new MultiDeletePessoaController()

pessoasRoutes.post('/', ensureAuthenticated, createPessoaController.handle )
pessoasRoutes.post('/list', ensureAuthenticated, listPessoaController.handle)
pessoasRoutes.post('/count', ensureAuthenticated, countPessoaController.handle)
pessoasRoutes.get('/select/:id', ensureAuthenticated, idSelectPessoaController.handle)
pessoasRoutes.get('/select', ensureAuthenticated, selectPessoaController.handle)
pessoasRoutes.get('/:id', ensureAuthenticated, getPessoaController.handle)
pessoasRoutes.put('/:id', ensureAuthenticated, updatePessoaController.handle)
pessoasRoutes.delete('/:id', ensureAuthenticated, deletePessoaController.handle)
pessoasRoutes.delete('/', ensureAuthenticated, multiDeletePessoaController.handle)

export { pessoasRoutes }
