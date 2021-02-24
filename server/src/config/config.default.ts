import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path'

export type DefaultConfig = PowerPartial<EggAppConfig>;

const env = process.env.NODE_ENV
const isProd = env === 'production'

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1613982359573_2236';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true
  }

  config.static = {
    prefix: '/static-apps/',
    dir: [
      path.join(appInfo.baseDir, 'app/public/temp/static-apps'),
    ]
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    root: [path.join(appInfo.baseDir, 'app/public')].join(','),
    mapping: {
      '.html': 'nunjucks'
    }
  }
  config.security = {
    csrf: {
      enable: false
    }
  }

  config.development = {
    watchDirs: [path.join(appInfo.baseDir)],
    overrideDefault: true
  }

  // 是否使用mysql
  config.useSql = false

  // 是否启用更新数据库脚本
  config.useUmzug = false

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.126.181',
    port: '3306',
    database: 'data_center',
    username: 'bigdata',
    password: 'Liby@1234',
    timezone: '+08:00',
    modelFile: isProd ? 'js' : 'ts',
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: (field: any, next: () => void) => {
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    }
  }

  // redis 配置
  config.redis = {
    client: {
      host: '192.168.0.212',
      port: 6379, // Redis host
      password: '',
      db: 2
    }
  }

  config.onerror = {
    all: (err, ctx) => {
      const data = {
        code: -1,
        return: err,
        message: err.message
      }
      ctx.body = JSON.stringify(data)
    }
  }

  return config;
};
