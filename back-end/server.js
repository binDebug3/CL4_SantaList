const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

let children = [];
let id = 0;
let score = 0;
let naughtyList = []
// let niceList = []


// NICE LIST

app.get('/api/niceList', (req, res) => {
    console.log("In get");
    res.send(children);
});

app.get('/api/niceList/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let childrenMap = children.map(child => {
    return child.id;
  });
  let index = childrenMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that child doesn't exist");
    return;
  }
  let child = children[index];
  res.send(child);
});

app.post('/api/niceList', (req, res) => {
  id = id + 1;
  console.log("Req Body:")
  console.log(req.body)
  console.log("Req body name:")
  console.log(req.body.name);
  let child = {
    id: id,
    name: req.body.name,
    score: req.body.score,
    good: req.body.good,
    bad: req.body.bad
  };
  console.log("Creating new nice child:")
  console.log(child);
  children.push(child);
  res.send(child);
});

app.post('/api/niceList/:id', (req, res) => {
  console.log("In post niceList");
  let id = parseInt(req.params.id);
  console.log("Add child " + id + " to the niceList")
  // check if the id is valid  
  let naughtyMap = naughtyList.map(child => {
    return child.id;
  });
  let index = naughtyMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that child doesn't exist");
    return;
  }
  let child = naughtyList[index];
  console.log("child was not in niceList")
  child.score = 1;
  children.push(child);
  console.log(child);
  res.send(child);
});

app.put('/api/niceList/:id/:score', (req, res) => {
  let id = parseInt(req.params.id);
  let score = parseInt(req.params.score);
  console.log(req.params)
  console.log("Add " + score + " of child " + id + " to the niceList")
  let childrenMap = children.map(child => {
    return child.id;
  });
  let index = childrenMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that child is not in the niceList!");
    return;
  }
  let child = children[index];
  console.log("This is the child I found to edit score");
  console.log(child)
  if (score <= 0) {
    child.score = 0;
  }
  else {
    child.score = score;
  }
  res.send(child);
});

app.delete('/api/niceList/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = children.map(child => {
      return child.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that child doesn't exist");
    return;
  }
  children.splice(removeIndex, 1);
  res.sendStatus(200);
});




// NAUGHTY LIST 
app.get('/api/naughtyList', (req, res) => {
    console.log("In get naughtyList");
    console.log(naughtyList)
    res.send(naughtyList);
}); 

app.post('/api/naughtyList', (req, res) => {
  id = id + 1;
  console.log("Req Body:")
  console.log(req.body)
  console.log("Req body name:")
  console.log(req.body.name);
  let child = {
    id: id,
    name: req.body.name,
    score: req.body.score,
    good: req.body.good,
    bad: req.body.bad
  };
  console.log("Creating new naughty child:")
  console.log(child);
  naughtyList.push(child);
  res.send(child);
});
app.post('/api/naughtyList/:id', (req, res) => {
  let id = parseInt(req.params.id);
  console.log("Add child " + id + " to the naughtyList")
  // check if the id is valid  
  let childrenMap = children.map(child => {
    return child.id;
  });
  let index = childrenMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that child doesn't exist");
    return;
  }
  let child = children[index];
  
  // check if the child is already in the naughtyList
  let prodsMap = naughtyList.map(child => {
    return child.id;
  });
  let pindex = prodsMap.indexOf(id);
  
  // add child to the naughtyList
  if (pindex === -1) {
    console.log("child was not in naughtyList")
    child.score = 1;
    naughtyList.push(child);
  }
  else {
    child.score += 1;
  }
  console.log(child);
  res.send(child);
});

app.put('/api/naughtyList/:id/:score', (req, res) => {
  let id = parseInt(req.params.id);
  let score = parseInt(req.params.score);
  console.log(req.params)
  console.log("Add " + score + " of child " + id + " to the naughtyList")
  let childrenMap = naughtyList.map(child => {
    return child.id;
  });
  let index = childrenMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that child is not in the naughtyList!");
    return;
  }
  let child = naughtyList[index];
  console.log("This is the child I found to edit score");
  console.log(child)
  if (score >= 0) {
    child.score = 0;
  }
  else {
    child.score = score;
  }
  res.send(child);
});

app.delete('/api/naughtyList/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = naughtyList.map(child => {
      return child.id;
    })
    .indexOf(id);
  console.log("Remove child " + id + " from position " 
              + removeIndex + " in the naughtyList")
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that child doesn't exist");
    return;
  }
  naughtyList.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
