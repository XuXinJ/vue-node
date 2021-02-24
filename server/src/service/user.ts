import { Inject, Provide } from '@midwayjs/decorator';
import { TestUserModel } from '../models/user.model';
import { BaseService } from './base';

@Provide('userService')
export class UserService extends BaseService<TestUserModel>{
  constructor(@Inject('testUserModel') model: typeof TestUserModel) {
    super(model)
  }
  // 修改用户名
  async fixUsername(id, name) {
    const res = await this.findByPk(id)
    if (res) {
      res.username = name
      return res.save()
    } else {
      throw new Error("操作错误，不存在该条数据");
    }
  }



}
