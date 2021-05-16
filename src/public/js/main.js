const socket = io();
const formChat = document.getElementById("formChat");
const formItemModal = document.getElementById("formItemModal");
const formModalPlayer = document.getElementById("formModalPlayer");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const createIt = document.getElementById('createItem');

// for form chat
formChat.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('Chat message', input.value);
        input.value = '';
        input.focus();
    }
});

// for form character
if (formModalPlayer) {
    formModalPlayer.addEventListener('submit', (e) => {
        e.preventDefault();

        // value id if exists
        const id = document.getElementById("idperso") != null ? document.getElementById("idperso") : 0;

        // all input'st value
        const fn = document.getElementById("firstName") != null ? document.getElementById("firstName") : '\u200B';
        const ln = document.getElementById("lastName") != null ? document.getElementById("lastName") : '\u200B';
        const age = document.getElementById("age") != null ? document.getElementById("age") : 0;
        const cl = document.getElementById("classe") != null ? document.getElementById("classe") : '\u200B';
        const bio = document.getElementById("biography") != null ? document.getElementById("biography") : '\u200B';
        const ste = document.getElementById("strength") != null ? document.getElementById("strength") : 0;
        const ag = document.getElementById("agility") != null ? document.getElementById("agility") : 0;
        const st = document.getElementById("stealth") != null ? document.getElementById("stealth") : 0;
        const int = document.getElementById("intelligence") != null ? document.getElementById("intelligence") : 0;
        const phr = document.getElementById("physicalRes") != null ? document.getElementById("physicalRes") : 0;
        const mgr = document.getElementById("magicalRes") != null ? document.getElementById("magicalRes") : 0;
        const hp = document.getElementById("hp") != null ? document.getElementById("hp") : 0;
        const mp = document.getElementById("mp") != null ? document.getElementById("mp") : 0;
        const xp = document.getElementById("xp") != null ? document.getElementById("xp") : 0;
        const lvl = document.getElementById("lvl") != null ? document.getElementById("lvl") : 0;
        const coins = document.getElementById("coins") != null ? document.getElementById("coins") : 0;

        // btn close
        const btn = document.getElementById('btnClose');

        // object Character
        const obj = {
            firstName: fn.value,
            lastName: ln.value,
            biography: bio.value,
            age: Number(age.value),
            class: cl.value,
            stats: {
                strength: Number(ste.value),
                agility: Number(ag.value),
                stealth: Number(st.value),
                intelligence: Number(int.value),
                physicalRes: Number(phr.value),
                magicalRes: Number(mgr.value),
                hp: Number(hp.value),
                mp: Number(mp.value),
                xp: Number(xp.value),
                lvl: Number(lvl.value)
            },
            coins: Number(coins.value)
        };

        // to uncomment to check object's content
        //console.log(obj);
        const value = document.getElementById("inputMethod").value;
        if (value == "create") {
            fetch('/api/character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(res => res.json()).then(json => {
                btn.click();

                // show character's informations
                document.getElementById('idperso').value = json._id;
                document.getElementById('fullNameP').innerHTML += (json.firstName != undefined ? json.firstName : '\u200B') + ' ' + (json.lastName != undefined ? json.lastName : '\u200B');
                document.getElementById('oldP').innerHTML += json.age;
                document.getElementById('classP').innerHTML += (json.class != undefined ? json.class : '\u200B');
                document.getElementById('bioP').innerHTML += (json.biography != undefined ? json.biography : '\u200B');
                document.getElementById('strP').innerHTML += json.stats.strength;
                document.getElementById('agiP').innerHTML += json.stats.agility;
                document.getElementById('stealthP').innerHTML += json.stats.stealth;
                document.getElementById('intP').innerHTML += json.stats.intelligence;
                document.getElementById('phyResP').innerHTML += json.stats.physicalRes;
                document.getElementById('rmP').innerHTML += json.stats.magicalRes;
                document.getElementById('hpP').innerHTML += json.stats.hp;
                document.getElementById('mpP').innerHTML += json.stats.mp;
                document.getElementById('xpP').innerHTML += json.stats.xp;
                document.getElementById('lvlP').innerHTML += json.stats.lvl;
                document.getElementById('coinsP').innerHTML += json.coins;
            });
        } else if (value == "update") {

            const updObj = [
                {
                    propName: "firstName",
                    value: obj.firstName
                },
                {
                    propName: "lastName",
                    value: obj.lastName
                },
                {
                    propName: "age",
                    value: obj.age
                },
                {
                    propName: "biography",
                    value: obj.biography
                },
                {
                    propName: "class",
                    value: obj.class
                },
                {
                    propName: "stats",
                    value: {
                        strength: obj.stats.strength,
                        agility: obj.stats.agility,
                        stealth: obj.stats.stealth,
                        intelligence: obj.stats.intelligence,
                        physicalRes: obj.stats.physicalRes,
                        magicalRes: obj.stats.magicalRes,
                        hp: obj.stats.hp,
                        mp: obj.stats.mp,
                        xp: obj.stats.xp,
                        lvl: obj.stats.lvl
                    }
                },
                {
                    propName: "coins",
                    value: obj.coins
                }
            ];

            const btn = document.getElementById('btnClose');

            fetch('/api/character/' + id.value, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updObj)
            }).then(res => res.json()).then(json => {
                btn.click();
            });
        } else {
            //console.log(value);
            console.log('Une erreur est survenue, veuillez reessayer plus tard');
        }
    });
}

