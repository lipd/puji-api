require('dotenv').config()

const {
  USER_NAME,
  PASSWORD,
  PORT,
  SECRET,
  CLOUD_ID,
  CLOUD_SECRET,
  CLOUD_REGION,
} = process.env

module.exports = {
  connectionUrl: `mongodb+srv://${USER_NAME}:${PASSWORD}@puji.ntewp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  port: PORT,
  secret: SECRET,
  cloudRegion: CLOUD_REGION,
  cloudId: CLOUD_ID,
  cloudSecret: CLOUD_SECRET,
}
