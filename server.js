const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;
mongoose.connect(
  'mongodb+srv://dbUser:dbUser@cluster0.3fyqd.mongodb.net/todo?retryWrites=true&w=majority' ||
    'mongodb://localhost/todo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Schemas
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

//connection of the DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connection is here');
  //when we are connected we want to host our rest API, we want to listen and start the eexpress service once we connect to the database
  //serve assets if ijn production
});

//routes
app.get('/', (req, res) => {
  res.send('root');
});

//post new registered user
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

//post logined user
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

//Post new contact
app.post('/contacts', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const contacts = req.body;
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

//Get all contacts
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

//delete certain contact
app.delete('/contact/:user/:id', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const idOfAuser = await req.params.id;
  console.log(username);
  console.log(idOfAuser);
  const user = await User.findOne({ username }).exec();
  console.log(user);
  await Contacts.updateOne(
    { userId: user._id },
    { $pull: { contacts: { _id: idOfAuser } } }
  );
  if (!user) {
    res.status(403);
    res.json({ message: 'Invalid access' });
    return;
  }
  res.json(user);
});

//update certain contat
app.put('/contact/:user/:id', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const idOfAuser = await req.params.id;
  const { firstName, lastName, phoneNumber } = req.body;
  console.log(username);
  console.log(idOfAuser);
  const user = await User.findOne({ username }).exec();
  await Contacts.updateOne(
    { userId: user._id, 'contacts._id': idOfAuser },
    {
      $set: {
        'contacts.$.firstName': firstName,
        'contacts.$.lastName': lastName,
        'contacts.$.phoneNumber': phoneNumber,
      },
    }
  );
  if (!user) {
    res.status(403);
    res.json({ message: 'Invalid access' });
    return;
  }
  res.json(user);
});

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log('app listening' + port);
});
