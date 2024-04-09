# TP1 - MongoDB en Mode Replica Set

#### Objectifs de l'Atelier
* Configurer MongoDB en mode Replica Set.
* Utiliser MongoDB avec le langage de programmation de votre choix.
* Interagir avec la base de données à l'aide de la CLI MongoDB.
* Générer et manipuler de fausses données.
* Restituer un dépôt git zippé contenant le code source et un document Markdown.

#### Prérequis
* Docker installé sur votre machine.
* Connaissances de base de la CLI Docker. si utilisé
* Un environnement de développement pour le langage de programmation choisi.
* Accès à internet pour la documentation et téléchargements nécessaires.

## Comment démarrer le projet avec Docker ?

1. Ouvrir un terminal sur la machine, puis cloner le repository grâce à la commande suivante : 

```bash
    git clone https://github.com/CRODRGUE/TP1-NoSQL.git
 ```

2. Se déplacer dans le dossier nommé _"TP1-NoSQL"_, Grâce à la commande :
```bash
    cd TP1-NoSQL/
```

3. Démarrer les services en utilisant docker compose pour effectuer cela, il faut exécuter la commande suivante qui permet de lancer les services en arrière-plan :
```bash
    docker-compose up -d 
```

4. Vérifier l'état des différents services (conteneurs), pour cela utiliser la commande suivante. Elle permet de lister les contraires et leur état : 
```bash
    docker-compose ps -a
```

## Comment démarrer le Replica Set ?

1. Effectuer les étapes de la section _"Comment démarrer le projet avec Docker ?"_

2. Connecter vous au conteneur du service "mongodb" avec la commande suivante :
```bash
    docker exec -it NomContenaire /bin/bash
```
_Note : il faut vérifier le nom du conteneur grâce à la commande : docker ps -a_

3. éxecuter les commandes suivante pour créer les instances et les attribuées au replica set nommé "rs0" :
```bash
    mongod --config /etc/mongoDB/rs0-1.conf
    mongod --config /etc/mongoDB/rs0-2.conf
    mongod --config /etc/mongoDB/rs0-3.conf
```

4. Connecter vous à une instance "mongodb", par le biais de la commande ci-dessous :
```bash
    mongosh mongodb://127.0.0.1:27017/users
```

5. Initialiser le replica set grace à la commande suivante :
```mongoDB
    rs.initiate({
        _id: "rs0",
        members: [
            { _id: 0, host: "localhost:27017" },
            { _id: 1, host: "localhost:27018" },
            { _id: 2, host: "localhost:27019" }
        ]
    });
```

6. Verifier le bon fonctionnement de celui-ci en utilisant la commande ci-dessous dans la CLI mongoDB
```mongoDB
    rs.status()
```

## Génération de fausses données (avec JavaScript et faker.js) et insertion via la CLI MongoDB

Les données factices générées, vont permettre d'insérer un ensemble de documents à la collection "users". Les documents de collection respect la structure de données suivante :

```js 
{   
    name: String,   
    age: Number,   
    email: String,   
    createdAt: Date   
}
```

#### Comment générer les données factices ? 

1. Effectuer les étapes de la section _"Comment démarrer le projet avec Docker ?"_

2. Connecter vous au conteneur du service "script" avec la commande suivante :
```bash
    docker exec -it nodejs /bin/bash
```
_Note : il faut vérifier le nom du conteneur grâce à la commande : docker ps -a_

3. Placer vous dans le dossier où se situent les fichiers js, en utilisant la commande suivante :
```bash 
    cd /app_mongodb
```
4. Exécuter le fichier JavaScript nommé "fake_data.js" en utilisant la commande ci-dessous :
```bash 
    node ./fake_data.js
```
5. Copier le résultat du script affiché dans le terminal, puis passer à l'étape de l'insertion des données.

#### Comment insérer les données via la CLI MongoDB ?

1. Connecter vous au conteneur du service "mongodb" avec la commande suivante :
```bash
    docker exec -it mongodb /bin/bash
```
_Note : il faut vérifier le nom du conteneur grâce à la commande : docker ps -a_

2. Connectez-vous à une instance MongoDB par le biais de commande ci-dessous :
```bash
    mongosh mongodb://127.0.0.1:27017/script_crud
```
_Note : il faut mettre le numéro de port correspondant par défaut 27017. Puis il faut également mettre le nom de la base de données._

2. Une fois connectée à l'instance et avoir sélectionné la bonne base de données, il suffit d'exécuter la commande ci-dessous :

```mongoDB 
    db.users.insertMany([Coller le résultat ici])
```
3. Vérification de l'insertion des données pour cela, il suffit de consulter l'ensemble des données présent dans la collection "users". Pour consulter les documents de la collection, il faut exécuter la commande suivante : 

``` mongoDB
    db.users.find()
```

## Effectuer un CRUD via la CLI MongoDB

Il faut premièrement se connecter à une instance MongoDB puis sélectionner une base de données. Pour effectuer cela, il suffit d'exécuter la commande ci-dessous : 

```bash
    mongosh mongodb://127.0.0.1:27017/cli_crud
```
_Note : il faut mettre le numéro de port correspondant par défaut 27017. Puis il faut également mettre le nom de la base de données._

#### Create

Pour insérer un document à une collection, il suffit d’exécuter la commande suivante :
``` mongoDB
    db.NomCollection.insertOne(Document)
```
_Une fois exécutée cette commande retourne l'ID du document ajouté (s'il n'est pas précisé dans le document, il est alors généré automatiquement.)_ 

