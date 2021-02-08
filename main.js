let api_url = "https://pokeapi.co/";
async function poke_api(){
    let api = await fetch(api_url);
    let data = await api.json();
    console.log(data);
}
poke_api();