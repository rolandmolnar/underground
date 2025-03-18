# Underground - The Game

**Underground** is a Javascript desktop first person view RPG game inspired by its old ancestors 'Eye of the Beholder' and 
'Lands of Lore'. 

## Installation

All files of the repository must be copied to a chosen folder so that its **index.html** file can be executed from a 
browser. Google Chrome is recommended. 

## Playing the game

If we just open the game's 'index.html' without any parameters in a browser, it will load the simple Test dungeon, where we 
can get a quick insight about the vibe. 

Other than that the game has 3 standalone stories currently. By using the **system** parameter in the Address Bar, we can 
have an access to them. The following examples show how to start a story if the game has been copied to an 'underground' 
folder of Roland's Desktop - they must be typed to the Address Bar of your browser. 

Tower of the Lich: 
```
file:///C:/Users/Roland/Desktop/underground/index.html?system=LichTower
```

Mountain of the Dragon: 
```
file:///C:/Users/Roland/Desktop/underground/index.html?system=DragonMountain
```

Lost underground: 
```
file:///C:/Users/Roland/Desktop/underground/index.html?system=Underground
```

There is one more **level** parameter that we can use in the 'url' in case we want to start with a weaker or a stronger character, 
than what the challenge would suggest by default to have a tailored experience. The following statement will start the Tower of 
the Lich story with a much stronger Level 10 character. 

```
file:///C:/Users/Roland/Desktop/underground/index.html?system=LichTower&level=10
```

### Controls

**Walking** - By keyboard arrows, or mouse-clicking to the arrows on the screen. Walking through open doors are possible simply by 
          walking through them.  
**Attack** - By Ctrl button on keyboard, or mouse-clicking to the 'Attack' button.  
**Pick up** - By Shift button on keyboard, or mouse-clicking to the View. Picking up a Weapon or an Armor will automatically substitute 
          it with our current Equipment.  
**Drop** - By mouse-clicking on our Weapon or Armor we can drop it to the floor.  

## Adding new dungeons and monsters

The **/js/map_system.js** file contains the above 3 dungeons, and until we are fine the current capabilities of the map generator, 
creating a new story according to those doesn't need a comprehensive programming knowledge. We just need to 'draw' the new maps with 
certain characters, then assign monsters, items and events to certain places. We need to be careful with specifying the coordinates 
of where the player enters the dungeon and where doors will place us to. Other than that there is a limitation of the simple map 
generator: it is not able to tackle with open spaces (like a 2x2 area), only with dungeon-like passages. The game has 30+ monsters 
added already, reusing them doesn't need any programming. However, if you are curious about their statistics and logic, you can find 
them in **/js/domain/monster**. Adding more monsters in possible but requires a deeper understanding of the code, new images, testing 
etc., while adding new skills and features to them are even more effort in the current state of the game. 

## Author

Roland Molnár https://www.linkedin.com/in/molnarroland/ 

## License

This code is fully open-source for anyone for any usage and potential changes. 
