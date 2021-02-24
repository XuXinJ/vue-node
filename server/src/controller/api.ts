import { Inject, Controller, Provide, Get } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Controller('/app/api')
export class ApiController {
  @Inject()
  ctx: Context;


  @Get('/getdata')
  async getdata() {
    return this.ctx.ok({
      text: '欢迎使用全栈一体工程'
    })
  }
}
