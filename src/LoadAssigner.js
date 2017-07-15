goog.provide("LoadAssigner");

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
