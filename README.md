# JDR-Tool

School Project : A Role Play Tool with character sheets, chat and more.

## Contributors

- LACHAISE Tony
- LIEUTAUD Céline
- QUARANTA Arthur

## Dependencies

- fastify
- fastify-static
- fastify-plugin
- fastify-socket.io
- mongoose
- discord.js

## Progress

- [x] fastify initialization
    - [x] views routes (home view, players view, game master view)
        - [ ] web interaction on player view
            - [ ] character sheet (editable)
            - [x] chat
            - [x] others character sheet
            - [ ] visible monsters
        - [ ] web interaction on game master view
            - [ ] gm button
            - [x] chat
            - [ ] all characters sheets (editable)
            - [ ] all monsters sheets (editable)
    - [x] CRUD routes (character, item)
- [x] discord initialization
    - [x] help command
    - [x] roll dice command
    - [x] list characters sheets command
    - [x] create character sheet command
    - [ ] update character sheet command
    - [ ] delete character sheet command
    - [ ] create one or more sheets with limited stats command
- [x] socket.io initialization
- [x] mongodb connection (with mongoose)
    - [x] mongoose schema : character (need some fixes)
    - [x] mongoose schema : item (need some improvement)