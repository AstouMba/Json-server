const fs = require('fs');

// Chemin du fichier à nettoyer (adapte si ce n'est pas 'db.json')
const FILE_PATH = './db.json';

// Clés à garder
const KEYS_TO_KEEP = ['id', 'from', 'to', 'text', 'timestamp', 'status'];

// Lecture du fichier JSON
const rawData = fs.readFileSync(FILE_PATH, 'utf8');
const db = JSON.parse(rawData);

// Nettoyage du tableau messages
if (Array.isArray(db.messages)) {
  db.messages = db.messages.map(msg => {
    const cleaned = {};
    for (const key of KEYS_TO_KEEP) {
      if (msg[key] !== undefined) cleaned[key] = msg[key];
    }
    return cleaned;
  });
} else {
  console.error('Pas de tableau "messages" trouvé dans le fichier.');
  process.exit(1);
}

// Sauvegarde du fichier nettoyé
fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Messages nettoyés !');