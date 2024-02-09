<script>
    // Imports
    import { scaleLinear } from 'd3-scale';
    import { scaleOrdinal } from "d3-scale";

    // Exports
    export let car = [];
    export let stop = [];
    
    // Car ID of the car selected previously
    $: id = car[0].car_id;

    // Rescale for the left figure
    const rescale = function(x, domain_min, domain_max, range_min, range_max) {
      return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
    }

    // For the slider
    let sliderValue = 0;
    $: startTime = sliderValue - 15; 
    $: endTime = sliderValue + 15;

    const days = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    // Scales for the right figure
    const yScale = scaleLinear()
      .domain([6, 19]) 
      .range([0, 280]);
    
    const xScale = scaleLinear()
      .domain([0, 86400])
      .range([0, 350]);

    const colorScale = scaleOrdinal()
      .domain(["catering", "domestic", "housing", "other", "professional"])
      .range(["green", "purple", "royalblue", "orange", "red"]);

    // For the black bar
    $: sliderDay = Math.floor(sliderValue/1440 +6);
    $: sliderSeconds = (sliderValue - 1440*(sliderDay - 6))*60
        
    // Find min and max values for latitude and longitude of the selected car 
    $: maxLong = Math.max(...car.map(e => e.long));  
    $: minLong = Math.min(...car.map(e => e.long));   

    $: maxLat = Math.max(...car.map(e => e.lat));  
    $: minLat = Math.min(...car.map(e => e.lat));      
</script>


<!-- slider -->
<input type="range" min="0" max="20160" bind:value="{sliderValue}" style="width: 400px; position: relative; left: 10px; top: 20px;"/>


<!-- left figure -->
<svg style="position: absolute; left: 50; top: 250;" width=350 height=350>
  <g>
  <!-- GPS location of the selected car -->
  {#each car as dat}
      <circle cx={rescale(dat.long, minLong, maxLong, 0, 300)}
      cy={rescale(dat.lat, minLat, maxLat, 300, 0)}
      r=2 
      opacity=0.5
      fill=royalblue
      ></circle>         
  {/each}
  <!-- red points -->
  {#each car as gpsData}
    {#if gpsData.cumulative_minute_total > startTime}
    {#if gpsData.cumulative_minute_total < endTime}
      <circle
        cx={rescale(gpsData.long, minLong, maxLong, 0, 300)}
        cy={rescale(gpsData.lat, minLat, maxLat, 300, 0)}
        r=4
        fill="red"
        opacity={1}
      /> 
    {/if}
    {/if}
  {/each}
  </g>
</svg>


<!-- right figure -->
<svg style="position: absolute; left: 500; top: 250;" width="400" height="400" >
  <g transform="translate(25,0)">
    {#each stop as Stops}
    {#each days as day}
   {#if Stops.start.day == day}
    <rect
      x={xScale(Stops.start.time)}
      y = {yScale(Stops.start.day)}
      width={xScale(Stops.end.time - Stops.start.time)}
      height="20"
      fill={colorScale(Stops.location.location_type)} > 
      <title> {Stops.start.time} - {Stops.end.time}: {Stops.location.name} ({Stops.location.location_type}) </title>
    </rect>
    {/if}
  {/each}
  {/each}

  <!-- black bar -->
  <rect
  x={xScale(sliderSeconds)-2}
  y = {yScale(sliderDay)}
  width="4"
  height="20"
  fill={"black"}
  />

  <!-- axis of the time blocks -->
  <line x1=0 y1=50 x2=0 y2=315 stroke="lightgrey"/>
  <line x1=87.5 y1=0 x2=87.5 y2=315 stroke="lightgrey"/>
  <line x1=175 y1=0 x2=175 y2=315 stroke="lightgrey"/>
  <line x1=262.5 y1=0 x2=262.5 y2=315 stroke="lightgrey"/>
  <line x1=350 y1=0 x2=350 y2=315 stroke="lightgrey"/>
</g>

{#each days as day}
  {#if day < 10}
  <text x=8 y={yScale(day)+15} style="font-size: 14px"> {day} </text>
  {:else}
  <text x=0 y={yScale(day)+15} style="font-size: 14px"> {day} </text>
  {/if}
{/each}

<text x=21 y=330 style="font-size: 14px"> 0 </text>
<text x=109 y=330 style="font-size: 14px"> 6 </text>
<text x=192 y=330 style="font-size: 14px"> 12 </text>
<text x=279 y=330 style="font-size: 14px"> 18 </text>
<text x=367 y=330 style="font-size: 14px"> 24 </text>

</svg>