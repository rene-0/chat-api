import { Sequelize } from 'sequelize'
import env from '../../main/config/env'

export type SequelizeHelperType = {
  client?: Sequelize
  connect: (database?: string, username?: string, password?: string) => Promise<void>
  disconnect: () => Promise<void>
}

export const SequelizeHelper: SequelizeHelperType = {
  async connect (database = env.dbName, username = env.dbUser, password = env.dbPassword): Promise<void> {
    this.client = new Sequelize(database, username, password, { dialect: 'mariadb' })
  },

  async disconnect (): Promise<void> {
    /* istanbul ignore next */
    if (!this.client) {
      return
    }
    this.client.close()
  }
}
