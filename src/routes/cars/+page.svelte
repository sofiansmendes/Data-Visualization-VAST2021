<script>
    import Scatterplot from './Scatterplot.svelte';   
    
    export let data = [];


  </script>
  

  <style>
  h1 {
    position:relative;
    left:10px;
    top:10px;
    }

    h3 {
    position:relative;
    left:10px;
    top:10px;
    }  

  </style>
  

  <h1>Ana Sofia Mendes - KU Leuven - r0925549</h1>
  <h3> Overview</h3>
  
 
  <Scatterplot datapoints1={data.gps} datapoints2={data.business} datapoints3={data.stops}/>


