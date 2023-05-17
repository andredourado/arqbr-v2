import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { Frequencia } from '@modules/comum/infra/typeorm/entities/frequencia'

@Entity('frequencia_coletas')
class FrequenciaColeta {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Contrato, { nullable: true, eager: true })
  @JoinColumn({ name: 'contrato_id', referencedColumnName: 'id' })
  contratoId?: string

  @ManyToOne(() => Frequencia, { nullable: true, eager: true })
  @JoinColumn({ name: 'frequencia_id', referencedColumnName: 'id' })
  frequenciaId?: string

  @Column({ name: 'dias_do_mes', nullable: true })
  diasDoMes?: string

  @Column({ name: 'seg_horario_inicio', nullable: true })
  segHorarioInicio?: string

  @Column({ name: 'seg_horario_fim', nullable: true })
  segHorarioFim?: string

  @Column({ name: 'ter_horario_inicio', nullable: true })
  terHorarioInicio?: string

  @Column({ name: 'ter_horario_fim', nullable: true })
  terHorarioFim?: string

  @Column({ name: 'qua_horario_inicio', nullable: true })
  quaHorarioInicio?: string

  @Column({ name: 'qua_horario_fim', nullable: true })
  quaHorarioFim?: string

  @Column({ name: 'qui_horario_inicio', nullable: true })
  quiHorarioInicio?: string

  @Column({ name: 'qui_horario_fim', nullable: true })
  quiHorarioFim?: string

  @Column({ name: 'sex_horario_inicio', nullable: true })
  sexHorarioInicio?: string

  @Column({ name: 'sex_horario_fim', nullable: true })
  sexHorarioFim?: string

  @Column({ name: 'sab_horario_inicio', nullable: true })
  sabHorarioInicio?: string

  @Column({ name: 'sab_horario_fim', nullable: true })
  sabHorarioFim?: string

  @Column({ name: 'dom_horario_inicio', nullable: true })
  domHorarioInicio?: string

  @Column({ name: 'dom_horario_fim', nullable: true })
  domHorarioFim?: string

  @Column({ name: 'desabilitado', nullable: true, default: false })
  desabilitado?: boolean

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

export { FrequenciaColeta }
