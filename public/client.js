// container per i pokemon
 const pokemonContainer = document.getElementById('pokemon-list');

 async function fetchPokemon() {
     try {
         const response = await fetch('/api/pokemon');
         const result = await response.json();
         
         if (result.success) {
             // per ogni pokemon nella lista                  
             result.data.results.forEach(pokemon => { 

                 // creo un container per ogni pokemon immagine e nome del pokemon
                 const pokemonElement = document.createElement('a');
                 const pokemonImage = document.createElement('img');

                 
                 let pokemon_id = pokemon.url.split('/')[6]; 
                 let pokemon_img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_id}.png`;                            

                 // nome del pokemon e link alla pagina del pokemon
                 pokemonElement.textContent = pokemon.name;
                 pokemonElement.href = "#";
                 pokemonElement.addEventListener('click', () => 
                     mostra_pokemon(
                         pokemon.name,
                         pokemon_img,
                         pokemon_id
                     )
                 );

                 // immagine del pokemon
                 pokemonImage.src = pokemon_img;
               

                 pokemonElement.appendChild(pokemonImage);
                 pokemonContainer.appendChild(pokemonElement);
 
             });

         } else {
             throw new Error('Failed to load Pokemon data');
         }
     } catch (error) {
         console.error('Error:', error);
         document.getElementById('pokemon-list').textContent = 'Error loading Pokemon';
     }
 }



 // creo una pagina a parte per ogni pokemon che mostra i dati:
 // nome, immagine, tipo, abilità, statistiche, ecc.
 async function mostra_pokemon(nome, img, id) {
     try {
         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
         const pokemonData = await response.json();
 
         pokemonContainer.innerHTML = ''; // pulisco il container

         // prendo il primo tag h1 della pagina e gli do il nome del pokemon
         const pokemon_name_header = document.getElementsByTagName('h1')[0]; 
         pokemon_name_header.textContent = nome;

         // creo i tag per le informazioni del pokemon
         const pokemonImage = document.createElement('img');
         const pokemonId = document.createElement('p');
         const pokemonType = document.createElement('p');
         const pokemonAbilities = document.createElement('p');

         // prendo l'immagine del pokemon
         pokemonImage.src = img;
         pokemonImage.alt = nome;
         
         // prendo l'id del pokemon
         pokemonId.textContent = `ID: ${id}`;

         // prendo il tipo del pokemon
         const types = pokemonData.types.map(type => type.type.name).join(', ');
         pokemonType.textContent = `Tipo: ${types}`;

         // prendo le abilità del pokemon
         const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
         pokemonAbilities.textContent = `Abilità: ${abilities}`;

         // append elements to container
         pokemonContainer.appendChild(pokemonImage);
         pokemonContainer.appendChild(pokemonId);
         pokemonContainer.appendChild(pokemonType);
         pokemonContainer.appendChild(pokemonAbilities);
    
     } catch (error) {
         console.error('Error:', error);
         document.getElementById('pokemon-list').textContent = 'Error loading Pokemon';
     }
 }



 
// cerca un pokemon specifico tramite nome e mostra suggerimenti mentre l'utente scrive
const search = document.getElementById("pokemon_search");

function cerca_pokemon() {  
    const searchTerm = search.value.toLowerCase();
    const pokemon = document.querySelectorAll('#pokemon-list a');
    
    pokemon.forEach(pokemon => {
        const pokemonName = pokemon.textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
            pokemon.style.display = 'flex';
        } else {
            pokemon.style.display = 'none';
        }
    });
}

// Load Pokemon on page load if we're on the search page
if (search) {
    fetchPokemon();
    search.addEventListener('input', cerca_pokemon);
}