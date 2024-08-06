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
      return res.status(200).json({ message: 'Payload received', data: dbData[objectName] });
    } else {
      return res.status(404).json({ message: `Object ${objectName} not found in db.json` });
    }
  }

  next();
};
