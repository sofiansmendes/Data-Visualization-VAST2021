<script>
    // Imports
    import { scaleOrdinal } from "d3-scale";
    import Controls from './Controls.svelte';  
    
    // Exports
    export let selectedCar = " ";
    export let datapoints1 = [];
    export let datapoints2 = [];
    export let selectedCarId;

    // Points of interest - types
    const types=["catering", "domestic", "housing", "professional", "other"];
  
    // Color Scale
    const cScale = scaleOrdinal(["green","purple","royalblue","red","orange"]).domain(types);

    // Rescale GPS data
    $: rescale = function(x, domain_min, domain_max, range_min, range_max) {
      return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
    }
  
    // Select number of the car from SelectedCar
    $: selectedCarId = selectedCar ? parseInt(selectedCar.slice(4)) : null;

  </script>
  
  <style>
    circle.one {
      opacity: 0.05;
      fill: black;
    }
    circle.car {
      opacity: 0.7;
      fill: red;
    }
    circle.two {
      opacity: 1;
    }
  </style>
  
<div style="display: flex; align-items: center;">
  <p style="position: relative; left: 10px; top: 15px;">Select a car to highlight: </p>
  <Controls datacar={datapoints1} bind:selectedCar/>
</div>
  
     
  {#if selectedCar != " "}
      <p style="position: relative; left: 10px; top: 3px;"> Go to  <a href="./cars/{selectedCarId}"> details </a> for car {selectedCarId}. </p>
  {/if}

  <!-- black GPS points -->
  <svg width=700 height=700 style="position: absolute; left: 10px; top: 150px;">
    <g transform="translate(50,50)">
    {#each datapoints1 as dat}
           <circle cx={rescale(dat.long, 24.82587, 24.90836, 0, 600)}
            cy={rescale(dat.lat, 36.04802, 36.08961, 600, 0)}
            r={2}
            class="one"
            ></circle>         
  {/each}
  {#each datapoints2 as dat2}
  <!-- points of interest -->
  <circle 
          class="two"
          cx={rescale(dat2.long, 24.82587, 24.90836, 0, 600)}
          cy={rescale(dat2.lat, 36.04802, 36.08961, 600, 0)}
          r={5}
          fill={cScale(dat2.type)}
          > <title> {dat2.name} </title> </circle> 
  {/each}
  <!-- red GPS points of the selected car -->
  {#each datapoints1 as dat1}
    {#if dat1.car_id == selectedCarId}
    <circle
      cx={rescale(dat1.long, 24.82587, 24.90836, 0, 600)}
      cy={rescale(dat1.lat, 36.04802, 36.08961, 600, 0)}
      r={2}
      class="car"
    /> 
    {/if}
  {/each}
  </g>
</svg>

  