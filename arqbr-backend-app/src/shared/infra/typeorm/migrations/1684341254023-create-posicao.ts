import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePosicao1684341254023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posicoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'unidade_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'planta_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'rua',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'linha',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'coluna',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'posicoes',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'posicoes_disponíveis',
            type: 'int',
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
            name: 'FKUnidadePosicaoUnidadeId',
            referencedTableName: 'unidades',
            referencedColumnNames: ['id'],
            columnNames: ['unidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPlantaPosicaoPlantaId',
            referencedTableName: 'plantas',
            referencedColumnNames: ['id'],
            columnNames: ['planta_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posicoes')
  }
}
