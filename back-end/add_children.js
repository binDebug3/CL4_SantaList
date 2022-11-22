const axios = require("axios");

const children = require("./children.js");

const baseURL = "http://localhost:3000";

children.forEach(async (child) => {
  const response = await axios.post(`${baseURL}/api/niceList`, child);
  if (response.status != 200)
    console.log(`Error adding ${child.name}, code ${response.status}`);
});
