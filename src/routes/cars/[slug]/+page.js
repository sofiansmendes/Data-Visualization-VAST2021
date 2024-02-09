/** @type {import('./$types').PageLoad} */

export const load = ({ fetch, params }) => {  
    const fetchStop = async () => {
      const res = await fetch('https://vda-lab.github.io/assets/vast2021_carstops.json')
      const data = await res.json()
      data.forEach((d) => { d.car})
      let data_for_slug = data.filter((d) => { return d.car == params.slug})
      return data_for_slug
    }

 
      const fetchGPS = async () => {
        const res = await fetch('https://vda-lab.github.io/assets/vast2021_gps_coordinates.json')
        const data = await res.json()
        data.forEach((d) => { d.car_id })
        let data_for_slug = data.filter((d) => { return d.car_id == params.slug})
        return data_for_slug
      }

  
    return {
      carstop: fetchStop() ,
      gps: fetchGPS()
    }
}
