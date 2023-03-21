const mongoose = require('mongoose');
const Celebrity = require('./models/Celebrity.model');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));
  

  const celebritiesData = [
    {
      name: 'Tom Hanks',
      occupation: 'Actor',
      catchPhrase: 'Life is like a box of chocolates',
    },
    {
      name: 'Meryl Streep',
      occupation: 'Actress',
      catchPhrase: 'The greatest gift of human beings is that we have the power of empathy',
    },
    {
      name: 'Leonardo DiCaprio',
      occupation: 'Actor',
      catchPhrase: 'I’m not the kind of person who tries to be cool or trendy',
    },
    {
      name: 'Jennifer Lawrence',
      occupation: 'Actress',
      catchPhrase: 'I’m a big believer in accepting yourself and not really worrying about it',
    },
    {
      name: 'Brad Pitt',
      occupation: 'Actor',
      catchPhrase: 'I’m one of those people you hate because of genetics',
    },
  ];
  

  Celebrity.create(celebritiesData)
  .then((createdCelebrities) => console.log(`Created ${createdCelebrities.length} celebrities.`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.disconnect());
