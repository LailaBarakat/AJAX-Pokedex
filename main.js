



let pokeContainer = document.getElementById("poke-container");

document.getElementById("poke-name").addEventListener("change", function (){
    let input = document.getElementById("poke-name").value
    let api_url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    async function poke_api(){
        let api = await fetch(api_url);
        let data = await api.json();
        console.log(data);
        let pokeID = data.id
        let evolutionApi = await fetch (`https://pokeapi.co/api/v2/evolution-chain/${pokeID}/`);
        let evolutionData = await evolutionApi.json();
        console.log(evolutionData)

        document.getElementById("poke-photo").src = data.sprites.front_shiny




    }
    poke_api();

})