/*
2C = Two of Clubs (Treboles)
2D = Two of Diaminds (Diamantes)
2H = Two of Hearts (Corazones)
2S = Two of Spades (Espadas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencia del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector(' #jugador-cartas');
const divCartasComputadora = document.querySelector(' #computadora-cartas');

const crearDeck = () => {
    for (const tipo of tipos) {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + tipo);
        }
        for (esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    //Baraja las cartas con libreria
    deck = _.shuffle(deck)

    return deck;
}
crearDeck();

const pedirCarta = () => {
    if (deck.loength == 0) {
        throw 'No hay mas cartas para repartir';
    }
    const carta = deck.pop()
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        console.log(isNaN(valor));
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;

    }
    // const carta = pedirCarta();

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta)
        console.log(puntosComputadora);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
        console.log({ puntosComputadora });
        console.log({ puntosMinimos });
        console.log({ puntosJugador });

    } while ((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21));

    //Retardar multihilo
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert("Nobody wins :´(");
        } else if (puntosMinimos > 21) {
            alert('AI win');
        } else if (puntosComputadora > 21) {
            alert('You win');
        } else {
            alert('AI win')
        }
    }, 25);


}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta)
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('You lost');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial!')
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })
    //TODO: borrar
    // turnoComputadora(12)