**Exemple :** Ajouter un nouvel utilisateur à la collection nommé « users » 
``` mongoDB
    db.users.insertOne({name:"Robert Adame ",age:56, email:" Robert.Adame@fake.data.fr" ,createdAt:"Tue Dec 26 2023 11:02:36 GMT+0100"})
```

#### Read

Pour récupérer les documents d’une collection, il est possible de récupérer l'intégralité des documents de celle-ci ou bien uniquement une partie en ajoutant des query (filtres). Voici les commandes à exécuter pour effectuer ceci :
``` mongoDB
    // Pour récupérer l’intégralité de la collection
    db.NomCollection.find() 
    // Pour récupérer uniquement les documents qui match avec la query
    db.NomCollection.find({query}) 
```
_Une fois exécutée cette commande retourne le ou bien les documents de la collection correspondants à la sélection_

**Exemple :** Pour récupérer des documents de la collection « users »
``` mongoDB
    // Pour récupérer l’intégralité de la collection "users"
    db.users.find() 
    // Pour récupérer uniquement les documents avec un utilisateur âgé de plus de 30 ans
    db.users.find({ age : {$gt :30}})
```

#### Update

 Pour mettre à jour un document ou bien tous les documents d'une collection correspondant à une query, il suffit d’utiliser les commandes suivantes : 
 ``` mongoDB
    // Pour modifier uniquement un document qui correspond à la query (le premier trouvé)
    db.NomCollection.updateOne({query}, {$set : {}, $currentDate: { lastUpdated: true }}) 
    // Pour modifier l’ensemble des documents correspondant à la query
    db.NomCollection.updateMany({query}, {$set : {}, $currentDate: { lastUpdated: true }})  
```
_Ces commandes renvoient les informations suivantes une fois exécutées : le nombre d’éléments qui match avec la query, le nombre d’éléments modifiés, le nombre de documents insérés et si l'opération s'exécutait avec le souci d'écriture._

**Exemple :** Ajouter 5 ans à tous les utilisateurs âgés de plus de 30 ans
 ``` mongoDB
    // Utilisation du paramètre d'incrémentation avec une incrémentation de +5 sur le champ age
    db.users.updateMany({},{$inc : {age :+5},$currentDate: { lastUpdated: true }})
```

#### Delete

Pour supprimer un document, il suffit de le sélectionner grâce à une query (de préférence en utilisant son _id pour éviter les erreurs) ou bien, il est possible de supprimer l'intégralité des documents d'une collection. Pour effectuer cela, il suffit d’exécuter les commandes suivantes :
``` mongoDB
    // Pour supprimer un document 
    db.NomCollection.deleteOne({query}) 
    // Pour supprimer l’intégralité des documents de la collection
    db.NomCollection.deleteMany({}) 
```

_Ces commandes retournent le nombre d’éléments supprimé et si l'opération s'exécutait avec le souci d'écriture._

**Exemple :** Pour supprimer l’utilisateur ajouté au début grâce à son ID
``` mongoDB
    db.users.deleteOne({ _id: ObjectId("66097360b658cb59f07b2dc1")})
```

## Effectuer un CRUD via un script JavaScript 

#### Que fait le script ?

Le script permet d'effectuer un CRUD sur une instance mongoDB, c'est-à-dire d'insérer, lire, modifier puis supprimer les données d'une collection. La collection appartenant à la base de données "script_crud" qui va être utiliser est nommes "users" avec une structure de données correspondant à celle ci-dessous : 

```js 
{   
    name: String,   
    age: Number,   
    email: String,   
    createdAt: Date   
}
```

#### Comment utiliser le script ?

1. Effectuer les étapes de la section _"Comment démarrer le projet avec Docker ?"_

2. Connecter vous au conteneur du service "script" avec la commande suivante :
```bash
    docker exec -it nodejs /bin/bash
```
_Note : il faut vérifier le nom du conteneur grâce à la commande : docker ps -a_

3. Placer vous dans le dossier où se situent les fichiers js, en utilisant la commande suivante :
```bash 
    cd /app_mongodb
```

4. Exécuter le fichier JavaScript nommé "crud_mongodb.js" en utilisant la commande ci-dessous :

```bash 
    node ./crud_mongodb.js
```

5. Vérifier qu'il n'y a pas de messages d'erreur dans le terminal, puis enfin connectez vous à l'instance mongoDB (en vous connectant au conteneur "mongodb") pour vérifier que les données ont bien étaient insérées. Voir section précédente "Effectuer un CRUD via la CLI MongoDB" pour cela.

## Les différences observées entre les opérations CRUD en CLI et via le script.

En effectuant un CRUD via la CLI MongoDB et via un script en utilisant la librairie « mongodb » JavaScript, on observe que les méthodes sous-jacentes pour interagir avec une collection sont identiques. Par exemple pour récupérer des ou bien une donnée d’une collection, il faut utiliser « find(…) » ou bien « findMany(…) ». Les seules réelles différences sont la manière et le contexte dans lequel on les utilise.

## Exemples

**Via script JavaScript**

```js
    // Sélection de la base de données 
    const database = client.db("script_crud");
    // Sélection de la collection à manipuler
    const collectionUsers = database.collection("users");
    // Lecture des utilisateur correspondant à query
    listUsers = await collectionUsers.find();
```

**Via CLI MongoDB**

``` mongoDB
    // Selcetionner la base de données 
    use script_crud
    // Pour récupérer uniquement les documents de la collection "users"
    db.users.find()
```

La différence s'observe par la manière dont on les utilise par exemple pour sélectionner une base de données et une collection, mais la méthode sous-adjacente pour récupérer des documents est identique. Nous pouvons donc en déduire le parti-pris par les équipes de développement du produit de se rapprocher le plus possible de la partie "développeur" et non de la partie "administrateur SI"



