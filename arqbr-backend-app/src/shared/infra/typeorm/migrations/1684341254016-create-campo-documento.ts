import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCampoDocumento1684341254016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campos_documento',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'tipo_documento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nome_campo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'titulo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'metodo_extracao',
            type: 'varchar',
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
            name: 'FKTipoDocumentoCampoDocumentoTipoDocumentoId',
            referencedTableName: 'tipos_documento',
            referencedColumnNames: ['id'],
            columnNames: ['tipo_documento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('campos_documento')
  }
}
