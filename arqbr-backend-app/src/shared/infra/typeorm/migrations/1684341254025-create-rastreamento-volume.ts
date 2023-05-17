import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRastreamentoVolume1684341254025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rastreamento_volumes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'volume_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'data_movimentacao',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'hora_movimentacao',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'local_de_armazenagem',
            type: 'uuid',
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
            name: 'FKVolumeRastreamentoVolumeVolumeId',
            referencedTableName: 'volumes',
            referencedColumnNames: ['id'],
            columnNames: ['volume_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPlantaRastreamentoVolumeLocalDeArmazenagem',
            referencedTableName: 'plantas',
            referencedColumnNames: ['id'],
            columnNames: ['local_de_armazenagem'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rastreamento_volumes')
  }
}
