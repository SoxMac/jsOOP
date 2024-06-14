/* Esercizio 2
Sistema prenotazione di viaggi
Vari mezzi di trasporto (aereo, treno, autobus) con relativa descrizione (tipo, marca, consumi, servizi disponibili...)
Agenzia viaggio prende una percentuale

Calcolare costo viaggio da punto a verso b
Calcolare durata del viaggio
Gestire prenotazione (mezzo ha numero posti, quando sono finiti non più prenotabile)
*/

/*
Vehicle (classe padre)
    capacity
    speed/h
    cost/km
    typology
    model
    fuel
    fuelCost l
    fuelConsumption l/km
    services[]

    calculateTravelCostForCompany() //calcolo costo viaggio per compagnia
    calculateTravelCostForPassenger() //calcolo costo viaggio per passeggero
    calculateEsitamedDuration() //calcolo durata stimata viaggio in base alla distanza
    addReservation() //aggiungi prenotazione
    removeReservation() //rimuovi prenotazione
    seeDetails() //vede dettaglio mezzo trasporto

    AirPlane (classe figlio di Veichle)
    Train (classe figlio di Veichle)
    Bus (classe figlio di Veichle)
*/

// class Fuel {
//     fuelType;
//     fuelPriceL;
//     fuelConsumptionLKm;
//     constructor(fuelType,fuelPriceL,fuelConsumptionLKm) {
//         this.fuelType = fuelType;
//         this.fuelPriceL = fuelPriceL;
//         this.fuelConsumptionLKm = fuelConsumptionLKm;
//     }
// }

class Vehicle {
    #typology;
    #capacity;
    #reservedSeats = 0;
    #speedKmH;
    #model;
    #fuel;
    #fuelConsumptionLKm;
    #services=[];
    #incrementPC;

    constructor(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services,incrementPC) {
        this.typology = typology;
        this.capacity= capacity;
        this.speedKmH=speedKmH;
        this.model=model;
        this.fuel = fuel;
        this.fuelConsumptionLKm=fuelConsumptionLKm;
        this.services = services;
        this.incrementPC = incrementPC;
    }

    //GETTER, serve per prendere valore di una proprietà
    // getReservedSeats() {
    //     return this.#reservedSeats;
    // }
    //In JavaScript si scrive così
    get reservedSeats(){
        return this.#reservedSeats;
    }

    //SETTER, server per scrivere/modificare il valore di una proprietà
    // setReservedSeats(reservedSeats) {
    //     this.#reservedSeats = reservedSeats
    // }
    //In JavaScript si scrive così
    set reservedSeats(reservedSeats){
        this.#reservedSeats = reservedSeats
    }

    //Funzione rimane dentro classe, posso renderla PRIVATA per evitare accesso a questi al di fuori del costrutto (INCAPSULAMENTO)
    //In JavaScript si usa "#" prima dell'attributo o metodo
    //"#" nei metodi, quando si modifica valore si usa, se devo solo leggere non c'è bisogno
    //Per accedere agli attributi e metodi privati da fuori il costrutto si utilizzano i metodi GETTER (GET) e SETTER(SET) che sono sempre pubblici
    //calcolo costo viaggio per compagnia
    calcCompanyTravelCost(distance) {
        //(consumo * distanza)  * prezzocarburante
        let neededFuel = this.fuelConsumptionLKm * distance; //moltiplico il consumo L/Km * la distanza ed ottengo il carburante richiesto per quella distanza
        return neededFuel * this.fuel.priceL; //moltiplico carburante richiesto per il prezzo al litro ed ottengo il consumo totale
    }

    //calcolo costo viaggio per passeggero
    calcPassengerTravelCost(distance) {
        //prezzo carburante diviso capienza 
        let companyCost = this.calcCompanyTravelCost(distance) / this.capacity;
        return (companyCost * (this.incrementPC / 100)) + companyCost; //maggiorata di percentuale in base al mezzo
    }

    //calcolo durata stimata viaggio in base alla distanza
    calcEstimatedTimeH(distance) {
        let timeInMinutes = (distance/this.speedKmH) * 60; //spazio diviso velocità ottengo il tempo; moltiplico per 60 ed ottendo il tempo in minuti
        let minutes = timeInMinutes % 60; //divido per 60 per ottenre i minuti precisi
        let time = `${(timeInMinutes - minutes) / 60} ore e ${minutes.toFixed()} minuti`; //ai minuti totali sottraggo i minuti precisi; diviso per 60 per trasformare in ore
                                                                                        // concateno le ore con i minuti con il fixed(prende solo decimali che metti come parmetro)
        return time;
    }

