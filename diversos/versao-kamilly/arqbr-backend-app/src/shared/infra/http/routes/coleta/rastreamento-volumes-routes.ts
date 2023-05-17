import { Router } from 'express'
import { CreateRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/create-rastreamento-volume/create-rastreamento-volume-controller'
import { ListRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/list-rastreamento-volume/list-rastreamento-volume-controller'
import { CountRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/count-rastreamento-volume/count-rastreamento-volume-controller'
import { SelectRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/select-rastreamento-volume/select-rastreamento-volume-controller'
import { IdSelectRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/id-select-rastreamento-volume/id-select-rastreamento-volume-controller'
import { GetRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/get-rastreamento-volume/get-rastreamento-volume-controller'
import { UpdateRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/update-rastreamento-volume/update-rastreamento-volume-controller'
import { DeleteRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/delete-rastreamento-volume/delete-rastreamento-volume-controller'
import { MultiDeleteRastreamentoVolumeController } from '@modules/coleta/use-cases/rastreamento-volume/multi-delete-rastreamento-volume/multi-delete-rastreamento-volume-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const rastreamentoVolumesRoutes = Router()

const createRastreamentoVolumeController = new CreateRastreamentoVolumeController()
const listRastreamentoVolumeController = new ListRastreamentoVolumeController()
const countRastreamentoVolumeController = new CountRastreamentoVolumeController()
const selectRastreamentoVolumeController = new SelectRastreamentoVolumeController()
const idSelectRastreamentoVolumeController = new IdSelectRastreamentoVolumeController()
const getRastreamentoVolumeController = new GetRastreamentoVolumeController()
const updateRastreamentoVolumeController = new UpdateRastreamentoVolumeController()
const deleteRastreamentoVolumeController = new DeleteRastreamentoVolumeController()
const multiDeleteRastreamentoVolumeController = new MultiDeleteRastreamentoVolumeController()

rastreamentoVolumesRoutes.post('/', ensureAuthenticated, createRastreamentoVolumeController.handle )
rastreamentoVolumesRoutes.get('/', ensureAuthenticated, listRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.post('/count', ensureAuthenticated, countRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.get('/select/:id', ensureAuthenticated, idSelectRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.get('/select', ensureAuthenticated, selectRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.get('/:id', ensureAuthenticated, getRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.put('/:id', ensureAuthenticated, updateRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.delete('/:id', ensureAuthenticated, deleteRastreamentoVolumeController.handle)
rastreamentoVolumesRoutes.delete('/', ensureAuthenticated, multiDeleteRastreamentoVolumeController.handle)

export { rastreamentoVolumesRoutes }
