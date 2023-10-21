const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Mydatabase/Tvshows', {useNewUrlParser: true});

const tvshowsSchema = new mongoose.Schema({
  "title": String,
  "genre": String,
  "year": Number,
  "rating":Number,
  "network": String
  });
  
  const Tvshows = mongoose.model('Tvshowsr', tvshowsSchema);

  app.post('/tvshows', (req, res) => {
    let newPlayer = new Tvshows(req.body);

  newPlayer.save()
  .then((savedTvshows) => {
    res.status(201).send(savedTvshows._id);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
  });
  

  // Update a player
  app.put('/Tvshows/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((Tvshows) => {
        res.send(tvshows);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  


  // Delete a show
  app.delete('/tvshow/:id', (req, res) => {
    Player.findByIdAndRemove(req.params.id).then((tvshow) => {
        res.send("Tvshow deleted");
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  
  app.get('/players/byrating/:rating', (req, res) => {
    Player.find({ rating: req.params.rating})
      .then((tvshows) => {
        res.send(tvshows);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  app.get('/tvshows', (req, res) => {
    Player.find()
      .then((tvshows) => {
        res.send(tvshows);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  


  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });