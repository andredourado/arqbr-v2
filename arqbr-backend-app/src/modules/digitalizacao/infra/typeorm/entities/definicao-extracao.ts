import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'

@Entity('definicoes_extracao')
class DefinicaoExtracao {
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

  @Column({ name: 'pdf', nullable: true })
  pdf?: string

  @Column({ name: 'texto_quebra', nullable: true })
  textoQuebra?: string

  @Column({ name: 'nome_campo', nullable: true })
  nomeCampo?: string

  @Column({ name: 'titulo', nullable: true })
  titulo?: string

  @Column({ name: 'estrategia', nullable: true })
  estrategia?: string

  @Column({ name: 'texto', nullable: true })
  texto?: string

  @Column({ name: 'inicio', nullable: true })
  inicio?: string

  @Column({ name: 'comprimento', nullable: true })
  comprimento?: Number

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

export { DefinicaoExtracao }