// for item
if (createIt) {
    createIt.addEventListener('click', (e) => {
        document.getElementById("inputMethodMJ").value = "createItem";
    });
}

// for form item
if (formItemModal) {   
    formItemModal.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const itemName = document.getElementById("itemName") != null ? document.getElementById("itemName") : '\u200B';
        const description = document.getElementById("description") != null ? document.getElementById("description") : '\u200B';
        const type = document.getElementById("typeItem") != null ? document.getElementById("typeItem") : '\u200B';

        const objItem = {
            name: itemName.value,
            description: description.value,
            type: type.value
        };
        
        const val = document.getElementById("inputMethodMJ").value;

        if (val == "createItem") {
            const btn = document.getElementById('btnClose');

            fetch('/api/item', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objItem)
            })
            .then(res => res.json())
            .then(json => {
                btn.click();
                //console.log(json);
            });
    
        } else if (val == "updateItem") {
            const oid = document.getElementById("inputIdItem");
            const btn = document.getElementById('btnClose');

            const obj = [
                {
                    propName: "name",
                    value: objItem.name
                },
                {
                    propName: "description",
                    value: objItem.description
                },
                {   
                    propName: "type",
                    value: objItem.type
                }
            ];

            fetch('/api/item/' + oid, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            })
            .then(res => res.json())
            .then(json => {
                btn.click();
                //console.log(json);
            });
        } else {
            console.log('Une erreur est survenue, veuillez reessayer plus tard');
        }
    });
}

socket.on('Chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Roll the dice
// Note : We can't require a module on client side, so for the moment I'll duplicate the rollDice module
// Issues : Work only once then show an error about the startsWith() function in socket.js file
socket.on('Roll', (arg) => {
    const regex = new RegExp('^\\d+\d\\d+$', 'i');
    let results = [];

    if (!regex.test(arg))
        console.log("Wrong syntax...");

    // Random dice numbers according to arguments passed
    for (let i = 0; i < arg.split('d')[0]; i++) {
        results.push(Math.floor(Math.random() * arg.split('d')[1]) + 1);
    }

    console.log(arg);
    console.log(results);

    socket.emit('Chat message', results);
});

// to create a character
socket.on('Create', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
    modal.show();
    document.getElementById("inputMethod").value = 'create';
});

