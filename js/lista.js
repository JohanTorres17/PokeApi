function mostrarLista(pokemones) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", (evento) => buscarPoke(evento, pokemones));

    // Filtro por tipo
    const tipos = [
        "All",
        "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric",
        "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];

    let listaTipos = document.createDocumentFragment();
    tipos.forEach((tipo) => {
        const boton = document.createElement("button");
        boton.textContent = tipo;
        boton.addEventListener("click", () => filtrarPorTipo(tipo));
        listaTipos.appendChild(boton);
    });

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.appendChild(listaTipos);

    // Generar la lista inicial
    seccion.innerHTML = generarLista(pokemones);

    // Agregar elementos al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

function generarLista(pokemones) {
    let listaHTML = "";
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6];
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${pokemones[i].name}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`;
    }
    return listaHTML;
}

function buscarPoke(evento, pokemones) {
    const texto = evento.target.value.toLowerCase();
    let listaFiltrada = [];

    if (texto.length >= 3 && isNaN(texto)) {
        listaFiltrada = pokemones.filter((pokemon) => pokemon.name.includes(texto));
    } else if (!isNaN(texto)) {
        listaFiltrada = pokemones.filter((pokemon) => pokemon.url.includes("/" + texto));
    } else if (texto.length === 0) {
        listaFiltrada = pokemones;
    }

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

async function filtrarPorTipo(untipo) {
    if (untipo === "All") {
        conexionLista(); // Asegúrate de que esta función esté definida
    } else {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
            if (!respuesta.ok) throw new Error("Error al cargar datos de la API");

            const datos = await respuesta.json();
            const pokemonesFiltrados = datos.pokemon.map((p) => p.pokemon);
            mostrarLista(pokemonesFiltrados);
        } catch (error) {
            console.error("Error al filtrar por tipo:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar Pokémon de tipo "${untipo}".</p>`;
        }
    }
}

