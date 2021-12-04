const Client = require('../output/clientSchema.js');
const ClientUseCase = require('../../core/use-case/ClientUseCase')



module.exports = app =>
{
	app.get('/client/:id', (req, responseMethod) =>
	{
		const responsePromisse = ClientUseCase.getClientByRequest(req.params.id);
    sendReturn(responsePromisse, responseMethod)
	})

	app.post('/client', (req, responseMethod) =>
	{
    const responsePromisse = ClientUseCase.addClient(req);
    sendReturn(responsePromisse, responseMethod)
	})

	app.put('/client/:id', function(req, responseMethod) 
  {
    const responsePromisse = ClientUseCase.updateClient(req)
    sendReturn(responsePromisse, responseMethod)
	});

  app.delete('/client/:id', function(req, responseMethod)
  {
    const responsePromisse = ClientUseCase.removeClient(req)
    sendReturn(responsePromisse, responseMethod)
  })

  app.post('/client/add/whishlist/:id', (req, responseMethod) =>
	{
    const responsePromisse = ClientUseCase.addProductInWhishlist(req);
    
    sendReturn(responsePromisse, responseMethod)
	})

  app.post('/client/remove/whishlist/:id', (req, responseMethod) =>
	{
    const responsePromisse = ClientUseCase.removeProductInWhishlist(req);
    
    sendReturn(responsePromisse, responseMethod)
	})

  app.get('/client/list/all', (req, responseMethod) =>
  {

    const responsePromisse = ClientUseCase.getListClient(req);
    
    sendReturn(responsePromisse, responseMethod)
  })

  app.get('/client/list/wishlist/:id', (req, responseMethod) =>
	{
		const responsePromisse = ClientUseCase.getListProductsByClient(req.params.id);
    sendReturn(responsePromisse, responseMethod)
	})

  function sendReturn(responsePromisse, responseMethod)
  {
    responsePromisse.then(responseObject => {responseMethod.status(responseObject.status).send(responseObject)})
  }

}