const bcrypt = require('bcrypt');

async function generateHash(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hash generado:", hashedPassword);
}

generateHash("dan12")
  .then(() => process.exit())
  .catch(console.error);