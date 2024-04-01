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

1. Ouvrir un terminal sur la machine, puis cloner le repository grâce à la commande suivante : 

```bash
    git clone XXXXXXX
 ```

2. Se déplacer dans le dossier nommé _"XXXXXXXXX"_, puis se déplacer dans le dossier enfant nommé _"script_bdd"_. Grâce à la commande :
```bash
    cd NomDuDossier
```

3. Installer les packages nécessaires au fonctionnement des différents scripts, pour exécuter la commande suivante :

```bash 
    npm i
```
4. Exécuter le fichier JavaScript nommé "fake_data.js" en utilisant la commande ci-dessous :

```bash 
    node ./fake_data.js
```
5. Copier le résultat du script affiché dans le terminal, puis passer à l'étape de l'insertion des données.

#### Comment insérer les données via la CLI MongoDB ?

1. Connectez-vous à une instance MongoDB par le biais de commande ci-dessous :

```bash
    mongosh mongodb://127.0.0.1:Port/NomBaseDeDonnees
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
    mongosh mongodb://127.0.0.1:Port/NomBaseDeDonnees
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

