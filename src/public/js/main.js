const socket = io();
const formChat = document.getElementById("formChat");
const formModal = document.getElementById("formModal");
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

formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    
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

    // à décommenter pour vérifier le contenu de l'objet
    //console.log(obj);
    
    if (document.getElementById("inputMethod").value == "create") {
        // console.log('avant le fetch create');

        const btn = document.getElementById('btnClose');

        fetch('/api/character', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(json => {
            // console.log(json);
            btn.click();
        });

    } else {
        // console.log('avant le fetch update');
        console.log('ce n\'est pas create');
    }
});

socket.on('Chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

/* les sockets pour les commandes */
socket.on('Create', () => {
    const modal = new bootstrap.Modal(document.getElementById('modalEdit'));
    modal.show();
    document.getElementById("inputMethod").value = 'create';
});

socket.on('Read', () => {

    fetch('/api/characters', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(json => {
        //console.log(json);
        for(let x of json){
            console.log(x.stats.stealth);
            document.getElementById('fullNameOther').innerHTML += x.firstName + ' ' + x.lastName + '<br/>';
            document.getElementById('oldOther').innerHTML += x.age + '<br/>';
            document.getElementById('classOther').innerHTML += x.class + '<br/>';
            document.getElementById('bioOther').innerHTML += x.biography + '<br/>';
            document.getElementById('strOther').innerHTML += x.stats.strength + '<br/>';
            document.getElementById('agiOther').innerHTML += x.stats.agility + '<br/>';
            document.getElementById('stealthOther').innerHTML += x.stats.stealth + '<br/>';
            document.getElementById('intOther').innerHTML += x.stats.intelligence + '<br/>';
            document.getElementById('phyResOther').innerHTML += x.stats.physicalRes + '<br/>';
            document.getElementById('rmOther').innerHTML += x.stats.magicalRes + '<br/>';
            document.getElementById('hpOther').innerHTML += x.stats.hp + '<br/>';
            document.getElementById('mpOther').innerHTML += x.stats.mp + '<br/>';
            document.getElementById('xpOther').innerHTML += x.stats.xp + '<br/>';
            document.getElementById('lvlOther').innerHTML += x.stats.lvl + '<br/>';
        }
        //document.getElementById('test').innerHTML = json[0].firstName;
    });
});