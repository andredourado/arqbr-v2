import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { CreateVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/create-versao-documento/create-versao-documento-controller'
import { ListVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/list-versao-documento/list-versao-documento-controller'
import { CountVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/count-versao-documento/count-versao-documento-controller'
import { SelectVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/select-versao-documento/select-versao-documento-controller'
import { IdSelectVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/id-select-versao-documento/id-select-versao-documento-controller'
import { GetVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/get-versao-documento/get-versao-documento-controller'
import { UpdateVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/update-versao-documento/update-versao-documento-controller'
import { UpdateVersaoDocumentoFileController } from '@modules/digitalizacao/use-cases/versao-documento/update-versao-documento-file/update-versao-documento-file-controller'
import { DeleteVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/delete-versao-documento/delete-versao-documento-controller'
import { MultiDeleteVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/multi-delete-versao-documento/multi-delete-versao-documento-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'
import { UploadVersaoDocumentoController } from '@modules/digitalizacao/use-cases/versao-documento/upload-versao-documento/upload-versao-documento-controller'

const versoesDocumentoRoutes = Router()

const uploadFile = multer(uploadConfig)
const createVersaoDocumentoController = new CreateVersaoDocumentoController()
const listVersaoDocumentoController = new ListVersaoDocumentoController()
const countVersaoDocumentoController = new CountVersaoDocumentoController()
const selectVersaoDocumentoController = new SelectVersaoDocumentoController()
const idSelectVersaoDocumentoController = new IdSelectVersaoDocumentoController()
const getVersaoDocumentoController = new GetVersaoDocumentoController()
const updateVersaoDocumentoController = new UpdateVersaoDocumentoController()
const updateVersaoDocumentoFileController = new UpdateVersaoDocumentoFileController()
const deleteVersaoDocumentoController = new DeleteVersaoDocumentoController()
const multiDeleteVersaoDocumentoController = new MultiDeleteVersaoDocumentoController()
const uploadVersaoDocumentoController = new UploadVersaoDocumentoController()

versoesDocumentoRoutes.post('/', ensureAuthenticated, createVersaoDocumentoController.handle )
versoesDocumentoRoutes.get('/', ensureAuthenticated, listVersaoDocumentoController.handle)
versoesDocumentoRoutes.post('/count', ensureAuthenticated, countVersaoDocumentoController.handle)
versoesDocumentoRoutes.post('/file', ensureAuthenticated, uploadFile.single('files'), uploadVersaoDocumentoController.handle )
versoesDocumentoRoutes.get('/select/:id', ensureAuthenticated, idSelectVersaoDocumentoController.handle)
versoesDocumentoRoutes.get('/select', ensureAuthenticated, selectVersaoDocumentoController.handle)
versoesDocumentoRoutes.get('/:id', ensureAuthenticated, getVersaoDocumentoController.handle)
versoesDocumentoRoutes.put('/:id', ensureAuthenticated, updateVersaoDocumentoController.handle)
versoesDocumentoRoutes.patch('/:id', ensureAuthenticated, uploadFile.single("file"), updateVersaoDocumentoFileController.handle)
versoesDocumentoRoutes.delete('/:id', ensureAuthenticated, deleteVersaoDocumentoController.handle)
versoesDocumentoRoutes.delete('/', ensureAuthenticated, multiDeleteVersaoDocumentoController.handle)

export { versoesDocumentoRoutes }
