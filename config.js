require('dotenv').config()

const { USER_NAME, PASSWORD, PORT } = process.env

module.exports = {
  connectionUrl: `mongodb+srv://${USER_NAME}:${PASSWORD}@puji.ntewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  port: PORT,
}
