import { QueryInterface, Sequelize } from 'sequelize'

type Migration = {
  name: string
  path?: string
  context: {
    queryInterface: QueryInterface
    sequelize: Sequelize
  }
}
// 统一更改字段格式，驼峰 -> 下划线
export const up = async ({ name, path, context: { queryInterface } }: Migration) => {
  try {
    console.log('upgrade db => ', name, path)

    // 更新表脚本
    // await queryInterface.renameColumn('test_user', 'age', 'agename')

  } catch (error) {
    console.log(error, 'error===')
  }
}
