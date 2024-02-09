<script>
    // Exports
    export let datacar = []; 
    export let selectedCar = " ";
    
    // Select only the unique car IDs
    let desired_output = (data) => {
        let unique_values = data
            .map((item) => item.car_id)
            .filter(
                (value, index, current_value) => current_value.indexOf(value) === index
            );
        return unique_values;
    };
    </script>
 
  
    <!-- dropdown menu -->
    <div> 
        <select class="btn btn-light dropdown-toggle" data-toggle="dropdown" bind:value={selectedCar} style="position: relative; left: 15px; top: 10px;">
            {#each desired_output(datacar) as d}
                 <option> Car {d} </option>  
            {/each} 
        </select>
       
      </div>