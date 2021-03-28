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

To demonstrate an extension to the game, I've allowed for a third ship type of 'frigate' as per the TBoatTypes type in src/types/types.ts. The boats to go on the grid, along with the size of the grid, are defined near the top of App.jsx. There is a commented out additioanl ship that can be added. There is no logic in place that tests to see if all the provided ships can theoretically fit on the given grid.

I am not very familiar with TypeScript but I hope I've demonstrated that I have a basic understanding of it. I've recently begun using it on another project and I'm looking forward to really skilling up with it.

The code is only very lightly commented, my rationale being that as it's a simple programme, the code should be easily understood from context, I hope that's the case!

#### UI design
I've used Material UI to add some basic styling to the game. The theme is defined in src/theme/base.ts and this file also defines the look of the playing grid.

#### Testing
Some simple tests have been written with Jest and Enzyme