const fetch = require('node-fetch');

const updateCharacter = (args) => {

    let changes = [];

    for (let i = 2; i < args.length; i+2) {

        switch (args[i]) {
            case 'prenom':
                changes.push(
                    {
                        "propName": "firstName",
                        "value": args[i+1]
                    }
                );
                break;
            case 'nom':
                changes.push(
                    {
                        "propName": "lastName",
                        "value": args[i+1]
                    }
                );
                break;
            case 'bio':
                changes.push(
                    {
                        "propName": "biography",
                        "value": args[i+1]
                    }
                );
                break;
            case 'age':
                changes.push(
                    {
                        "propName": "age",
                        "value": args[i+1]
                    }
                );
                break;
            case 'classe':
                changes.push(
                    {
                        "propName": "class",
                        "value": args[i+1]
                    }
                );
                break;
            case 'argent':
                changes.push(
                    {
                        "propName": "coins",
                        "value": args[i+1]
                    }
                );
                break;
            case 'for':
                changes.push(
                    {
                        "propName": "strength",
                        "value": args[i+1]
                    }
                );
                break;
            case 'agi':
                changes.push(
                    {
                        "propName": "agility",
                        "value": args[i+1]
                    }
                );
                break;
            case 'fufu':
                changes.push(
                    {
                        "propName": "stealth",
                        "value": args[i+1]
                    }
                );
                break;
            case 'int':
                changes.push(
                    {
                        "propName": "intelligence",
                        "value": args[i+1]
                    }
                );
                break;
            case 'resphys':
                changes.push(
                    {
                        "propName": "physicalRes",
                        "value": args[i+1]
                    }
                );
                break;
            case 'resmag':
                changes.push(
                    {
                        "propName": "magicalRes",
                        "value": args[i+1]
                    }
                );
                break;
            case 'pv':
                changes.push(
                    {
                        "propName": "hp",
                        "value": args[i+1]
                    }
                );
                break;
            case 'pm':
                changes.push(
                    {
                        "propName": "mp",
                        "value": args[i+1]
                    }
                );
                break;
            case 'exp':
                changes.push(
                    {
                        "propName": "xp",
                        "value": args[i+1]
                    }
                );
                break;
            case 'niv':
                changes.push(
                    {
                        "propName": "lvl",
                        "value": args[i+1]
                    }
                );
                break;

            default:
                break;
        }
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(changes),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(`http://127.0.0.1:3000/api/character/${'60a18cfae1ec282b6c09d5d3'}`, options);
};

module.exports = updateCharacter;