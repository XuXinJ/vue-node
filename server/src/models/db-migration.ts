import { Provide, Inject, Config, Init, Logger } from '@midwayjs/decorator'
import { EggLogger } from 'egg'
import { IDBContext, SequelizeOptions } from './db-context'
import { Umzug, SequelizeStorage } from 'umzug'
import * as path from 'path'

@Provide('dbMigration')
export class DBMigration {
  @Inject('dbContext')
  db: IDBContext

  @Config('sequelize')
  config: SequelizeOptions

  @Logger()
  logger: EggLogger

  @Init()
  async init(): Promise<void> {
    try {
      const sequelize = this.db.sequelize
      const umzug = new Umzug({
        migrations: { glob: path.resolve(__dirname, `migrations/*.${this.config.modelFile}`) },
        context: { queryInterface: sequelize.getQueryInterface(), sequelize },
        storage: new SequelizeStorage({ sequelize }),
        logger: this.logger
      })

      // Checks migrations and run them if they are not already applied. To keep
      // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
      // will be automatically created (if it doesn't exist already) and parsed.
      const ups = await umzug.up()
      this.logger.info(' ========= db 更新数据库脚本 versions => ', ups)

    } catch (e) {
      this.logger.error('============ 初始化更新数据库脚本失败 faild =================')
      this.logger.error(e.stack)
      if (e.sql) {
        this.logger.error('error sql =>', e.sql)
      }
    }
  }
}
