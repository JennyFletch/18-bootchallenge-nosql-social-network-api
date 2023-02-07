const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [
    { 'username': 'BellaFonte', 'email': 'bella44@mail.com' },
    { 'username': 'JerryCadman', 'email': 'jcsurvey@mail.com' },
    { 'username': 'Jennifer934', 'email': 'jennypenny@mail.com' }
  ];

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});