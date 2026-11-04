require('dotenv').config();
const dns = require('dns');

// Use public DNS servers to resolve MongoDB SRV records on Windows
dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const User = require('./models/user');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query, defaultValue) => {
  return new Promise((resolve) => {
    rl.question(`${query}${defaultValue !== undefined && defaultValue !== '' ? ` (default: ${defaultValue})` : ''}: `, (answer) => {
      resolve(answer.trim() || defaultValue || '');
    });
  });
};

const defaultClubs = [
  { name: 'GDGC UIET', role: 'Technical Lead' },
  { name: 'E-Cell UIET', role: 'Member' },
  { name: 'Elektron Club', role: 'Core Member' }
];

const seedUser = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is missing in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to Database successfully! 🚀\n');
    console.log('==============================================');
    console.log('            CampusOS User Seeder              ');
    console.log('  (Press ENTER to accept default values)     ');
    console.log('==============================================\n');

    // Basic & Academic Info (bio is default empty "")
    const name = await askQuestion('Student Name', 'Aarav Sharma');
    const email = await askQuestion('Student Email', 'aarav.sharma@uiet.ac.in');
    const plainPassword = await askQuestion('Password', 'password123');
    const rollNumber = await askQuestion('Roll / Reg No.', '252302042');
    const department = await askQuestion('Department', 'Computer Science & Engineering');
    const year = await askQuestion('Academic Year', '3rd Year (B.Tech)');

    // Optional Joined Clubs Section
    console.log('\n--- Joined Clubs (Optional) ---');
    const clubChoice = await askQuestion(
      'Add joined clubs? [y: Custom / d: Demo Defaults / n: Skip]',
      'n'
    );

    let joinedClubs = [];

    if (clubChoice.toLowerCase() === 'd' || clubChoice.toLowerCase() === 'default') {
      joinedClubs = defaultClubs;
      console.log('✓ Added 3 demo clubs (GDGC, E-Cell, Elektron).');
    } else if (clubChoice.toLowerCase() === 'y' || clubChoice.toLowerCase() === 'yes') {
      let clubIndex = 1;
      while (true) {
        const cName = await askQuestion(`Club ${clubIndex} Name`, '');
        if (!cName) break;

        const cRole = await askQuestion(`Your Role in ${cName}`, 'Member');
        joinedClubs.push({
          name: cName,
          role: cRole
        });

        const addAnother = await askQuestion('Add another joined club? (y/N)', 'n');
        if (addAnother.toLowerCase() !== 'y' && addAnother.toLowerCase() !== 'yes') {
          break;
        }

        clubIndex++;
      }
    } else {
      console.log('→ Skipped joined clubs (no clubs added).');
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const userData = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      rollNumber,
      department,
      year,
      bio: '', // Default empty string as requested
      joinedClubs,
      eventsAttended: joinedClubs.length > 0 ? 5 : 0
    };

    // Upsert user by email so running seed multiple times won't duplicate
    const savedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      userData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('\n==============================================');
    console.log('✓ User Seeded Successfully in Database!');
    console.log('==============================================');
    console.log(`ID:           ${savedUser._id}`);
    console.log(`Name:         ${savedUser.name}`);
    console.log(`Email:        ${savedUser.email}`);
    console.log(`Roll No:      ${savedUser.rollNumber}`);
    console.log(`Department:   ${savedUser.department}`);
    console.log(`Year:         ${savedUser.year}`);
    console.log(`Bio:          "${savedUser.bio}"`);
    console.log(`Joined Clubs: ${savedUser.joinedClubs.length > 0 ? savedUser.joinedClubs.map((c) => `${c.name} (${c.role})`).join(', ') : 'None'}`);
    console.log('==============================================\n');

  } catch (err) {
    console.error('Error during seeding:', err.message);
  } finally {
    await mongoose.connection.close();
    rl.close();
    process.exit(0);
  }
};

seedUser();
