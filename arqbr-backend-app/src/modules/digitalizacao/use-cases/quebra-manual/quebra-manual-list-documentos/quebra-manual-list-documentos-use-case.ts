import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider";
import { HttpResponse, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";

@injectable()
class QuebraManualListDocumentosUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  async execute(): Promise<HttpResponse> {
    const documentos = await this.storageProvider.loadFiles('arquivos-pdf-scanner')
    return ok(documentos)
  }
}

export { QuebraManualListDocumentosUseCase }