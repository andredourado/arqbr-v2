import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider";
import { HttpResponse, noContent, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";

@injectable()
class QuebraManualListDocumentosUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  async execute(): Promise<HttpResponse> {
    // const documentos = await this.storageProvider.loadFiles('arquivos-pdf-scanner')
    return noContent()
  }
}

export { QuebraManualListDocumentosUseCase }