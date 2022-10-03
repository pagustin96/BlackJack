const miModulo = (() => {

        "use strict"

    let deck = [];
    const tipos = ["C", "D", "H", "S"],
        especiales = ["J", "Q", "K", "A"];


    let puntosJugadores = [];


    //Referenias HTML
    const btnNuevo = document.querySelector("#btnNuevo"),
          btnDetener = document.querySelector("#btnDetener"),
          btnPedir = document.querySelector("#btnPedir"); 

    const divCartasJugadores = document.querySelectorAll(".divCartas"),
        puntosPlayer = document.querySelectorAll("small"); 


    // Esta funcion inicializa el juego
    const incializarJuego = (numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosPlayer.forEach( elem => elem.innerText = 0 );

        divCartasJugadores.forEach( elem => elem.innerHTML = "" );

        btnPedir.disabled = false;
        btnDetener.disabled = false;


    }

    // crea nuevo deck
    const crearDeck = () => {
        let deck = [];
        for(let i = 2; i <= 10; i++ ) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for(let tipo of tipos) {
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        // console.log(deck);
        return _.shuffle( deck );  
    }



    const pedirCarta = () => {

        if(deck.length === 0) {
            throw "No hay cartas en el deck";
        }
    return deck.pop();
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? 
            (valor === "A") ? 11 : 10
            : valor * 1;
            
    }

    // turno: 0 = primer jugador y el ultimo sera de la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosPlayer[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement("img");
        imgCarta.src= `assets/cartas/${ carta }.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout( () => {
            if (puntosComputadora === puntosMinimos) {
                alert("Empate");
            } else if(puntosMinimos > 21) {
                alert("computadora gana la partida");
            } else if (puntosComputadora > 21) {
                alert("Jugador gana la partida");
            } else {
                alert("Computadora gana la partida");
            }

        }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
               
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    ///const ganador = (puntosJugador, puntosComputadora) => {
    //    
    //}








    // Eventos

    btnPedir.addEventListener("click", () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if(puntosJugador >= 21 ){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);        
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.btnPedir = true;
            turnoComputadora(puntosJugador);   
        }

        

    });


    btnDetener.addEventListener ("click", () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);   
    });


    btnNuevo.addEventListener ("click", () => {

        incializarJuego();
    
    });


    return {
      nuevoJuego: incializarJuego  
    };


    })();