    //aggiungi prenotazione
    addReservation(qta){
        let availabilitySeats = this.capacity - this.#reservedSeats;
        if(availabilitySeats == 0) {
            console.log("Non è possibile prenotare, posti pieni");
        } else {
            if(qta <= availabilitySeats){
                this.#reservedSeats += qta;
                console.log("Prenotazione avvenuta con successo");
            } else {
                console.log(`Non è possibile prenotare per ${qta}, posti non disponibili. Posti rimanenti: ${availabilitySeats}`);
            }
        }
    }

    //rimuovi prenotazione
    removeReservation(qta){
        if(this.reservedSeats == 0) {
            console.log("Impossibile disdire, non ci sono prenotazioni")
        } else {
            if(qta <= this.reservedSeats) {
                this.#reservedSeats -= qta;
                console.log("Cancellazione avvenuta con successo");
            } else {
                console.log("Impossibile completare operazione")
            }
        }
    }

    //vede dettaglio mezzo trasporto
    seeDetails() {
        let details = `Dettagli mezzo di trasporto:\n
        Tipologia: ${this.typology}\n
        Modello: ${this.model}\n
        Capacità Max: ${this.capacity}\n
        Posti riservati: ${this.reservedSeats}\n
        Tipo carburante: ${this.fuel.name}\n
        Servizi disponibili: ${this.services.join(", ")}`;
        console.log(details);
    }
}


class AirPlane extends Vehicle {
    defaultConsumptionL;

    constructor(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services,defaultConsumptionL) {
        let incrementPC = 80
        super(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services,incrementPC);
        this.defaultConsumptionL = defaultConsumptionL;
    }

    calcCompanyTravelCost(distance) {
        //Prezzo del volo in aria 
        let flightPrice = super.calcCompanyTravelCost(distance);
        //prezzo per decollo e atterraggio
        let additional = this.defaultConsumptionL * this.fuel.priceL;
        //Prezzo totale volo in aria + decollo/atterraggio
        let x = flightPrice + additional
        return x;
    };
}

class Train extends Vehicle {
    constructor(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services) {
        let incrementPC = 50;
        super(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services,incrementPC);
    }
}

class Bus extends Vehicle {
    constructor(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services) {
        let incrementPC = 20;
        super(typology,capacity,speedKmH,model,fuel,fuelConsumptionLKm,services,incrementPC);
    }
}

class Fuel{
    name;
    priceL;

    constructor(name,priceL) {
        this.name = name;
        this.priceL = priceL;
    }
}

const fuel1 = new Fuel("Jet-A",1.5);
const fuel2 = new Fuel("Diesel",2.075);

const airPlaneObj = new AirPlane("Aereo",600,988,"Boeing 747",fuel1,12,["check-in online","pasti","wi-fi","tablet"],5000);
const trainObj = new Train("Treno",450,360,"Frecciarossa",fuel2,90,["ristorante","cuccette","wi-fi","aria condizionata"]);
const busObj = new Bus("Autobus",50,70,"Iveco",fuel2,1,["aria condizionata","wi-fi","sedili reclinabili"]);

// const airPlaneObj = new AirPlane("Aereo",600,988,"Boeing 747","Jet-A",1.5,12,["check-in online","pasti","wi-fi","tablet"],5000);
// const trainObj = new Train("Treno",450,360,"Frecciarossa","Diesel",2.075,90,["ristorante","cuccette","wi-fi","aria condizionata"]);
// const busObj = new Bus("Autobus",50,70,"Iveco","Diesel",2.075,1,["aria condizionata","wi-fi","sedili reclinabili"]);

let arrayMezzi = [airPlaneObj,trainObj,busObj];

for(let index = 0; index < arrayMezzi.length; index++){
    //arrayMezzi[index].seeDetails();
    //calcolo prezzo viaggio 100 km per passeggero
    console.log(`Un viaggio di 100Km in: ${arrayMezzi[index].typology} 
                costa ${arrayMezzi[index].calcPassengerTravelCost(100)} 
                e ha durata ${arrayMezzi[index].calcEstimatedTimeH(100)} ore`);
}


airPlaneObj.addReservation(10);

airPlaneObj.seeDetails();






