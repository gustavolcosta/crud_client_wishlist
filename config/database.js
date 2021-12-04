const mongoose = require('mongoose')

const
{
	DB_NAME,
	DB_HOST,
	DB_PORT,
} = process.env;

module.exports = () =>
{
	mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		useNewUrlParser: true,
	});

	mongoose.connection.on('error', () => console.error('connection error:'))
	mongoose.connection.once('open', () => console.log('database connected'))

}