import { App, Config, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from '@midwayjs/web';
import { EggLogger } from 'egg'
@Configuration()
export class ContainerLifeCycle implements ILifeCycle {

  @App()
  app: Application;

  @Config('useSql')
  useSql: boolean

  @Config('useUmzug')
  useUmzug: boolean

  async onReady() {
    const logger: EggLogger = this.app.getLogger()
    if (this.useSql) {
      //** 初始化数据库模型
      await this.app.applicationContext.getAsync('dbContext')
    }
    if (this.useUmzug) {
      //** 初始化数据库更新迁移
      await this.app.applicationContext.getAsync('dbMigration')
    }

    logger.info('====================================')
    logger.info('✅  启动成功')
    logger.info('====================================')
  }
}
