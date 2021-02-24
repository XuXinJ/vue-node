
import { Table, Column, Model, CreatedAt, DataType, UpdatedAt } from 'sequelize-typescript'
import { generate } from 'shortid'

/**
 * @description
 * 带ID属性的基础Model定义
 * @export
 * @class BaseModel
 * @extends {Model<T, T2>}
 * @template T
 * @template any
 * @template T2
 * @template any
 */
@Table({
  timestamps: true,
  underscored: true,
  freezeTableName: true,
  deletedAt: true
  // paranoid: true
})
export default class BaseModel<T = any, T2 = any> extends Model<T, T2> {
  @Column({
    type: DataType.STRING(32),
    primaryKey: true,
    autoIncrement: false,
    defaultValue: generate,
    comment: '记录主键'
  })
  id: string

  @CreatedAt
  @Column({
    comment: '记录创建时间'
  })
  createdAt: Date

  @UpdatedAt
  @Column({
    comment: '记录更新时间'
  })
  updatedAt: Date
}
