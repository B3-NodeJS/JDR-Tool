const socket = io();
const formChat = document.getElementById("formChat");
const formItemModal = document.getElementById("formItemModal");
const formModalPlayer = document.getElementById("formModalPlayer");
const input = document.getElementById("input");
const messages = document.getElementById("messages");


formChat.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('Chat message', input.value);
        input.value = '';
        input.focus();
    }
});

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
                headers: {  'Content-Type': 'application/json' },
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
                headers: {  'Content-Type': 'application/json' },
                body: JSON.stringify(updObj)
            }).then(res => res.json()).then(json => {
                console.log(json);
                btn.click();
            });
        } else {
            console.log(value);
            console.log('Une erreur est survenue, veuillez reessayer plus tard');
        }
    });
}

if (formItemModal) {

    let test = document.getElementsByClassName('item');
    
    for (let i = 0; i < test.length; i++) {
        
        test[i].addEventListener("click", (e) => {

            if (e.srcElement.id == "createItem"){

                document.getElementById("inputMethodMJ").value = "createItem";
            };
        });
    }
    
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
        
        if (document.getElementById("inputMethodMJ").value == "createItem") {
            
            const btn = document.getElementById('btnClose');
    
            fetch('/api/item', {
    
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objItem)
            })
            .then(res => res.json())
            .then(json => {
                btn.click();
            });
    
        } else {
    
            console.log('Erreur!');
        }
    });

}

socket.on('Chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// to create a character
socket.on('Create', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
    modal.show();
    document.getElementById("inputMethod").value = 'create';
});

// to update a character
socket.on('Update', () => {
    const id = document.getElementById("idperso");
    const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
    modal.show();
    document.getElementById("inputMethod").value = 'update';


    fetch('api/character/' + id.value, {
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
        for(let [index, x] of json.entries()){

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
                "<td id='coinsOther'> " + x.coins + " </td>" +
            "</tr>";

            // check for reload table
            if (index < 1) {
                firstPass = true;
                document.getElementById('tbodyAll').innerHTML = html;
            } else {
                document.getElementById('tbodyAll').innerHTML += html;
            }
        }
    });
});

// to delete a character
socket.on('Delete', () => {
    deleteCharacter();
});

function readItems(){

    fetch('/api/items', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
        
        for(let y of json){

            document.getElementById("tableItem").innerHTML += y.name + '<br/>';
            document.getElementById("tableDescription").innerHTML += y.description + '<br/>';
            document.getElementById("tableType").innerHTML += y.type + '<br/>';
        }
    });
}

// function to delete a character
function deleteCharacter () {
    const id = document.getElementById('idperso');

    if (confirm('Etes-vous sûr de vouloir supprimer ce personnage ?')) {
        fetch('/api/character/' + id.value, {
            method: 'DELETE',
            headers: {  'Content-Type': 'application/json' }
        })
    }
}

// to delete all characters
function deleteAllCharacters () {
    if (confirm('Etes-vous sûr de vouloir supprimer tous les personnages ?')) {
        fetch('/api/characters', {
            method: 'DELETE',
            headers: {  'Content-Type': 'application/json' }
        })
    }
}