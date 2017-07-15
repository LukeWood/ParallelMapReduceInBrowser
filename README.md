# ParallelMapReduceInBrowser
This repository let's you parallelize code easily in the browser to prevent expensive computation from blocking the primary rendering thread.  This is done using the mapreduce paradigm.

### Simple Example
```html
<script src="/dist/mapreduce.min.js"></script>
<script>
var data = new mapreduce([1,2,3,4,5,6,7,8,9,10,11,12,13]);
data.map(x => x * x)
.then(data => {
  return data.reduce((x,y) => x + y);
})
.then(result => {
  console.log("The result for squaring and adding #s 1-13 is: ", result);
});
</script>
```
