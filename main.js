let pokeContainer = document.getElementById("poke-container");

document.getElementById("poke-name").addEventListener("change", function () {
    let input = document.getElementById("poke-name").value
    let api_url = `https://pokeapi.co/api/v2/pokemon/${input}`;

    async function poke_api() {
        let api = await fetch(api_url);
        let data = await api.json();
        console.log(data);
        let pokeID = data.id
        let species_url = data.species.url;
        console.log(data.species.url);
        let evolutionApi = await fetch(species_url);
        let evolutionData = await evolutionApi.json();
        console.log(evolutionData);
        let pokemon_evol = evolutionData.evolves_from_species;


        document.getElementById("poke-photo").src = data.sprites.front_shiny


        document.getElementById("poke-ID").innerHTML = data.id + " " + data.name;

        



        let moves = data.moves;
        document.getElementById("target").innerHTML = "";
        for (let i = 0; i < 4; i++) {
            let clone = template.content.cloneNode(true);
            clone.querySelector(".move").innerText = moves[i].move.name;
            document.getElementById("target").appendChild(clone);
        }

        let evolution = document.querySelector("div h4");
        let evolution_image = document.getElementById("poke_evolve_from");

        //console.log(pokemon_evol, null, pokemon_evol==null)
        if (pokemon_evol !== null){
            evolution_image.src = await get_photo_url(pokemon_evol.name) //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png" ;
            evolution.innerText = pokemon_evol.name;

        } else {
            evolution_image.src = ""
            evolution.innerText = "No previous evolution to show!"

       
        }

        async function fetch_evolve_image() {
            let fetch_url = pokemon_evol.url;
            let evolve_api = await fetch(fetch_url);
            let evolve_data = await evolve_api.json();
            let previous_evolution_url = evolve_data.varieties[0].pokemon.url;

            async function fetchEvIm() {
                let evolve_api2 = await fetch(previous_evolution_url);
                let evolve_data2 = await evolve_api2.json();
                evolution.innerHTML = pokemon_evol.name;
                evolution_image.src = evolve_data2.sprites.front_shiny;

            }

            await fetchEvIm();
        }

    }

    async function get_photo_url(poke_name){
        let api_url = `https://pokeapi.co/api/v2/pokemon/${poke_name}`;
        console.log(api_url)
        let api = await fetch(api_url);
        let data = await api.json();
        console.log("function Result = " + data.sprites.front_shiny)
        return data.sprites.front_shiny
    }

    console.log(get_photo_url("charmander"))



    poke_api();

})


