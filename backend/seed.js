require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const readline = require('readline');
const User = require('./models/user');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to Database successfully! 🚀\n');

    rl.question('Enter Admin Email: ', (email) => {
      rl.question('Enter Admin Password: ', async (plainPassword) => {
        try {
          const hashedPassword = await bcrypt.hash(plainPassword, 10);

          const newUser = new User({
            email: email.trim(),
            password: hashedPassword
          });

          await newUser.save();
          console.log('User Seeded Successfully!');
          console.log(`Email: ${email.trim()}`);
          console.log(`Password: ${plainPassword}`);
        } catch (err) {
          console.error('Error saving user:', err.message);
        } finally {
          mongoose.connection.close();
          rl.close();
        }
      });
    });

  } catch (err) {
    console.error('Database connection error:', err);
    rl.close();
  }
};

seedUser();