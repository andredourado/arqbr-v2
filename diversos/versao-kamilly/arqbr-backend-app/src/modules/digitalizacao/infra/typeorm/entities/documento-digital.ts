import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'

@Entity('documentos_digitais')
class DocumentoDigital {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'data_digitalizacao', nullable: true, type: 'timestamptz' })
  dataDigitalizacao?: Date

  @ManyToOne(() => VersaoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'versao_documento_id', referencedColumnName: 'id' })
  versaoDocumentoId?: string

  @Column({ name: 'nip', nullable: true })
  nip?: string

  @Column({ name: 'conteudo_qr_code', nullable: true })
  conteudoQrCode?: string

  @Column({ name: 'nome_arquivo', nullable: true })
  nomeArquivo?: string

  @Column({ name: 'conteudo_em_texto', nullable: true })
  conteudoEmTexto?: string

  @ManyToOne(() => Pessoa, { nullable: true, eager: true })
  @JoinColumn({ name: 'pessoa_id', referencedColumnName: 'id' })
  pessoaId?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { DocumentoDigital }
