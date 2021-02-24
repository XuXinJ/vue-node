
// * code : 状态码  （ 200 = 成功，401 == 登录信息过期或未登录, -1: 操作失败或报错）


// * result: 返回的数据
// * massage : 返回的提示信息
module.exports = {
  /**
   * 统一成功信息返回处理
   * @description
   * @param {*} result
   */
  ok(result: any) {
    this.body = {
      code: 200,
      result,
      massage: '操作成功'
    }
  },

  /**
   * 统一error返回处理
   * @description
   * @param {string} message
   * @param {number} [status=400]
   * @param {any} [code=-1]
   */
  error(message, status = 400, code = -1): void {
    this.status = status
    this.body = {
      result: null,
      message,
      code
    }
  }
}
