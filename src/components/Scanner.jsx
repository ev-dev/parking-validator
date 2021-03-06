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
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start()
    })

    Quagga.onDetected(data => {
      if (!data) console.error('')
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
