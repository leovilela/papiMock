const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const match = req.originalUrl.match(/\/custom\/(\w+)$/);

  if (req.method === 'POST' && match) {
    const objectName = match[1];
    console.log('Payload received for object:', objectName);

    // Lendo os dados do db.json
    const dbPath = path.resolve(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    if (dbData.hasOwnProperty(objectName)) {
      if (objectName === 'imagem') {
        // Obtendo o ID do pedido do corpo da requisição
        const { numeroPedido } = req.body;

        if (numeroPedido !== undefined) {
          const imagensPedido = dbData[objectName].find(pedido => pedido.pedido === numeroPedido);
          
          if (imagensPedido) {
            return res.status(200).json({ message: 'Payload received', data: imagensPedido.imagens });
          } else {
            return res.status(404).json({ message: `Pedido ${numeroPedido} not found in db.json` });
          }
        } else {
          return res.status(400).json({ message: 'Pedido ID not provided in the request body' });
        }
      } else if (objectName === 'candidato') {
        // Obtendo o pedido do corpo da requisição
        const { numeroPedido } = req.body;

        if (numeroPedido !== undefined) {
          const candidato = dbData[objectName].find(c => c.pedido === numeroPedido);

          if (candidato) {
            return res.status(200).json({ message: 'Payload received', data: candidato });
          } else {
            return res.status(404).json({ message: `Candidato with numeroPedido ${numeroPedido} not found in db.json` });
          }
        } else {
          return res.status(400).json({ message: 'numeroPedido not provided in the request body' });
        }
      } else if (objectName === 'dae') {
        // Obtendo o pedido do corpo da requisição
        const { numeroPedido } = req.body;

        if (numeroPedido !== undefined) {
          const dae = dbData[objectName].find(c => c.pedido === numeroPedido);

          if (dae) {
            return res.status(200).json({ message: 'Payload received', data: dae });
          } else {
            return res.status(404).json({ message: `dae with numeroPedido ${numeroPedido} not found in db.json` });
          }
        } else {
          return res.status(400).json({ message: 'numeroPedido not provided in the request body' });
        }
      }
      
      else {
        return res.status(200).json({ message: 'Payload received', data: dbData[objectName] });
      }
    } else {
      return res.status(404).json({ message: `Object ${objectName} not found in db.json` });
    }
  }

  next();
};
