const { faker } = require('@faker-js/faker');

// Permet de générer 100 documents, respectant la structure de données suivante 
// {name: String, age: Number, email: String, createdAt: Date}
// Avec l'utilisation de package faker.js pour générer les valeurs factices 
function GenerateFakeData() {
    // Boucle pour générer 100 documents
    for (let i = 0; i < 100; i++) {
        user = {
            name: faker.person.fullName(),
            age: faker.number.int({ max: 100 }),
            email: faker.internet.email({ provider: "fake.data.fr" }),
            createdAt: faker.date.anytime()
        }
        // Affichage du document dans le terminal
        console.log(`{name:"${user.name}",age:${user.age},email:"${user.email}",createdAt:"${user.createdAt}"},`);
    }
}

GenerateFakeData()