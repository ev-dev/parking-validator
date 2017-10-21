import Quagga from 'quagga'

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#scanner')
  },
  decoder: {
    readers: ["code_128_reader"]
  }
}, function (err, data) {
  if (err) {
    console.log(err);
    return
  }
  console.log("Initialization finished. Ready to start");
  console.log()
  Quagga.start();
});