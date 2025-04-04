// Initial adventurer object with basic properties
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"]
};

// Loop to log each item in Robin's inventory
for (let i = 0; i < adventurer.inventory.length; i++) {
    console.log(adventurer.inventory[i]);
}

// Now, let's add a companion to Robin (Leo) and Leo’s companion (Frank):
const adventurerWithCompanion = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            inventory: ["small hat", "sunglasses"]
        }
    }
};
// Access and log items for Leo and Frank
console.log(`${adventurerWithCompanion.name}'s companion is ${adventurerWithCompanion.companion.name}, a ${adventurerWithCompanion.companion.type}.`);
console.log(`${adventurerWithCompanion.companion.name}'s companion is ${adventurerWithCompanion.companion.companion.name}, a ${adventurerWithCompanion.companion.companion.type}.`);

// Loop to log each item in Frank's inventory
for (let i = 0; i < adventurerWithCompanion.companion.companion.inventory.length; i++) {
    console.log(adventurerWithCompanion.companion.companion.inventory[i]);
}

//Part 2
// Character class definition
class Character {
    constructor(name) {
        this.name = name;
        this.health = 100; // Default health value
        this.inventory = []; // Empty inventory by default
    }

    // Roll method to simulate a dice roll
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
}

// Create a new instance of Character for Robin
const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

// Test the roll method for Robin and his companions
robin.roll();
robin.companion.roll();
robin.companion.companion.roll();

//Part 3
// Adventurer class extending the Character class
class Adventurer extends Character {
    constructor(name, role) {
        super(name);
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins"); // Default items for adventurers
    }

    // Adventurers have a scouting ability
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll(); // Call the roll method from the parent class
    }
}

// Companion class extending the Character class
class Companion extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    // Companions can guard their adventurer
    guard() {
        console.log(`${this.name} is guarding ${this.type}.`);
    }
}

// Only declare robin once
const robin = new Adventurer("Robin", "Warrior");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Companion("Leo", "Cat");
robin.companion.companion = new Companion("Frank", "Flea");
robin.companion.companion.inventory = ["small hat", "sunglasses"];

// Test the new methods
robin.scout(); // Robin scouts ahead
robin.companion.guard(); // Leo guards
robin.companion.companion.roll(); // Frank rolls the dice

//Part 4
// Adding static properties to Character and Adventurer classes
class Character {
    static MAX_HEALTH = 100; // Static property for max health

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
}

class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"]; // Static roles array

    constructor(name, role) {
        super(name);
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`${role} is not a valid role.`);
        }
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
}

// Create an Adventurer with a valid role
const healer = new Adventurer("Elaine", "Healer");

//Part 5

class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

// Create a healer factory
const healers = new AdventurerFactory("Healer");
healers.generate("Elaine");
healers.generate("Ralph");

console.log(healers.findByName("Elaine"));

//Part 6
class Adventurer extends Character {
    // Additional duel method
    duel(opponent) {
        let round = 1;
        while (this.health > 50 && opponent.health > 50) {
            console.log(`Round ${round}`);
            const thisRoll = Math.floor(Math.random() * 20) + 1;
            const opponentRoll = Math.floor(Math.random() * 20) + 1;

            console.log(`${this.name} rolled ${thisRoll}`);
            console.log(`${opponent.name} rolled ${opponentRoll}`);

            if (thisRoll > opponentRoll) {
                opponent.health -= 1;
                console.log(`${opponent.name} loses 1 health.`);
            } else {
                this.health -= 1;
                console.log(`${this.name} loses 1 health.`);
            }

            console.log(`${this.name}'s health: ${this.health}`);
            console.log(`${opponent.name}'s health: ${opponent.health}`);
            round++;
        }

        const winner = this.health > opponent.health ? this : opponent;
        console.log(`${winner.name} wins the duel!`);
    }
}

// Example duel
const adventurer1 = new Adventurer("Elaine", "Healer");
const adventurer2 = new Adventurer("Ralph", "Fighter");
adventurer1.duel(adventurer2);