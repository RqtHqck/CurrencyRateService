const app = require("./app")
require('./utils/nodeCron.js');
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})