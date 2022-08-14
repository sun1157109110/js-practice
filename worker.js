self.onmessage = (e)=>{
  console.log(e.data);
}
self.postMessage('我是worker线程')
// self.close();