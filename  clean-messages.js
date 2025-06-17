// Script Node.js pour nettoyer automatiquement un fichier JSON de messages (db.json)
// Garde uniquement les clés utiles : id, from, to, text, timestamp, status
// Lance : node clean-messages.js

const fs = require('fs');

// Chemin vers ton fichier messages (à adapter si besoin)
const FILE_PATH = './db.json'; // ou './messages.json' selon ton projet

// Clés à garder
const KEYS_TO_KEEP = ['id', 'from', 'to', 'text', 'timestamp', 'status'];

// Lis le fichier JSON
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

// Astuce : fais une copie de sauvegarde de db.json avant d’exécuter ce script.