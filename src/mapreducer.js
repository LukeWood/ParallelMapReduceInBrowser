goog.require("LoadAssigner");

/**
 * This class handles workloads in parralel on multiple cores
 * @constructor
 */
function mapreducer(data) {
  const cores = navigator.hardwareConcurrency;

  function startWorker(data, blobURL) {
    const worker = new Worker(blobURL);
    worker.postMessage(data);
    return worker;
  }

  function map(fn) {
    let workloads = assignWorkloads(data,cores);
    let results = [];
    let blobURL = window.URL.createObjectURL(new Blob([
      `onmessage = function(event){
        let result = [];
        var fn = ${fn.toString()};
        for(let i = 0; i < event.data.length; i++) {
          result.push(fn(event.data[i]));
        }
        self.postMessage(result);
      }`
    ]));
   return new Promise((resolve, reject) => {
       let completed = 0;
       function task_complete(event) {
         Array.prototype.push.apply(results,event.data);
         if(++completed === cores) {
           resolve(new mapreducer(results));
         }
       }
       for(let i = 0; i < cores; i++) {
         let worker = startWorker(workloads[i], blobURL);
         worker.addEventListener('message', task_complete);
       }
    });


  }

  function reduce() {

  }

  function toArray(){
    return data;
  }

  this.map = map;
  this.reduce = reduce;
  this.toArray = toArray;
}
