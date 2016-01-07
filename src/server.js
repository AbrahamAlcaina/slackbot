import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './slackbot';

const app = express();
app.set('port', process.env.PORT || 1337);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req, res) => res.send('up & runnig'));

const server = app.listen(app.get('port'), () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App is running. Navigate to http://${host}:${port}`);
});
