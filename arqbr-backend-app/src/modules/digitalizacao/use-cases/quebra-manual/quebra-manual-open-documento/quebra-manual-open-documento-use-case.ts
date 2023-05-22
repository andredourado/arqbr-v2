import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider";
import { HttpResponse, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";

@injectable()
class QuebraManualOpenDocumentoUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  async execute(file: string): Promise<HttpResponse> {
    const documentos = await this.storageProvider.load(file, 'arquivos-pdf-scanner')
    return ok(documentos)
  }
}

export { QuebraManualOpenDocumentoUseCase }