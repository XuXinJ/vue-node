
import { Provide, Scope, ScopeEnum, Config, Init } from '@midwayjs/decorator'
import { Sequelize, SequelizeOptions as BaseSequelizeOptions } from 'sequelize-typescript'
import * as _ from 'lodash'
import * as path from 'path'
export interface SequelizeOptions extends BaseSequelizeOptions {
  /**
   * 存储目录，项目目录后缀目录 ts\js
   */
  modelFile: 'ts' | 'js'
  // 数据库表名前缀字符串
  prefixTableName?: string
}

export type IDBContext = DBContext

@Scope(ScopeEnum.Singleton)
@Provide('dbContext')
export class DBContext {

  sequelize: Sequelize

  @Config('sequelize')
  confSequelize: SequelizeOptions

  @Config('env')
  env: string

  @Init()
  async init(): Promise<void> {
    this.sequelize = new Sequelize({
      ...this.confSequelize,
      storage: ':memory:',
      modelPaths: [
        `${__dirname}/*.model.${this.confSequelize.modelFile}`,
        path.resolve(__dirname, `./*.model.${this.confSequelize.modelFile}`)
      ],
      modelMatch: (filename, member) => {
        return _.endsWith(member, 'Model')
      },
      define: {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        underscored: true
      }
    })
    try {
      await this.sequelize.authenticate()
      await this.sequelize.sync({
        alter: false
      })
    } catch (err) {
      throw new Error(`数据库连接失败: ${err}`)
    }
    console.log('数据库连接成功!')
  }
}
