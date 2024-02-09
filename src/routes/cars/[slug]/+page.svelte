<script>
    import Car from "./Car.svelte";
    export let data;

    

    $: id = data.carstop[0].car;
</script>


<!-- Navigation Bar (Car Overview, Next Car and Previous Car links) -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a style="position: relative; left: 15px; top: -2px;"  class="navbar-brand" href="/cars/{id}">Navigation Bar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>


<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" style="position: relative; left: 20px; top: 0px;" href="/cars"> Car overview </a> 
      </li>
      {#if id == 1}
        <li class="nav-item">
            <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id + 1}"> Next car</a>
        </li>
    {:else if id == 107} 
        <li class="nav-item">
            <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id - 1}"> Previous car</a> 
        </li>
    {:else if id == 35}
        <li class="nav-item">
            <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id - 1}"> Previous car</a> 
        </li>   
        <li class="nav-item">
            <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id + 66}"> Next car</a> 
        </li>
    {:else if id == 101}
    <li class="nav-item ">
        <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id - 66}"> Previous car</a>  
    </li>
    <li class="nav-item "> 
        <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id + 3}"> Next car</a> 
    </li>
    {:else if id == 104}
    <li class="nav-item ">
        <a style="position: relative; left: 20px; top: 0px;" class="nav-link"  href="/cars/{id - 3}"> Previous car</a> 
    </li>
    <li class="nav-item ">  
        <a  style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id + 1}"> Next car</a>
    </li>
    {:else}
    <li class="nav-item ">
        <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id - 1}"> Previous car</a>   
    </li>
    <li class="nav-item">
        <a style="position: relative; left: 20px; top: 0px;" class="nav-link" href="/cars/{id + 1}"> Next car</a> 
    </li>
    {/if}
    </ul>
</div>
</nav>





<style>
    h1 {
      position:relative;
      left:10px;
      top:10px;
      }
  
      h3 {
      position:relative;
      left:10px;
      top:15px;
      }  
  
    </style>

<h1>Ana Sofia Mendes - KU Leuven - r0925549</h1>
<h3> Details for car {id}</h3>

<Car car={data.gps} stop={data.carstop}/>
