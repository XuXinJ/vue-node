import { QueryInterface, Sequelize } from 'sequelize'
import { DataType } from 'sequelize-typescript'

type Migration = {
  name: string
  path?: string
  context: {
    queryInterface: QueryInterface
    sequelize: Sequelize
  }
}

export const up = async ({ name, path, context: { queryInterface } }: Migration) => {
  try {
    console.log('upgrade db => ', name, path)
    // 更新表脚本
    await queryInterface.addColumn('text_user', 'tel_number', DataType.STRING())

  } catch (error) {
    console.log(error, 'error===')
  }
}