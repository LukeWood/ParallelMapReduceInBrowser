goog.provide("LoadAssigner");

/**
  * This is a naive implementation of a workload assigner.
  * This is responsible for assigning the workload to each worker.
  * @param {Array} data array of all of the data to process
  * @param {Number} cores  number of Workers we are going to start
  */
function assignWorkloads(data, cores) {
  let workloads = [];
  for(let i = 0; i < cores; i++) {
    workloads.push([]);
  }
  for(let i = 0; i < data.length; i++ ){
    workloads[Math.floor(i/cores)].push(data[i]);
  }
  return workloads;
}
