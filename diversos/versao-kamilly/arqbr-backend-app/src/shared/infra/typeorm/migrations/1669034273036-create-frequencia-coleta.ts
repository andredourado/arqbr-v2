import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFrequenciaColeta1669034273036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'frequencia_coletas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'cliente_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'contrato_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'frequencia_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'dias_do_mes',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'desabilitado',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKClienteFrequenciaColeta',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKContratoFrequenciaColeta',
            referencedTableName: 'contratos',
            referencedColumnNames: ['id'],
            columnNames: ['contrato_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKFrequenciaFrequenciaColeta',
            referencedTableName: 'frequencias',
            referencedColumnNames: ['id'],
            columnNames: ['frequencia_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('frequencia_coletas')
  }
}
