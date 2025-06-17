// Script pour supprimer les messages avec fromUserId/toUserId dans db.json

const fs = require('fs');
const FILE_PATH = './db.json'; // adapte si ton fichier s'appelle autrement

const rawData = fs.readFileSync(FILE_PATH, 'utf8');
const db = JSON.parse(rawData);

if (Array.isArray(db.messages)) {
  // Garde SEULEMENT les messages qui n'ont PAS fromUserId/toUserId
  db.messages = db.messages.filter(
    msg => !(msg.fromUserId && msg.toUserId)
  );
} else {
  console.error('Pas de tableau "messages" trouvé dans le fichier.');
  process.exit(1);
}

fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Messages fromUserId/toUserId supprimés !');