// to update a character
socket.on('Update', () => {
    updateCharacter(0);
});

// to show all characters
socket.on('Read', () => {
    let firstPass = false;
    fetch('/api/characters', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
            //console.log(json);
        for (let [index, x] of json.entries()) {

            var html = "<tr>\n" +
                "<td id='fullNameOther'> " + (x.firstName != undefined ? x.firstName : '\u200B') + ' ' + (x.lastName != undefined ? x.lastName : '\u200B') + " </td>\n" +
                "<td id='oldOther'> " + x.age + " </td>\n" +
                "<td id='classOther'> " + (x.class != undefined ? x.class : '\u200B') + "</td>\n" +
                "<td id='bioOther'>" + (x.biography != undefined ? x.biography : '\u200B') + " </td>\n" +
                "<td>\n" +
                "<ul class='flex-inner'>\n" +
                "<li id='strOther'>Force: " + x.stats.strength + "</li>\n" +
                "<li id='agiOther'>Agilité: " + x.stats.agility + "</li>\n" +
                "<li id='stealthOther'>Discrétion: " + x.stats.stealth + "</li>\n" +
                "<li id='intOther'>Intelligence: " + x.stats.intelligence + "</li>\n" +
                "<li id='phyResOther'>Armure: " + x.stats.physicalRes + "</li>\n" +
                "<li id='rmOther'>Rm: " + x.stats.magicalRes + "</li>\n" +
                "<li id='hpOther'>HP: " + x.stats.hp + "</li>\n" +
                "<li id='mpOther'>MP: " + x.stats.mp + "</li>\n" +
                "<li id='xpOther'>XP: " + x.stats.xp + "</li>\n" +
                "<li id='lvlOther'>Lvl: " + x.stats.lvl + "</li>\n" +
                "</ul>\n" +
            "</td>\n" +
            "<td id='coinsOther'> " + x.coins + " </td>\n";
            if (document.getElementById('divMJ')) {
                html += "<td>\n<button type='button' class='btn btn-success' onclick='updateCharacter(&apos;"+ x._id +"&apos;)'>Modifier</button>\n" +
                "<button type='button' class='btn btn-danger' onclick='deleteCharacter(&apos;" + x._id + "&apos;)'>Supprimer</button> </td>\n";
            }
            html += "</tr>";

            // check for reload table
            if (index < 1) {
                firstPass = true;
                document.getElementById('tbodyAllCharacter').innerHTML = html;
            } else {
                document.getElementById('tbodyAllCharacter').innerHTML += html;
            }
        };
    });
});

// to delete a character
socket.on('Delete', () => {
    deleteCharacter(0);
});

/* all functions */

// to show all items
function readItems() {
    let firstPass = false;
    fetch('/api/items', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
        for(let [index, y] of json.entries()){
            let html = "<tr>\n" +
                "<td id='tableItem'>" + y.name + "</td>\n" +
                "<td id='tableDescription'>" + y.description + "</td>\n" +
                "<td id='tableType'>"+ y.type + "</td>\n" +
                "<td><button type='button' class='btn btn-success' onclick='updateItem(&apos;" + y._id + "&apos;)'> Modifier</button> \n" +
                "<button type='button' class='btn btn-danger' onclick='deleteItem(&apos;" + y._id + "&apos;)'>Supprimer</button></td>\n" +
            "</tr>";

            // check for reload table
            if (index < 1) {
                firstPass = true;
                document.getElementById('tbodyAllItem').innerHTML = html;
            } else {
                document.getElementById('tbodyAllItem').innerHTML += html;
            }
        };
    });
}

// Not working yet
/* socket.on('Create-Mob', () => {

    socket.emit('Create-Mob');
}); */

