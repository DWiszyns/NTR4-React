const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesController = require('./controllers/NotesController');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const router = express.Router();
router.get('/notes', notesController.get_notes);
router.get('/notes/:title', notesController.get_note);
// app.post('/notes', notesController.post_note);
// app.put('/notes/:title', notesController.update_note);
// app.delete('/notes/:title', notesController.delete_note);
app.use('/api', router);


app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));