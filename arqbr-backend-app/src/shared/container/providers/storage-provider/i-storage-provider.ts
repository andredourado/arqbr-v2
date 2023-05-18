interface IStorageProvider {
  save(file: string, folder: string): Promise<string>
  load(file: string, folder: string): Promise<any>
  readonly url: string
  delete(file: string, folder: string): Promise<void>
}

export { IStorageProvider }

