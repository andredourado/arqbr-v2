import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCep1684334221032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ceps',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'codigo_cep',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'logradouro',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'estado_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cidade_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: false,
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
            name: 'FKEstadoCepEstadoId',
            referencedTableName: 'estados',
            referencedColumnNames: ['id'],
            columnNames: ['estado_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCidadeCepCidadeId',
            referencedTableName: 'cidades',
            referencedColumnNames: ['id'],
            columnNames: ['cidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ceps')
  }
}
