const { ObjectId, MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

const client = new MongoClient("mongodb://mongodb:27017/");

let IdUserDelete;

// Permet de générer 100 documents, respectant la structure de données suivante 
// {name: String, age: Number, email: String, createdAt: Date}
// Avec l'utilisation de package faker.js pour générer les valeurs factices 
function GenerateFakeData() {
    let ListUsers = [];
    for (let i = 0; i < 100; i++) {
        user = {
            name: faker.person.fullName(),
            age: faker.number.int({ max: 100 }),
            email: faker.internet.email({ provider: "fake.data.fr" }),
            createdAt: faker.date.anytime()
        }
        ListUsers.push(user);
    }
    return ListUsers;
}

// Fonction qui permet d'ajouter les données indiquées en paramètre 
async function InsertFakeUsers(listUsers) {
    try {
        // Sélection de la base de données 
        const database = client.db("script_crud");
        // Sélection de la collection à manipuler
        const collectionUsers = database.collection("users");
        // Insertion des données indique en paramètre
        const resultInsert = await collectionUsers.insertMany(listUsers);
        // Affichage du résultat
        console.log(`${resultInsert.insertedCount} documents ont été insérés dans la collection users.`);
        // Sélection d'un ID parmi ceux des données insérées
        IdUserDelete = resultInsert.insertedIds[(Math.floor(Math.random() * resultInsert.insertedCount))].toString();
    } catch (err) {
        console.log(`Oupsss erreur : ${err}`);
    }
}

// Fonction qui permet de récupérer les utilisateurs avec un âge supérieur à 30
async function GetUsersAgedOver30() {
    try {
        // Sélection de la base de données 
        const database = client.db("script_crud");
        // Sélection de la collection à manipuler
        const collectionUsers = database.collection("users");
        // Préparation de la query, pour obtenir uniquement les utilisateurs avec l'âge > 30
        const query = { age: { $gt: 30 } };
        // Lecture des utilisateurs correspondant à query (filtre)
        listUsersAgedOver30 = await collectionUsers.find(query);

        if ((await collectionUsers.countDocuments(query)) == 0) {
            console.log(`Aucun document correspondant à la query.`);
        }

        for await (const doc of listUsersAgedOver30) {
            console.log(doc);
        }
    } catch (err) {
        console.log(`Oupsss erreur : ${err}`);
    }
}

// Fonction qui permet de modifier le champ age de chaque utilisateur avec une incrémentation de celui-ci de + 5
async function UpdateAgeUsers() {
    try {
        // Sélection de la base de données 
        const database = client.db("script_crud");
        // Sélection de la collection à manipuler
        const collectionUsers = database.collection("users");
        // Préparation de l'objet update, qui permet d'incrémenter de +5 le champ age
        const updateData = { $inc: { age: +5 } };
        // Lancement de la modification de tous les utilisateurs
        const resultUpdate = await collectionUsers.updateMany({}, updateData);
        // Affichage du nombre d'utilisateurs 
        console.log(`${resultUpdate.modifiedCount} documents ont été modifiés.`);
    } catch (err) {
        console.log(`Oupsss erreur : ${err}`);
    }
}


// Fonction permettant de supprimer un document avec l'id indiquer en paramètre de la collection "users"
async function DeleteUserById(id) {
    try {
        // Sélection de la base de données 
        const database = client.db("script_crud");
        // Sélection de la collection à manipuler
        const collectionUsers = database.collection("users");
        // Préparation de la query (filtre), pour sélectionner un document en fonction de son ID
        const query = { _id: new ObjectId(id) };
        // Suppression d'un document en fonction de la query
        const resultDelete = await collectionUsers.deleteOne(query);
        console.log(resultDelete.deletedCount == 1 ? `L'utilisateur avec l'ID : ${id} a été supprimé.` : `Aucun utilisateur match avec la query, suppression impossible.`);
    } catch (err) {
        console.log(`Oupsss erreur : ${err}`);
    }
}


async function MakeCRUD() {
    console.log('========= INSERT ==========');
    await InsertFakeUsers(GenerateFakeData());
    console.log('========= READ ==========');
    await GetUsersAgedOver30();
    console.log('========= UPDATE ==========');
    await UpdateAgeUsers();
    console.log('========= INSERT ==========');
    console.log(`L'utilisateur avec l'ID suivant : ${IdUserDelete} va être supprimé.`)
    await DeleteUserById(IdUserDelete);
}

MakeCRUD()
