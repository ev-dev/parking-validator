import React, { Component } from 'react'
import Quagga from 'quagga'

import { barcodeType } from '../config'

class Scanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  componentDidMount() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner')
      },
      decoder: {
        readers: [ barcodeType ]
      }
    }, function (err, data='DEFAULT') {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      console.log('data in init', data)
      Quagga.start()
    })

    Quagga.onDetected((err, data) => {
      if (err) console.log('Error...', err)
      else console.log('Barcode Detected!...', data)
    })
  }

  render() {
    return (
      <div className='scanner-container'>
        <div id='scanner'></div>
      </div>
    )
  }
}

export default Scanner
