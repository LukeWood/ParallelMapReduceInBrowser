# ParallelMapReduceInBrowser
This repository let's you parallelize code easily in the browser to prevent expensive computation from blocking the primary rendering thread.  This is done using the mapreduce paradigm.

### Simple Example
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/dist/mapreduce.min.js"></script>
  </head>
  <body>
    <script>
      var data = new mapreduce([1,2,3,4,5,6,7,8,9,10,11,12,13]);
      document.body.innerHTML ="Original Data: " + data.toArray().toString();
      data.map(x => x * x)
      .then(data => {
      var result = ("After mapping: "+ data.toArray());
      document.body.innerHTML += "<br>" + result.toString()
      return data;
      }).then(data => {
      document.body.innerHTML += "<br>Performing Reduction: x + y";
      return data.reduce((x, y) => x + y);
      }).then(result => {
      document.body.innerHTML += "<br>Result: "+ result;
      });
    </script>
  </body>
</html>
```
