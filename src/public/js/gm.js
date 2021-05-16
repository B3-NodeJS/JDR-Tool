const socket = io();
const formChat = document.getElementById("formChat");
const formItemModal = document.getElementById("formItemModal");
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

formItemModal.addEventListener('submit', (e) => {

    e.preventDefault();

    const itemName = document.getElementById("itemName") != null ? document.getElementById("itemName") : '\u200B';
    const description = document.getElementById("description") != null ? document.getElementById("decription") : '\u200B';
    const type = document.getElementById("typeItem") != null ? document.getElementById("typeItem") : '\u200B';

    const objItem = {
        
        name: itemName.value,
        description: description.value,
        type: type.value
    };
    
    if (document.getElementById("inputMethod").value == "create") {
        
        const btn = document.getElementById('btnClose');

        fetch('/api/items', {

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

socket.on('Chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});