const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const contactSchema = new mongoose.Schema({
  userId: String,
  contacts: [{ firstName: String, lastName: String, phoneNumber: String }],
});
const User = mongoose.model('User', userSchema);
const Contacts = mongoose.model('Contacts', contactSchema);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  //when we are connected we want to host our rest API, we want to listen and start the eexpress service once we connect to the database
  app.listen(4000, () => {
    console.log('app listening on localHost');
  });
});
app.get('/', (req, res) => {
  res.send('hellow world!');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  //if the user exist then we return and send status 500
  const user = await User.findOne({ username });
  if (user) {
    res.status(500);
    res.json({ message: 'User already exists' });
    return;
  }
  await User.create({ username, password });
  res.json({
    username,
    password,
  });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  //if the user exist then we return and send status 500
  //we find the user send from the front end and if the user doesnt exist then the status code 403 is sent
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'Invalid login' });
    return;
  }
  res.json({
    message: 'success',
  });
});

app.post('/contacts', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const contacts = req.body;
  console.log(contacts);
  //if the user exist then we return and send status 500
  //we find the user send from the front end and if the user doesnt exist then the status code 403 is sent
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'Invalid access' });
    return;
  }
  const contact = await Contacts.findOne({ userId: user._id }).exec();
  if (!contact) {
    await Contacts.create({
      userId: user._id,
      contacts: [...contacts],
    });
  } else {
    contact.contacts = contacts;
    await contact.save();
  }
  res.json({ message: 'success' });
});

app.get('/contacts', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  //we find the user send from the front end and if the user doesnt exist then the status code 403 is sent

  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: 'Invalid access' });
    return;
  }
  const contact = await Contacts.findOne({ userId: user._id }).exec();
  res.json(contact);
});
