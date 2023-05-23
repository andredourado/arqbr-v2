import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'

@Entity('caixas_quebras')
class CaixaQuebra {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @ManyToOne(() => TipoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'tipo_documento_id', referencedColumnName: 'id' })
  tipoDocumentoId?: string

  @Column({ name: 'nome_arquivo_origem', nullable: true })
  nomeArquivoOrigem?: string

  @Column({ name: 'sequencia', nullable: true })
  sequencia?: Number

  @Column({ name: 'pagina_inicial', nullable: true })
  paginaInicial?: Number

  @Column({ name: 'pagina_final', nullable: true })
  paginaFinal?: Number

  @Column({ name: 'status', nullable: true })
  status?: string

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

export { CaixaQuebra }
