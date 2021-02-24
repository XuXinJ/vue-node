
import { Model } from 'sequelize-typescript'
import { Inject } from '@midwayjs/decorator'
import { Context } from 'egg'
import _ from 'lodash'
import {
  UpdateOptions,
  DestroyOptions,
  BulkCreateOptions,
  FindOptions as BaseFindOptions,
  CreateOptions,
  FindOrCreateOptions,
  ModelCtor,
  CountWithOptions,
  CountOptions,
  WhereOptions
} from 'sequelize'
import { IDBContext } from '../models/db-context'

type FindOptions<R> = BaseFindOptions & {
  distinct?: boolean
  where?: R | WhereOptions
}

// 把 model 方法的 key 过滤掉，看起来太缭乱
type NotFuncKey<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

type Record<T> = Omit<{ [K in NotFuncKey<T>]?: T[K] }, 'sequelize'>

/**
 * @description 基础service
 * @export
 * @class BaseService
 * @template T
 */
export class BaseService<T extends Model> {
  private model: ModelCtor<T>

  @Inject('dbContext')
  db: IDBContext

  constructor(model: ModelCtor<T>) {
    this.model = model
  }

  @Inject()
  ctx: Context

  /**
   * @description 将model开放出去直接调用其上的方法
   * @returns {ModelCtor<T>}
   * @memberOf BaseService
   */
  public getModel(): ModelCtor<T> {
    return this.model
  }

  /**
   * @description 动态给 model 赋值，不推荐使用
   * @returns {ModelCtor<T>}
   * @memberOf BaseService
   */
  public setModel(model: ModelCtor<T>) {
    this.model = model
  }

  /**
   * @description 创建单条记录
   * @param {Partial<T>} record
   * @param {CreateOptions} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async create(record: Record<T>, options?: CreateOptions): Promise<T> {
    return this.model.create(record, options)
  }

  /**
   * @description
   * @param {FindOrCreateOptions<T>} options
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findOrCreate(options: FindOrCreateOptions): Promise<[any, boolean]> {
    return this.model.findOrCreate(options)
  }

  /**
   * @description
   * @param {Partial<T>[]} records
   * @returns {Promise<any>}
   *
   * @memberOf BaseService
   */
  public async bulkCreate(records: Record<T>[], options?: BulkCreateOptions): Promise<T[]> {
    return this.model.bulkCreate(records, options)
  }

  /**
   * 使用较复杂的配置参数查询单条记录
   * @param {FindOptions} options
   * @return {Promise<any>}
   */
  public async findOne(options: FindOptions<Record<T>>): Promise<T | null> {
    return this.model.findOne(options)
  }

  /**
   * @description 使用主键(id)查询单条记录
   * @param {(number | string)} [identifier]
   * @param {FindOptions<T>} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findByPk(identifier?: number | string, options?: FindOptions<Record<T>>): Promise<T | null> {
    return this.model.findByPk(identifier, options)
  }

  /**
   * @description 查询多条记录
   * @param {FindOptions<T>} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findAll(options?: FindOptions<Record<T>>): Promise<T[]> {
    return this.model.findAll(options)
  }

  /**
   * @description 删除记录
   * @param {DestroyOptions} options
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async destroy(options: DestroyOptions): Promise<number | void> {
    return this.model.destroy(options)
  }

  /**
   * @description 附加公共字段到参数列表中 - 如 createdBy、updatedBy
   * @param {Object} values 参数列表
   * @param {Array} fields 附加的公共字段 - 如创建人、修改人 ['createdBy', 'updatedBy']
   *
   */
  public addFields = (values: object, fields: Array<any> = []) => {
    // 模型所有属性
    const attrs = Object.keys(this.model.rawAttributes)
    // 逐个字段拼接
    fields.map(fieldName => {
      //  包含创建人、修改人字段等公共字段 - 从上下文获取用户信息
      if (_.includes(attrs, fieldName)) {
        values[fieldName] = this.ctx?.userInfo?.id || ''
      }
    })
  }

  /**
   * @description 更新
   * @param {Partial<T>} values
   * @param {UpdateOptions} options
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async update(values: Partial<T>, options: UpdateOptions): Promise<any> {
    // 更新模型记录
    return this.model.update(values, options)
  }

  /**
   * @description 查询记录并返回总条数
   * @param {FindOptions<T>} [options]
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async findAndCountAll(options?: FindOptions<Record<T>>): Promise<{ rows: T[]; count: number }> {
    return this.model.findAndCountAll(options)
  }

  /**
   * @description 查询记录总条数
   * @param {options: any}
   * @returns {Promise<any>}
   * @memberOf BaseService
   */
  public async count(options?: CountWithOptions | CountOptions): Promise<{ [key: string]: number } | number> {
    return this.model.count(options)
  }
}
