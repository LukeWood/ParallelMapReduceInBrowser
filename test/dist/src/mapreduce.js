goog.require("LoadAssigner");

/**
 * This class handles workloads in parralel on multiple cores
 * @constructor
 */
function mapreduce(data) {
  const cores = navigator.hardwareConcurrency;
  const workloads = assignWorkloads(data,cores);

  function startWorker(data, blobURL) {
    const worker = new Worker(blobURL);
    worker.postMessage(data);
    return worker;
  }

  function map(fn) {
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
           resolve(new mapreduce(results));
         }
       }
       for(let i = 0; i < cores; i++) {
         let worker = startWorker(workloads[i], blobURL);
         worker.addEventListener('message', task_complete);
       }
    });
  }

  function reduce(fn) {
    let results = [];
    let blobURL = window.URL.createObjectURL(new Blob([
      `onmessage = function(event){
        let fn = ${fn.toString()};
        if(event.data.length < 2) {
          return event.data.length == 1 ? event.data[0] : null;
        }
        let result = fn(event.data[0], event.data[1]);
        for(let i = 2; i < event.data.length; i++) {
          result = fn(result, event.data[i]);
        }
        self.postMessage(result);
      }`
    ]));
    
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;
        function task_complete(event) {
          results.push(event.data);
          console.log("COMPLETE")
          if(++completed === cores) {
            if(results.length == 1){
              return results[0];
            } else if(results.length == 0){
              return null;
            }
            let result = fn(results[0], results[1]);
            for(let i = 2; i < results.length; i++) {
              result = fn(result, results[i]);
            }
            resolve(result);
          }
        }
        for(let i = 0; i < cores; i++) {
          let worker = startWorker(workloads[i], blobURL);
          worker.addEventListener('message', task_complete);
        }
     });
  }

  function toArray(){
    return data;
  }

  this.map = map;
  this.reduce = reduce;
  this.toArray = toArray;
}
