import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateVolume1684867219018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'volumes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'coleta_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'identificador',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'arquivo_foto',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'comentario',
            type: 'varchar',
            isNullable: false,
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
            name: 'FKColetaVolumeColetaId',
            referencedTableName: 'coletas',
            referencedColumnNames: ['id'],
            columnNames: ['coleta_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPlantaVolumeLocalDeArmazenagem',
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
    await queryRunner.dropTable('volumes')
  }
}
