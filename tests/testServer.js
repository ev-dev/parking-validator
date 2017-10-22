const path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  axios = require('axios'),
  app = express()

const token = 'Bearer JFWJVLPWG3joEV5iY_nSUurd4CxsVAQTfJKlIA-NvM3jPCgOMfwEGwdCygtVGwuAE-jMCioe3Zum-wVDo3V0dNlB3kf1aUS_KV6YsAuxMkcgqep9sbpgzARLPklKKX9h1iW-wgRmZRDYSHm18r5tqvpLbJoH-SBxFGSBcrPoKKQ'

const testBarcode = "21945001497552"

app
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())


  .get('/auth', (req, res, next) => {
    //@ts-ignore
    axios({
      method: 'post',
      url: 'https://catalog.princetonlibrary.org/iii/sierra-api/v1/token',
      headers: {
        'Authorization': 'Basic Q1BiNVZhbTFpNXpwQzlPdVcvb2RNSmdPV3J4WTpwYXJraW5ndmFsaWRhdGlvbg==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'grant_type': 'client_credentials'
      },
      responseType: 'json'
    })
      .then(res => res.data)
      .then(auth => {
        console.log('Auth Response: ', auth)
        res.json(auth)
      })
      .catch(next)
  })

  .get('/validateUser/:barcode', (req, res, next) => {
    // @ts-ignore
    axios({
      method: 'post',
      url: 'https://catalog.princetonlibrary.org/iii/sierra-api/v4/patrons/query',
      headers: {
        'Authorization': token
      },
      params: {
        offset: 0,
        limit: 1000
      },
      data: {
        "target": {
          "record": { "type": "patron" },
          "field": { "tag": "b" }
        },
        "expr": {
          "op": "equals",
          "operands": [req.params.barcode]
        }
      }
    })
      // entries[0] assumes one ID per user which may not be guaranteed
      .then(res => res.data.entries[0].link)
      .then(userURL => {
        const userArr = userURL.split('/')
        const userId = userArr[userArr.length - 1]
        return userId
      })
      .then(userId => {
        // @ts-ignore
        axios({
          method: 'get',
          url: `https://catalog.princetonlibrary.org/iii/sierra-api/v4/patrons/${userId}`,
          headers: {
            'Authorization': token
          },
          responseType: 'json'
        })
        .then(res => res.data.expirationDate)
        .then(expDate => {
          console.log('expDate', expDate);
          const now = new Date()
          const nowArr = [
              now.getMonth() + 1
            , now.getDate()
            , now.getFullYear()
          ].join('-')
          const flooredDate = new Date(nowArr)   
          const compareDate = new Date(expDate.split('-'))
          
          if (compareDate <= flooredDate) {
            res.json({ 
              status: 'Unable to Validate!',
              message: `Your card expires on ${expDate}`
            })
          } else {
            res.json({
              status: 'Validation Successful!',
              message: `Your card expires on ${expDate}`
            })
          }
      })
      .catch(next)
  })
})



  // .get('/getUserById', (req, res, next) => {
  //   const test = "1089959"
  //   // @ts-ignore
  //   axios({
  //     method: 'get',
  //     url: `https://catalog.princetonlibrary.org/iii/sierra-api/v4/patrons/1089959`,
  //     headers: {
  //       'Authorization': token
  //     },
  //     responseType: 'json'
  //   })
  //     .then(res => res.data)
  //     .then(user => {
  //       console.log('User: ', user)
  //       res.json(user)
  //     })
  //     .catch(next)
  // })
  
  // .get('/getUsers', (req, res, next) => {
  //   // @ts-ignore
  //   axios({
  //     method: 'get',
  //     url: 'https://catalog.princetonlibrary.org/iii/sierra-api/v4/patrons',
  //     headers: {
  //       'Authorization': token
  //     },
  //     params: {
  //       offset: 1000,
  //       limit: 1000,
  //       fields: ['a']
  //     },
  //     responseType: 'json'
  //   })
  //     .then(res => res.data)
  //     .then(user => {
  //       console.log('Users: ', user)
  //       res.json(user)
  //     })
  //     .catch(next)
  // })

  // .get('/getMeta', (req, res, next) => {
  //   // @ts-ignore
  //   axios({
  //     method: 'get',
  //     url: 'https://catalog.princetonlibrary.org/iii/sierra-api/v4/patrons/metadata',
  //     headers: {
  //       'Authorization': token
  //     },
  //     responseType: 'json'
  //   })
  //     .then(res => res.data)
  //     .then(meta => {
  //       console.log('metadata: ', meta)
  //       res.json(meta)
  //     })
  //     .catch(next)
  // })



const PORT = 5555
const chalk = require('chalk')
app.listen(PORT, () => {
  const name = chalk.red.bold('[Server]')
  const url = chalk.cyan.bold(`http://localhost:`)
  const listen = chalk.yellow.bold('Listening')

  console.log(`
  ${name} - ${listen} - ${url}${chalk.yellow(PORT)}
  `)
})
