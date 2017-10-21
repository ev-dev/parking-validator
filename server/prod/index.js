const path = require('path')
  , express = require('express')
  , app = express()

app
  /* --- API Server --- */
  // .use(bodyParser.urlencoded({
  //   extended: true
  // }))
  // .use(bodyParser.json())

  // .use('/api', require('./api'))


  .get('/bundle.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'bundle.js'))
  })

  .use((req, res, next) => {
    if (path.extname(req.path).length > 0) res.status(404).end()
    else next(null)
  })

  .get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  })

  .use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500)
      .send(err.message || 'Internal Server Error.')
  })

const PORT = 80
app.listen(PORT, () => {
  console.log(`
    - Production Server Running on Port ${PORT} -
  `)
})