const { ObjectId, MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');


const client = new MongoClient("mongodb://127.0.0.1:27017/");

let IdUserDelete;

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

async function InsertFakeUsers(listUsers) {
    try {
        const database = client.db("test");
        const collectionUsers = database.collection("users");

        const resultInsert = await collectionUsers.insertMany(listUsers);
        console.log(`${resultInsert.insertedCount} documents ont été insérés dans la collection users.`);
        IdUserDelete = resultInsert.insertedIds[(Math.floor(Math.random() * resultInsert.insertedCount))].toString();
    } catch (err) {
        console.log(`Oupsss erreur : ${err}`);
    }
}


async function GetUsersAgedOver30() {
    try {
        const database = client.db("test");
        const collectionUsers = database.collection("users");
        const query = { age: { $gt: 30 } };
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

async function UpdateAgeUsers() {
    try {
        const database = client.db("test");
        const collectionUsers = database.collection("users");
        const updateData = { $inc: { age: +5 } };
        const resultUpdate = await collectionUsers.updateMany({}, updateData);
        console.log(`${resultUpdate.modifiedCount} documents ont été modifiés.`);

    } catch (err) {
        console.log(`Oupsss erreur : ${err}`);
    }
}


// ok 
async function DeleteUserById(id) {
    try {
        const database = client.db("test");
        const collectionUsers = database.collection("users");
        const query = { _id: new ObjectId(id) };
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
