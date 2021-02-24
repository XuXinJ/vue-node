import { Controller, Get, Provide } from '@midwayjs/decorator';
import { Context } from 'egg'
@Provide()
@Controller('/')
export class HomeController {
  @Get('/')
  async home(ctx: Context) {
    // 第一次打开需要执行前端打包命令 npm run clientbuild
    return ctx.render('/temp/index', { data: '模板数据' })
  }
}
