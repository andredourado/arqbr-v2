import { IStorageProvider } from "@shared/container/providers/storage-provider/i-storage-provider";
import { HttpResponse, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";

@injectable()
class QuebraManualOpenDocumentoUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  async execute(file: string, page: number): Promise<HttpResponse> {
    const newPage = 'page_' + String(page).padStart(5, '0') + '.png'
    const url = 'arquivos-pdf-scanner-pages/' + file
    const image = await this.storageProvider.load(newPage, url)
    const numberPages = await this.storageProvider.numberPages(url)

    const response = {
      image,
      numberPages
    }

    return ok(response)
  }
}

export { QuebraManualOpenDocumentoUseCase }