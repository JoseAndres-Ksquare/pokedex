const pokeName = document.getElementById("poke-name");
const pokeSprite = document.getElementById("poke-sprite");
const pokeTypes = document.getElementById("poke-types");
const pokeAttack = document.getElementById("poke-attackValue");
const pokeHp = document.getElementById("poke-hp");
const pokeDefense = document.getElementById("poke-defenseValue");
const pokeSpeed = document.getElementById("poke-speedValue");
const pokemon = document.getElementById("pokemon").value;
const pokemonID = document.querySelector(".aSelec");
const pokeContainer = document.getElementById("poke-dex1");
const test = document.getElementById("poke-card1");
const test2 = document.getElementById("idTest");
const pokeEl = document.querySelector(".test");

const fetchPokemons = async (n) => {
  for (let i = 1; i <= n; i++) {
    await generatePokemon(i);
  }
};

const generatePokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/` + id.toString();
  const res = await fetch(url);
  const data = await res.json();
  if (id !== "0") {
    createPokeCard(data);
  }
};
const refresh = () => {
  test.style.display = "none";
  pokeContainer.style.display = "";
};

const createPokeCard = (data) => {
  const { name, sprites, types, stats } = data;
  let type = data.types[0].type.name;
  const pokeEl = document.createElement("div");
  pokeEl.classList.add("poke-card");
  pokeEl.classList.add("test");
  pokeEl.setAttribute("id", "idTest");
  pokeEl.classList.add("visibility2");
 
  if(types.length > 1 ){
    type = `${types[0].type.name}, ${types[1].type.name}`  
  }


  const pokeInnerHtml = `
        
        <div class="container-name">
        
            <a target="blank" class="name" href="https://www.wikidex.net/wiki/${name}" style="color: black; 
            text-decoration: none; text-transform: capitalize;"><h3>${name}</h3></a>
        </div>
        <div class="container-sprite">
            <img class="sprite" src="${sprites.front_default}" >
        </div>
        <div class="container-types">
            <span class="type" href="">${type}</span>
        </div>
        <br>
        <div class="content">

        
        <div class="container-attack">
        <span>Attack </span>
            <span class="attack" href="">${stats[1].base_stat}</span>
        </div>
        <div class="container-hp">
        <span>HP </span>
        <span class="hp" href="">${stats[0].base_stat}</span>
    </div>
        
        <div class="container-defense">
        <span>Defense </span>
            <span class="defense" href="">${stats[2].base_stat}</span>
        </div>
        
        <div class="container-speed">
        <span>Speed </span>
            <span class="speed" href="">${stats[5].base_stat}</span>
        </div>
        </div>
   
    `;

  pokeEl.innerHTML = pokeInnerHtml;
  pokeContainer.appendChild(pokeEl);

  return;
};

const getPokemonData = async () => {
  const pokemon = document.getElementById("pokemon").value;
  if (pokemon === "" && pokemon.value === undefined) {
    getPokemonDataRandom();
  } else {
    test.style.display = "block";
    pokeContainer.style.display = "none";
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let data = await res.json();
    let types = data.types;
    pokeName.innerText = `${data.name}`;
    pokeSprite.src = `${data.sprites.front_default}`;
    if (types.length > 1 && types.length < 3) {
      pokeTypes.innerText = `${data.types[0].type.name}, ${data.types[1].type.name}`;
    } else {
      pokeTypes.innerText = `${data.types[0].type.name}`;
    }
    pokeAttack.innerText = `${data.stats[1].base_stat}`;
    pokeHp.innerText = `${data.stats[0].base_stat}`;
    pokeDefense.innerText = `${data.stats[2].base_stat}`;
    pokeSpeed.innerText = `${data.stats[5].base_stat}`;
    pokemonID.href = `https:/www.wikidex.net/wiki/${pokemon}`;
  }
};

const getPokemonDataRandom = async () => {
  test.style.display = "block";
  pokeContainer.style.display = "none";
  let id = Math.floor(Math.random() * 200);
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await res.json();
  pokeName.innerText = `${data.name}`;
  pokeSprite.src = `${data.sprites.front_default}`;
  let types = data.types;
  if (types.length > 1 && types.length < 3) {
    pokeTypes.innerText = `${data.types[0].type.name}, ${data.types[1].type.name}`;
  } else {
    pokeTypes.innerText = `${data.types[0].type.name}`;
  }
  pokeAttack.innerText = `${data.stats[1].base_stat}`;
  pokeHp.innerText = `${data.stats[0].base_stat}`;
  pokeDefense.innerText = `${data.stats[2].base_stat}`;
  pokeSpeed.innerText = `${data.stats[5].base_stat}`;
  pokemonID.href = `https:/www.wikidex.net/wiki/${data.name}`;
};
fetchPokemons(12);
