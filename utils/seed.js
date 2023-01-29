const connection = require('../config/connection');
const { Thought, User } = require('../models');
// const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [
    { 'username': 'BellaFonte', 'email': 'bhairy@mail.com' },
    { 'username': 'JerryCadman', 'email': 'jcsurvey@mail.com' },
    { 'username': 'Jennifer934', 'email': 'jennypenny@mail.com' }
  ];

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    'thoughtText': 'This is a thought.',
    'username': 'randomnameok',
    'userId': '5edff358a0fcb779aa7b118b'
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
