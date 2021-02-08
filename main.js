



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

        document.getElementById("poke-ID").innerHTML = data.id


        let moves = data.moves

        document.getElementById("target").innerHTML = ""


        for (let i = 0; i<4; i++){

            let clone = template.content.cloneNode(true);
            clone.querySelector(".move").innerText = moves[i].move.name
            document.getElementById("target").appendChild(clone)
        }


    if (evolutionData.chain.evolves_to.length > 0){
        document.getElementById("poke-evolution").innerHTML = evolutionData.chain.evolves_to[0].species.name
    }    else {
        document.getElementById("poke-evolution").innerHTML = "no revolutions"
    }



    }
    poke_api();

})