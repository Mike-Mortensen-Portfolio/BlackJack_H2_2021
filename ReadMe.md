# Oiski's Blackjack Site

## About The Project
This project was formed and written in relation to a school assignment, and as such written according to the specifications provided by that assignment.

### Terms of Development
The assignments states that we must develop a simple Blackjack game that should feature a simple UI that lets the user interact with the game. \
The rules are as follows:
> The core intention is to get as close to 21 as possible by drawing cards and adding their score together.
> You may stop drawing cards at any time, or if your total hand value exceeds 21.
> Aces can have a value of 1 or 11, where's courtcards have a value of 10 and suitcards simply have their respective value.
> Example: If you draw a 2 and a 3 your would have a total hand value of 5, but you if draw a king and a queen you have 20.
> If you want to continue (_which would be a poor choice, given that you have 20 and any cards besides Ace would make you exceed 21_) and get an ace
> you can decide whether it should represent 1 or 11. In our case we would say 1, to land exactly on 21.
> The dealer has some specieal rules and therefore can't stop before a hand total of 17 or higher is reached.
> So, if the dealer has 16, he/she must draw another card, however, if the dealer has 17 he/she must stop there.
> If the player and the dealer has the exact same hand value the dealer wins in any case.

## The program
**Goal**
> Create a Blackjack game as a Javascript program with HTML front.

**Input**
> The player can draw a card or hold depending on which button is pressed. The player can also switch between ace value (_1 or 11_).

**Output**
> The gameboard as an HTML front.

See the [Wiki]() for more in depth information about the project.

## Versioning
The Assignment specifies that versioning should be done according to the following template: [_Major_].[_Minor_].[_Path_].\
Each `Feature` must be branched out and developed on an isolated branch and merged back into the `Developer` branch when done.

The syntax for the structure of folders must be presented as: [DeveloperName]/[Version]/[BranchName], where as branches should be named as follows: [*Version*]-[*Feature*]_[*SubFeature*].\
**Example:**
> **Folder Structure:** _Oiski/v1_ \
> **Branch Name:** _1.0.0-Interface_MainMenu_ \
> **Full Path:** _Oiski/v1/1.0.0-Interface_MainMenu__

### Change Log
- **v0.1.0**
    - Added `index` page
- **v0.2.0**
    - Added `Card` class
    - Added `Deck` Class
        - Added Ability to generate `Cards`
        - Added Ability to shuffle `Deck`
    - Added `CardHolder` class
        - Added Ability to set sources
- **v0.3.0**
    - Added `Person` class
    - Added `Player` class
- **v0.4.0**
    - Added Base Game Logic
- **v0.5.0**
    - Added extended Game Logic
        - Added Score count
        - Added the ability to display score
        - Added stop logic when exceeding 21
- **v0.6.0**
    - Added Basic Bot Logic
        - Added draw functionlity
        - Added stop logic when exceeding 21
- **v0.7.0**
    - Finished Bot Logic
        - Bot can now decide when to have an ace be 1 or 11
        - Bot can now stop at 17 or over
- **v0.8.0**
    - Added decicated `gamePage`
    - Reconstructed `index` page to function as a front page
        - Added a form to allow players to type in their name before starting the game
- **v1.0.0**
    - Added `Timer` class
        - Added ability to Start `Timer`
        - Added ability to Stop `Timer`
        - Added ability to get a formated string representation of the `Timer`
        - Added ability to get current seconds, minutes and hours
        - Added ability to get current seconds, minutes and hours as a formated double digit string representation
- **v1.0.1 - Hotfix 1**
    - Fixed ace value not being set when bot does not switch the value
    - Fixed end game logic not triggering in certain cases
    

## [Oiski.School Namespace Collection](https://github.com/Mike-Mortensen-Portfolio) <-- Click Me
1. [Oiski.School.Library_h1_2020](https://github.com/ZhakalenDk/Oiski.School.Library_H1_2020)
2. [Oiski.School.Bank_H1_2020](https://github.com/ZhakalenDk/Oiski.School.Bank_H1_2020)
3. [Oiski.School.RainStatistic_H2_2021](https://github.com/ZhakalenDk/Oiski.School.RainStatistic_H2_2021)
4. [Oiski.School.FitnessLevel_H2_2021](https://github.com/ZhakalenDk/Oiski.School.FitnessLevel_H2_2021)
5. [Oiski.School.ParkAndWash_H2_2021](https://github.com/Mike-Mortensen-Portfolio/Oiski.School.ParkAndWash_H2_2021)
6. [Oiski.School.WPF_H2_2021](https://github.com/Mike-Mortensen-Portfolio/Oiski.School.WPF_H2_2021)
7. [Oiski.School.EUCCoffeeShop_H2_2021](https://github.com/Mike-Mortensen-Portfolio/Oiski.School.EUCCoffeeShop_H2_2021)
8. [Blackjack_H2_2021](https://github.com/Mike-Mortensen-Portfolio/Oiski.School.ToDo_H2_2021)
