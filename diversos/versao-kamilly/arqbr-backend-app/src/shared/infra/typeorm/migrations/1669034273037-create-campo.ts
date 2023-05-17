import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCampo1669034273037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'versao_documento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'page',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'start_x',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'start_y',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'end_x',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'end_y',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'linha',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'coluna',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'resultado_esperado',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complemento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mascara',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'comprimento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ocorrencia',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'referencia',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'localizacao',
            type: 'varchar',
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
            name: 'FKVersaoDocumentoSquare',
            referencedTableName: 'versoes_documento',
            referencedColumnNames: ['id'],
            columnNames: ['versao_documento_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('campos')
  }
}
