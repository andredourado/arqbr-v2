import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateServicoContratado1669034273035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servicos_contratados',
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
            name: 'servico_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'unidade_sla_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sla',
            type: 'decimal',
            isNullable: false,
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
            name: 'FKClienteServicoContratado',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKContratoServicoContratado',
            referencedTableName: 'contratos',
            referencedColumnNames: ['id'],
            columnNames: ['contrato_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKServicoServicoContratado',
            referencedTableName: 'servicos',
            referencedColumnNames: ['id'],
            columnNames: ['servico_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKUnidadeSlaServicoContratado',
            referencedTableName: 'unidades_sla',
            referencedColumnNames: ['id'],
            columnNames: ['unidade_sla_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('servicos_contratados')
  }
}
