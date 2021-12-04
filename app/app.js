require('dotenv/config');
const configExpress = require('../config/configExpress.js')
const app = configExpress();
const database = require('../config/database.js')

database()
app.listen(process.env.SERVER_PORT, process.env.HOST)