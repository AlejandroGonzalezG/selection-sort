let botonDraw = document.getElementById("draw");
let botonSort = document.getElementById("sort");

const numerosTotales = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const pintasTotales = ["♦", "♥", "♠", "♣"];

function Carta(pinta, numero) {
  this.pinta = pinta;
  this.numero = numero;
};

let arrSalida = [];

const clearSortedContainer = () => {
  let cardsContainerSorted = document.getElementById("container-sort");
  while (cardsContainerSorted.firstChild) {
    cardsContainerSorted.removeChild(cardsContainerSorted.firstChild);
  }
};

function myFunction(entrada) {
  let arrSalida = [];
  for (let i = 1; i <= entrada; i++) {
    let cartaDeEntrada = new Carta();
    cartaDeEntrada.numero = numerosTotales[Math.floor((Math.random() * 13))];
    cartaDeEntrada.pinta = pintasTotales[Math.floor((Math.random() * 4))];
    arrSalida.push(cartaDeEntrada);
  }
  agregarCartas(arrSalida);
  return arrSalida;
}

const generadorCartas = (cartaDeEntrada) => {
  if (["♠", "♣"].includes(cartaDeEntrada.pinta)) {
    return `<div class="card">
        <div class="pinta">${cartaDeEntrada.pinta} </div>
        <div class="numero">${cartaDeEntrada.numero} </div>
        <div class="pintaAbajo">${cartaDeEntrada.pinta} </div>
    </div>`
  } else return `<div class="card">
    <div class="pinta" style="color: red">${cartaDeEntrada.pinta} </div>
    <div class="numero">${cartaDeEntrada.numero} </div>
    <div class="pintaAbajo" style="color: red">${cartaDeEntrada.pinta} </div>
</div>`
}

const agregarCartas = (arrSalida, sort, numIterador) => {
  let cardsContainer = document.getElementById("container");
  let cardsContainerSorted = document.getElementById("container-sort");
  let cartasCreadas = "";
  for (let i = 0; i < arrSalida.length; i++) {
    cartasCreadas = cartasCreadas + generadorCartas(arrSalida[i]);}
    let contenedor = document.getElementById("container");
    contenedor.innerHTML = cartasCreadas;
    if (!sort) {
      cardsContainer.innerHTML = cartasCreadas;
    } else {
      cardsContainerSorted.innerHTML += '<div class="cards-container-sort-row"> <div class="container-iteration-num"> <p class="iteration-num">' + numIterador + '</p> </div> ' + cartasCreadas + ' </div>';
    }
  }

const selectionSort = (arrSalida) => {
    let newArrSalida = [...arrSalida];
    let numIterador = -1;
    for (let i = 0; i < newArrSalida.length; i=i+1) {
      let minimoIndex = i;
      for (let j = i + 1; j < newArrSalida.length; j=j+1) {
        if (numerosTotales.indexOf(newArrSalida[j].numero) < numerosTotales.indexOf(newArrSalida[minimoIndex].numero)) {
          minimoIndex = j;
        }
      }
  
      if (minimoIndex !== i) {
        const menor = newArrSalida[minimoIndex];
        newArrSalida[minimoIndex] = newArrSalida[i];
        newArrSalida[i] = menor;
        numIterador=numIterador+1;
        agregarCartas(newArrSalida, true, numIterador);
      }
    }
  
    if (numIterador == -1) {
      agregarCartas(newArrSalida, true, 0);
    }
  
    return newArrSalida;
  };

botonDraw.addEventListener('click', () => {
  let entrada = document.getElementById("input2").value;
  arrSalida = myFunction(entrada);
  agregarCartas(arrSalida, false, 0);
});

botonSort.addEventListener('click', () => {
  clearSortedContainer();
  selectionSort(arrSalida);
});