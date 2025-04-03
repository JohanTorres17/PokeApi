// Función para buscar un Pokémon
async function buscarPokemon() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    const container = document.getElementById('pokemonContainer');
    const image = document.getElementById('pokemonImage');
    const name = document.getElementById('pokemonName');
    const id = document.getElementById('pokemonId');
    const type = document.getElementById('pokemonType');
    const abilities = document.getElementById('pokemonAbilities');

    if (!pokemonName) {
        alert('Por favor, ingresa el nombre de un Pokémon.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const data = await response.json();

        // Mostrar el contenedor del Pokémon
        container.style.display = 'block';

        // Actualizar los datos del Pokémon
        image.src = data.sprites.front_default;
        name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        id.textContent = data.id;
        type.textContent = data.types.map(t => t.type.name).join(', ');
        abilities.textContent = data.abilities.map(a => a.ability.name).join(', ');
    } catch (error) {
        alert('Pokémon no encontrado. Inténtalo de nuevo.');
        container.style.display = 'none';
    }
}