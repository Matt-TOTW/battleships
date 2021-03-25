# Battleships | Matthew Cox

A one sided browser game of battleships, written with React.

## Install and run

```bash
npm install
npm run start
```
The game should then be accessible at localhost:3000

## Test

```bash
npm run test
```

## Notes
#### Code design
I decided to use React as I have good familiarity with it and it's nice and easy to start an app with create-react-app, which is how this project was initiated.\
The game is built using two `Classes`, Battlefield, and Boat. Initialisation of the game involves a single Battlefield instance and several Boat instances.\
Shots are fired by calling a method on the Battlefield instance.

I tried to design the code in a way that would make it easy to extend the game further. Changing the size of the grid and increasing the number of boats would be trivial, and making it a two player game shouldn't be too hard either, besides the extended ui it should mean only instantiating a second Battlefield and more Boats.

I am not very familiar with TypeScript but I hope I've demonstrated that I have a basic understanding of it. I've recently begun using it on another project and I'm looking forward to really skilling up with it.

The code is only very lightly commented, my rationale being that as it's a simple programme, the code should be easily understood from context, I hope that's the case!

#### UI design
I decided not to style the ui beyond a very basic graphical representation of the grid. The brief was to keep it simple and I thought it better to keep my react components as uncluttered as possible. To take the brief literally, which did not mention styling, I imagined a future discussion with the client about the look of the ui.

#### Testing
Some simple tests have been written with Jest and Enzyme