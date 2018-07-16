var ipfs = window.IpfsApi('https://ipfs.infura.io', '5001')






// function addFiles(file){
//     const reader = new window.FileReader()
//     console.log("Object =====> " + JSON.stringify(file))
//     var buf = Buffer(file)
   
//     ipfs.files.add(buf, (error, result) => {
//         if(error) {
//           console.error(error)
//           return
//         }
//         console.log(result[0].hash)
//         this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
//           return this.setState({ ipfsHash: result[0].hash })
//           console.log('ifpsHash', this.state.ipfsHash)
//         })
//       })
// }