function updateItem (oid) {
    document.getElementById("inputMethodMJ").value = "updateItem";
    document.getElementById("inputIdItem").value = oid;

    const modal = new bootstrap.Modal(document.getElementById('modalItem'));
    modal.show();

    fetch('/api/item/' + oid, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        document.getElementById("itemName").value = json.name;
        document.getElementById("description").value = json.description;
        document.getElementById("typeItem").value = json.type;
    });
}

// function to delete an item
function deleteItem (oid) {
    if (confirm('Etes-vous sûr de vouloir supprimer cet item ?')) {
        fetch('/api/item/' + oid, {
            method: 'DELETE',
            headers: {  'Content-Type': 'application/json' }
        });
    }
}

// function to delete all item
function deleteAllItem () {
    if (confirm('Etes-vous sûr de vouloir supprimer tous les items ?')) {
        fetch('/api/items', {
            method: 'DELETE',
            headers: {  'Content-Type': 'application/json' }
        });
    }
}

// to update a character
function updateCharacter (oid) {
    if (oid == 0) {
        const id = document.getElementById("idperso");
        const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
        modal.show();
        document.getElementById("inputMethod").value = 'update';
    
        fetch('/api/character/' + id.value, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => {
            document.getElementById("firstName").value = json.firstName;
            document.getElementById("lastName").value = json.lastName;
            document.getElementById("age").value = Number(json.age);
            document.getElementById("biography").value = json.biography;
            document.getElementById("strength").value = Number(json.stats.strength);
            document.getElementById("agility").value = Number(json.stats.agility);
            document.getElementById("stealth").value = Number(json.stats.stealth);
            document.getElementById("intelligence").value = Number(json.stats.intelligence);
            document.getElementById("physicalRes").value = Number(json.stats.physicalRes);
            document.getElementById("magicalRes").value = Number(json.stats.magicalRes);
            document.getElementById("hp").value = Number(json.stats.hp);
            document.getElementById("mp").value = Number(json.stats.mp);
            document.getElementById("xp").value = Number(json.stats.xp);
            document.getElementById("lvl").value = Number(json.stats.lvl);
            document.getElementById("coins").value = Number(json.coins);
        });
    } else {
        const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
        modal.show();
        document.getElementById("inputMethod").value = 'update';
    
        fetch('/api/character/' + oid, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => {
            document.getElementById("firstName").value = json.firstName;
            document.getElementById("lastName").value = json.lastName;
            document.getElementById("age").value = Number(json.age);
            document.getElementById("biography").value = json.biography;
            document.getElementById("strength").value = Number(json.stats.strength);
            document.getElementById("agility").value = Number(json.stats.agility);
            document.getElementById("stealth").value = Number(json.stats.stealth);
            document.getElementById("intelligence").value = Number(json.stats.intelligence);
            document.getElementById("physicalRes").value = Number(json.stats.physicalRes);
            document.getElementById("magicalRes").value = Number(json.stats.magicalRes);
            document.getElementById("hp").value = Number(json.stats.hp);
            document.getElementById("mp").value = Number(json.stats.mp);
            document.getElementById("xp").value = Number(json.stats.xp);
            document.getElementById("lvl").value = Number(json.stats.lvl);
            document.getElementById("coins").value = Number(json.coins);
        });
    }
}

// function to delete a character
function deleteCharacter (oid) {
    const id = document.getElementById('idperso');

    if (oid == 0) {
        if (confirm('Etes-vous sûr de vouloir supprimer ce personnage ?')) {
            fetch('/api/character/' + id.value, {
                method: 'DELETE',
                headers: {  'Content-Type': 'application/json' }
            });
        }
    } else {
        if (confirm('Etes-vous sûr de vouloir supprimer ce personnage ?')) {
            fetch('/api/character/' + oid, {
                method: 'DELETE',
                headers: {  'Content-Type': 'application/json' }
            });
        }
    }
}

// to delete all characters
function deleteAllCharacters() {
    if (confirm('Etes-vous sûr de vouloir supprimer tous les personnages ?')) {
        fetch('/api/characters', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
