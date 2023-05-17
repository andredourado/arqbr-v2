import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'
import { PontoColeta } from '@modules/clientes/infra/typeorm/entities/ponto-coleta'
import { Veiculo } from '@modules/coleta/infra/typeorm/entities/veiculo'
import { Entregador } from '@modules/coleta/infra/typeorm/entities/entregador'
import { Status } from '@modules/comum/infra/typeorm/entities/status'

@Entity('coletas')
class Coleta {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Contrato, { nullable: true, eager: true })
  @JoinColumn({ name: 'contrato_id', referencedColumnName: 'id' })
  contratoId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @ManyToOne(() => Solicitante, { nullable: true, eager: true })
  @JoinColumn({ name: 'solicitante_id', referencedColumnName: 'id' })
  solicitanteId?: string

  @ManyToOne(() => PontoColeta, { nullable: true, eager: true })
  @JoinColumn({ name: 'ponto_coleta_id', referencedColumnName: 'id' })
  pontoColetaId?: string

  @Column({ name: 'identificador', nullable: true })
  identificador?: string

  @Column({ name: 'data_programada_coleta', nullable: true, type: 'timestamptz' })
  dataProgramadaColeta?: Date

  @Column({ name: 'hora_programada_coleta', nullable: true, type: 'timestamptz' })
  horaProgramadaColeta?: Date

  @Column({ name: 'volumes', nullable: true })
  volumes?: Number

  @ManyToOne(() => Veiculo, { nullable: true, eager: true })
  @JoinColumn({ name: 'veiculo_id', referencedColumnName: 'id' })
  veiculoId?: string

  @ManyToOne(() => Entregador, { nullable: true, eager: true })
  @JoinColumn({ name: 'entregador_id', referencedColumnName: 'id' })
  entregadorId?: string

  @Column({ name: 'data_efetiva_coleta', nullable: true, type: 'timestamptz' })
  dataEfetivaColeta?: Date

  @Column({ name: 'hora_efetiva_coleta', nullable: true, type: 'timestamptz' })
  horaEfetivaColeta?: Date

  @Column({ name: 'arquivo_foto_protocolo', nullable: true })
  arquivoFotoProtocolo?: string

  @ManyToOne(() => Status, { nullable: true, eager: true })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  statusId?: string

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

export { Coleta }
