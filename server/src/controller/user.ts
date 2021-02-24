import { Inject, Controller, Post, Provide, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../service/user';

@Provide()
@Controller('/app/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject('userService')
  service: UserService;

  // 获取用户列表
  @Get('/getUser')
  async getUser() {
    const user = await this.service.findAll();
    return this.ctx.ok(user)
  }

  // 创建用户
  @Post('/setUser')
  async setUser(ctx: Context) {
    const data = ctx.request.body
    const res = await this.service.create(data)
    return ctx.ok(res)
  }

  // 修改用户名称
  @Post('/fixUsername')
  async fixUsername(ctx: Context) {
    const { id, name } = ctx.request.body
    const res = await this.service.fixUsername(id, name)
    return ctx.ok(res)
  }

}
