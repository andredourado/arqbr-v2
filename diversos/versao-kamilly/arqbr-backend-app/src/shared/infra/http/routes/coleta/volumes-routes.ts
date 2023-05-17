import { Router } from 'express'
import { CreateVolumeController } from '@modules/coleta/use-cases/volume/create-volume/create-volume-controller'
import { ListVolumeController } from '@modules/coleta/use-cases/volume/list-volume/list-volume-controller'
import { CountVolumeController } from '@modules/coleta/use-cases/volume/count-volume/count-volume-controller'
import { SelectVolumeController } from '@modules/coleta/use-cases/volume/select-volume/select-volume-controller'
import { IdSelectVolumeController } from '@modules/coleta/use-cases/volume/id-select-volume/id-select-volume-controller'
import { GetVolumeController } from '@modules/coleta/use-cases/volume/get-volume/get-volume-controller'
import { UpdateVolumeController } from '@modules/coleta/use-cases/volume/update-volume/update-volume-controller'
import { DeleteVolumeController } from '@modules/coleta/use-cases/volume/delete-volume/delete-volume-controller'
import { MultiDeleteVolumeController } from '@modules/coleta/use-cases/volume/multi-delete-volume/multi-delete-volume-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const volumesRoutes = Router()

const createVolumeController = new CreateVolumeController()
const listVolumeController = new ListVolumeController()
const countVolumeController = new CountVolumeController()
const selectVolumeController = new SelectVolumeController()
const idSelectVolumeController = new IdSelectVolumeController()
const getVolumeController = new GetVolumeController()
const updateVolumeController = new UpdateVolumeController()
const deleteVolumeController = new DeleteVolumeController()
const multiDeleteVolumeController = new MultiDeleteVolumeController()

volumesRoutes.post('/', ensureAuthenticated, createVolumeController.handle )
volumesRoutes.get('/', ensureAuthenticated, listVolumeController.handle)
volumesRoutes.post('/count', ensureAuthenticated, countVolumeController.handle)
volumesRoutes.get('/select/:id', ensureAuthenticated, idSelectVolumeController.handle)
volumesRoutes.get('/select', ensureAuthenticated, selectVolumeController.handle)
volumesRoutes.get('/:id', ensureAuthenticated, getVolumeController.handle)
volumesRoutes.put('/:id', ensureAuthenticated, updateVolumeController.handle)
volumesRoutes.delete('/:id', ensureAuthenticated, deleteVolumeController.handle)
volumesRoutes.delete('/', ensureAuthenticated, multiDeleteVolumeController.handle)

export { volumesRoutes }
