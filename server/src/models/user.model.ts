/*
 * @Author: xuxinjiang
 * @Date: 2021-01-20 16:29:09
 * @LastEditTime: 2021-02-23 17:17:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */
import { Table, Column, DataType } from 'sequelize-typescript'
import { providerWrapper } from '@midwayjs/core'
import BaseModel from './base'

@Table({
  freezeTableName: true,
  timestamps: true,
  tableName: 'test_user',
  comment: '任务锁定表'
})
export class TestUserModel extends BaseModel {
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '姓名'
  })
  username: string

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: '年龄'
  })
  age: number
}

export const factory = (): typeof TestUserModel => TestUserModel

providerWrapper([
  {
    id: 'testUserModel',
    provider: factory
  }
])
