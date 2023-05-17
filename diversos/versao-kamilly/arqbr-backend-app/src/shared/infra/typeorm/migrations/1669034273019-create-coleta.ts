import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateColeta1669034273019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coletas',
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
            name: 'departamento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'solicitante_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'ponto_coleta_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'identificador',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'data_programada_coleta',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'hora_programada_coleta',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'volumes',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'veiculo_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'entregador_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'data_efetiva_coleta',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'hora_efetiva_coleta',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'arquivo_foto_protocolo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status_id',
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
            name: 'FKClienteColeta',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKContratoColeta',
            referencedTableName: 'contratos',
            referencedColumnNames: ['id'],
            columnNames: ['contrato_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKDepartamentoColeta',
            referencedTableName: 'departamentos',
            referencedColumnNames: ['id'],
            columnNames: ['departamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKSolicitanteColeta',
            referencedTableName: 'solicitantes',
            referencedColumnNames: ['id'],
            columnNames: ['solicitante_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPontoColetaColeta',
            referencedTableName: 'pontos_coleta',
            referencedColumnNames: ['id'],
            columnNames: ['ponto_coleta_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKVeiculoColeta',
            referencedTableName: 'veiculos',
            referencedColumnNames: ['id'],
            columnNames: ['veiculo_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKEntregadorColeta',
            referencedTableName: 'entregadores',
            referencedColumnNames: ['id'],
            columnNames: ['entregador_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKStatusColeta',
            referencedTableName: 'status',
            referencedColumnNames: ['id'],
            columnNames: ['status_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coletas')
  }
}
