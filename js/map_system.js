var MapSystem = function() {};

MapSystem['TEST'] = {};
MapSystem['TEST'].systemDirection = 'DOWN';
MapSystem['TEST'].player = {level: 1};

MapSystem['TEST'][0] = {};
MapSystem['TEST'][0].mapName = 'Test';
MapSystem['TEST'][0].wall = new Wall('TwoTriangles', '#66aa88', '#444444', '#111111');
MapSystem['TEST'][0].width = 7;
MapSystem['TEST'][0].initPosition = new Position(1, 1, 'EAST');
MapSystem['TEST'][0].map =  'XXXXXXX';
MapSystem['TEST'][0].map += 'X     X';
MapSystem['TEST'][0].map += 'X XXX X';
MapSystem['TEST'][0].map += 'X XXXAX';
MapSystem['TEST'][0].map += 'X XXX X';
MapSystem['TEST'][0].map += 'X     X';
MapSystem['TEST'][0].map += 'XXXXXXX';
MapSystem['TEST'][0].labels = {'A': 'MONSTER/HUMAN_GUARD'};

MapSystem['Underground'] = {};
MapSystem['Underground'].systemDirection = 'DOWN';
MapSystem['Underground'].player = {level: 1};

MapSystem['Underground'][0] = {};
MapSystem['Underground'][0].mapName = 'Prison';
MapSystem['Underground'][0].wall = new Wall('TwoTriangles', '#7788aa', '#333333', '#111111');
MapSystem['Underground'][0].width = 10;
MapSystem['Underground'][0].xpValue = 50;
MapSystem['Underground'][0].initPosition = new Position(8, 8, 'WEST');
MapSystem['Underground'][0].map =  'XXXXXXXXXX';
MapSystem['Underground'][0].map += 'XX   X ADX';
MapSystem['Underground'][0].map += 'DA X X XXX';
MapSystem['Underground'][0].map += 'XXXX   ECX';
MapSystem['Underground'][0].map += 'XD XX XXXX';
MapSystem['Underground'][0].map += 'XX    XX X';
MapSystem['Underground'][0].map += 'X  X XX  X';
MapSystem['Underground'][0].map += 'X XX    XX';
MapSystem['Underground'][0].map += 'XABX XX  X';
MapSystem['Underground'][0].map += 'XXXXXXXXXX';
MapSystem['Underground'][0].labels = {'A': 'MONSTER/GOBLIN', 'B': "POTION/Healing_15~ARMOR/LeatherArmor_2~WEAPON/Dagger_2~EVENT/\*That's my equipment!*", 
	'C': 'POTION/Healing_15', 'E': 'EVENT/A healing potion!', 'EVENT_INIT': 'You wake up and find yourself in an underground prison.'};

MapSystem['Underground'][1] = {};
MapSystem['Underground'][1].mapName = 'Goblin quarters';
MapSystem['Underground'][1].wall = new Wall('TwoTriangles', '#7788aa', '#333333', '#111111');
MapSystem['Underground'][1].width = 15;
MapSystem['Underground'][1].xpValue = 100;
MapSystem['Underground'][1].initPosition = new Position(1, 6, 'EAST');
MapSystem['Underground'][1].map =  'XXXXXXXXXXXXXXX';
MapSystem['Underground'][1].map += 'XX      AXAFXDX';
MapSystem['Underground'][1].map += 'X  X XX XX XXAX';
MapSystem['Underground'][1].map += 'XX X XX       X';
MapSystem['Underground'][1].map += 'XD X    XXGXXXX';
MapSystem['Underground'][1].map += 'XX XX XXX    DX';
MapSystem['Underground'][1].map += 'X     XFXXXXBXX';
MapSystem['Underground'][1].map += 'XX XX X       X';
MapSystem['Underground'][1].map += 'X  X  X XXXXX X';
MapSystem['Underground'][1].map += 'XX   XX    XX X';
MapSystem['Underground'][1].map += 'XACXDXB XX XEBX';
MapSystem['Underground'][1].map += 'XXXXXXXXXXDXXXX';
MapSystem['Underground'][1].labels = {'A': 'MONSTER/GOBLIN', 'B': 'MONSTER/ZOMBIE', 'C': 'WEAPON/QuarterStaff_3', 
	'E': 'ARMOR/StuddedLeather_3', 'F': 'POTION/Healing_15', 'G': 'EVENT/Scratching noise is coming from the distance.'};

MapSystem['Underground'][2] = {};
MapSystem['Underground'][2].mapName = 'Catacombs';
MapSystem['Underground'][2].wall = new Wall('TwoTriangles', '#7788aa', '#333333', '#111111');
MapSystem['Underground'][2].width = 30;
MapSystem['Underground'][2].xpValue = 200;
MapSystem['Underground'][2].initPosition = new Position(7, 28, 'NORTH');
MapSystem['Underground'][2].map =  'XXDXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['Underground'][2].map += 'X C X    X  AX    XDXIB   BHDX';
MapSystem['Underground'][2].map += 'XX XXDXX X XXX XX X X XXXX XXX';
MapSystem['Underground'][2].map += 'X M    X            X XXXX X X';
MapSystem['Underground'][2].map += 'X XX XXX X XXX XX XDXB     X X';
MapSystem['Underground'][2].map += 'X X  XD  X   XDXX XXXXXXXX   X';
MapSystem['Underground'][2].map += 'X X XXXXXX XXX XXB      BX X X';
MapSystem['Underground'][2].map += 'XAX     AX     XXX XXXXX X XXX';
MapSystem['Underground'][2].map += 'XXXX XXXXX XXX  XB      BX  XX';
MapSystem['Underground'][2].map += 'XJXX       XLXXXXX XXXXXXXX XX';
MapSystem['Underground'][2].map += 'X    XX XXXXA X         D    X';
MapSystem['Underground'][2].map += 'XXX XXX    XX X XXXXXX XXX X X';
MapSystem['Underground'][2].map += 'XDG XLA XXAXX      X   XXX XDX';
MapSystem['Underground'][2].map += 'XXXXXXXXXXXXXXXDXX XXX X X XAX';
MapSystem['Underground'][2].map += 'X XXX         XFXX     X     X';
MapSystem['Underground'][2].map += 'X     XXX XXX  BXXX XX XXXX XX';
MapSystem['Underground'][2].map += 'XX XXXX X XDXXXXXXXXXX    X XX';
MapSystem['Underground'][2].map += 'XX      X        X   X XX X  X';
MapSystem['Underground'][2].map += 'XXX X XXX XX XXX X X X XX   XX';
MapSystem['Underground'][2].map += 'X   X XXX XX XXX   X   XX X XX';
MapSystem['Underground'][2].map += 'X XXX  A  XX  XXXXXXXXXXX XXXX';
MapSystem['Underground'][2].map += 'X  LXXX XXXX XX   X XXXDX    X';
MapSystem['Underground'][2].map += 'XAXXXXX XD   XXAX     X   XX X';
MapSystem['Underground'][2].map += 'XDXXAXX XXXXXXXXXXXXX XXXXXX X';
MapSystem['Underground'][2].map += 'XEXX          X   X X        X';
MapSystem['Underground'][2].map += 'XAXXX X XX XX XXX X   XXXXXX X';
MapSystem['Underground'][2].map += 'X   X XXXX XX     XXXXX      X';
MapSystem['Underground'][2].map += 'XXX X X    XXXXXX       XXX XX';
MapSystem['Underground'][2].map += 'XD    X XX   XX   XXXXX     AX';
MapSystem['Underground'][2].map += 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['Underground'][2].labels = {'A': 'MONSTER/ZOMBIE', 'B': 'MONSTER/GIANT_TOAD', 'C': 'MONSTER/FOMORIAN_GIANT(OnHold)', 
	'E': 'WEAPON/ShortSword_5', 'F': 'ARMOR/ChainMail_5', 'G': 'ARMOR/ChainMail_6', 'H': 'ARMOR/PlateMail_7', 
	'I': 'WEAPON/LongSword_8', 'J': 'WEAPON/ShortSword_6', 'L': 'POTION/Healing_30', 'M': 'EVENT/Woman voice: Help! Help!'};

MapSystem['Underground'][3] = {};
MapSystem['Underground'][3].mapName = 'The covey';
MapSystem['Underground'][3].wall = new Wall('TwoTriangles', '#7788aa', '#333333', '#111111');
MapSystem['Underground'][3].width = 7;
MapSystem['Underground'][3].xpValue = 0;
MapSystem['Underground'][3].initPosition = new Position(3, 8, 'NORTH');
MapSystem['Underground'][3].map =  'XXXXXXX';
MapSystem['Underground'][3].map += 'XB G BX';
MapSystem['Underground'][3].map += 'X XXX X';
MapSystem['Underground'][3].map += 'X XXX X';
MapSystem['Underground'][3].map += 'X XXX X';
MapSystem['Underground'][3].map += 'X CAE X';
MapSystem['Underground'][3].map += 'XXX XXX';
MapSystem['Underground'][3].map += 'XXXFXXX';
MapSystem['Underground'][3].map += 'XXX XXX'
MapSystem['Underground'][3].map += 'XXXXXXX';
MapSystem['Underground'][3].labels = {'A': 'MONSTER/HAG(OnHold)', 'B': 'MONSTER/HAG', 'C': 'POTION/Healing_30', 
	'E': 'POTION/Wounding_-30', 'F': 'EVENT/Woman voice: Help! Please, help!', 'G': 'WEAPON/TwoHanded_9', 
	'EVENT_END': 'Well done! You have killed the hag covey and found the exit from their underground dwelling.'};


MapSystem['LichTower'] = {};
MapSystem['LichTower'].systemDirection = 'UP';
MapSystem['LichTower'].player = {level: 1, weapon: Weapon.get('ShortSword_5'), armor: Armor.get('LeatherArmor_2')};

MapSystem['LichTower'][0] = {};
MapSystem['LichTower'][0].mapName = 'Tower hall';
MapSystem['LichTower'][0].wall = new Wall('FourTriangles', '#661122', '#bbbbbb', '#666666');
MapSystem['LichTower'][0].width = 11;
MapSystem['LichTower'][0].xpValue = 15;
MapSystem['LichTower'][0].initPosition = new Position(5, 9, 'NORTH');
MapSystem['LichTower'][0].map =  'XXXXXXXXXXX';
MapSystem['LichTower'][0].map += 'G B     CFD';
MapSystem['LichTower'][0].map += 'XXXXX XXXXX';
MapSystem['LichTower'][0].map += 'X         X';
MapSystem['LichTower'][0].map += 'X XXX XXX X';
MapSystem['LichTower'][0].map += 'X XA   EX X';
MapSystem['LichTower'][0].map += 'X XXXXXXX X';
MapSystem['LichTower'][0].map += 'X         X';
MapSystem['LichTower'][0].map += 'X XXX XX XX';
MapSystem['LichTower'][0].map += 'X  AX X  XX';
MapSystem['LichTower'][0].map += 'X XEXDXXADX';
MapSystem['LichTower'][0].map += 'XXXXXXXXXXX';
MapSystem['LichTower'][0].labels = {'A': 'MONSTER/HOMONCULOUS', 'B': 'MONSTER/HUMAN_GUARD(Guarding)', 'C': 'MONSTER/HUMAN_GUARD(OnHold)', 
	'D': 'DOOR/UP_2', 'E': 'EVENT/A healing potion!~POTION/Healing_20', 'F': 'ARMOR/StuddedLeather_3', 'G': 'DOOR/DOWN_1', 
	'EVENT_INIT': 'You open the entrance door of the evil wizard\'s tower.'};

MapSystem['LichTower'][1] = {};
MapSystem['LichTower'][1].mapName = 'Crypt';
MapSystem['LichTower'][1].wall = new Wall('Plain', '#553311', null, '#000000');
MapSystem['LichTower'][1].width = 20;
MapSystem['LichTower'][1].xpValue = 0;
MapSystem['LichTower'][1].initPosition = new Position(1, 3, 'EAST');
MapSystem['LichTower'][1].map =  'XXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][1].map += 'XX          XXEXAXDX';
MapSystem['LichTower'][1].map += 'XX XAXAX XX XB     X';
MapSystem['LichTower'][1].map += 'D JXXXXXXXA X XXXXCX';
MapSystem['LichTower'][1].map += 'XX XAX XEXX X XI   X';
MapSystem['LichTower'][1].map += 'X       BXX   XHXX X';
MapSystem['LichTower'][1].map += 'X XXAXAXEXF X XGXX X';
MapSystem['LichTower'][1].map += 'X XXXXXXXXX X XI  CX';
MapSystem['LichTower'][1].map += 'X           X XXXX X';
MapSystem['LichTower'][1].map += 'X XAX XEXAXAXB     X';
MapSystem['LichTower'][1].map += 'XXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][1].labels = {'A': 'MONSTER/SKELETON(Guarding)', 'B': 'MONSTER/SKELETON', 'C': 'MONSTER/GIANT_SKELETON(Guarding)', 
	'D': 'DOOR/UP_0_1_1_EAST', 'E': 'POTION/Healing_20', 'F': 'ARMOR/StuddedLeather_4', 'G': 'WEAPON/SilverBlade_5', 'H': 'WEAPON/ShortSword_6', 
	'I': 'MONSTER/GIANT_SKELETON', 'J': 'EVENT/*A lot of old graves are here. It\'s better to stay alert.*'};

MapSystem['LichTower'][2] = {};
MapSystem['LichTower'][2].mapName = 'Laboratory';
MapSystem['LichTower'][2].wall = new Wall('FourTriangles', '#661122', '#bbbbbb', '#666666');
MapSystem['LichTower'][2].width = 18;
MapSystem['LichTower'][2].xpValue = 100;
MapSystem['LichTower'][2].initPosition = new Position(16, 1, 'WEST');
MapSystem['LichTower'][2].map =  'XXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][2].map += 'X BD   D         H';
MapSystem['LichTower'][2].map += 'X XXGX X XX XX XXX';
MapSystem['LichTower'][2].map += 'X    DA       ADBD';
MapSystem['LichTower'][2].map += 'X XXXX XX XX XXX X';
MapSystem['LichTower'][2].map += 'X XBED   ACFAD   X';
MapSystem['LichTower'][2].map += 'X D XXDXXXXXDX XDX';
MapSystem['LichTower'][2].map += 'X X  X  BD  BD XCX';
MapSystem['LichTower'][2].map += 'X X XX XXX XDX   X';
MapSystem['LichTower'][2].map += 'X              XFX';
MapSystem['LichTower'][2].map += 'XXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][2].labels = {'A': 'MONSTER/HOMONCULOUS(Guarding)', 'B': 'MONSTER/CRAWLING_CLAWS', 'C': 'POTION/Healing_20', 
	'E': 'WEAPON/ShortSword_6', 'F': 'POTION/Wounding_-20', 'G': 'EVENT/You hear creeping noises coming from nearby.', 
	'H': 'DOOR/DOWN_0_9_1_WEST'};

MapSystem['LichTower'][3] = {};
MapSystem['LichTower'][3].mapName = 'Guard rooms';
MapSystem['LichTower'][3].wall = new Wall('Plain', '#779977', null, '#111111');
MapSystem['LichTower'][3].width = 15;
MapSystem['LichTower'][3].xpValue = 60;
MapSystem['LichTower'][3].initPosition = new Position(13, 2, 'WEST');
MapSystem['LichTower'][3].map =  'XXXXXXXXXXXXXXX';
MapSystem['LichTower'][3].map += 'XCX X      X XX';
MapSystem['LichTower'][3].map += 'X   X X XX    D';
MapSystem['LichTower'][3].map += 'XXX   X XX XXXX';
MapSystem['LichTower'][3].map += 'XA  XDX      AX';
MapSystem['LichTower'][3].map += 'XXXXX XXX XX XX';
MapSystem['LichTower'][3].map += 'X EXA F X     X';
MapSystem['LichTower'][3].map += 'X XX XX XX XX X';
MapSystem['LichTower'][3].map += 'X     X    XACX';
MapSystem['LichTower'][3].map += 'XXBX XXXXXXXXDX';
MapSystem['LichTower'][3].map += 'XXDX X D      X';
MapSystem['LichTower'][3].map += 'X      X X XXCX';
MapSystem['LichTower'][3].map += 'X XXXX X X  XXX';
MapSystem['LichTower'][3].map += 'X BX     XX  BG';
MapSystem['LichTower'][3].map += 'XXXXXXXXXXXXXHX';
MapSystem['LichTower'][3].labels = {'A': 'MONSTER/HUMAN_GUARD', 'B': 'MONSTER/HELL_HOUND', 'C': 'POTION/Healing_30', 
	'D': 'DOOR/DOWN_2_16_3_WEST', 'E': 'ARMOR/ChainMail_5_-5', 'F': 'EVENT/*Ah. The smell is terrible here.*', 'G': 'DOOR/UP_5', 
	'H': 'DOOR/UP_4'};

MapSystem['LichTower'][4] = {};
MapSystem['LichTower'][4].mapName = 'Hall of screams';
MapSystem['LichTower'][4].wall = new Wall('Plain', '#779977', null, '#111111');
MapSystem['LichTower'][4].width = 25;
MapSystem['LichTower'][4].xpValue = 170;
MapSystem['LichTower'][4].initPosition = new Position(21, 23, 'NORTH');
MapSystem['LichTower'][4].map =  'XXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][4].map += 'X   XA           AX     X';
MapSystem['LichTower'][4].map += 'X X   X XXX XX XX X XXX X';
MapSystem['LichTower'][4].map += 'X XXXXX XXX X  FX       X';
MapSystem['LichTower'][4].map += 'X           XXXXX XX XXXX';
MapSystem['LichTower'][4].map += 'XXXXXXXXXXX       XX    X';
MapSystem['LichTower'][4].map += 'XA        X XX XX XXXXX X';
MapSystem['LichTower'][4].map += 'X XXX XBX X XX XX    XX X';
MapSystem['LichTower'][4].map += 'X XXX XXX X       XX    X';
MapSystem['LichTower'][4].map += 'X        AXX XCX XXX XX X';
MapSystem['LichTower'][4].map += 'XX XX XXXXXX XXX XXX XX X';
MapSystem['LichTower'][4].map += 'XX  X X      XAX        X';
MapSystem['LichTower'][4].map += 'X  XX X X XX X X XXX XX X';
MapSystem['LichTower'][4].map += 'DAXX  X X BX X   XXX XBAX';
MapSystem['LichTower'][4].map += 'XXXX XX XXXX XXX X   XXXX';
MapSystem['LichTower'][4].map += 'X     X  X   X X X X    X';
MapSystem['LichTower'][4].map += 'X XXXXX XXX XX X   X XXXX';
MapSystem['LichTower'][4].map += 'X  X XX        XXXXX XB X';
MapSystem['LichTower'][4].map += 'XX X  X X XXX XX     XX X';
MapSystem['LichTower'][4].map += 'XA X XXXX   X  X XXX  X X';
MapSystem['LichTower'][4].map += 'XX X      X X XX X XX X X';
MapSystem['LichTower'][4].map += 'X  XX XXXXX X       X   X';
MapSystem['LichTower'][4].map += 'XX XX   XEX X XXXXX XXX X';
MapSystem['LichTower'][4].map += 'X     X X   X   ADX     X';
MapSystem['LichTower'][4].map += 'XXXXXXXXXXXXXXXXXXXXXGXXX';
MapSystem['LichTower'][4].labels = {'A': 'MONSTER/SPECTRE', 'B': 'POTION/Healing_40', 'C': 'WEAPON/LongSword_7', 
	'D': 'DOOR/UP_6_2_13_EAST', 'E': 'ARMOR/ChainMail_6', 'F': 'ARMOR/PlateMail_7', 'G': 'DOOR/DOWN_3_13_13_NORTH', 
	'EVENT_INIT': '*This chilling breeze makes me uneasy.*'};

MapSystem['LichTower'][5] = {};
MapSystem['LichTower'][5].mapName = 'Dark chamber';
MapSystem['LichTower'][5].wall = new Wall('Plain', '#779977', null, '#111111');
MapSystem['LichTower'][5].width = 25;
MapSystem['LichTower'][5].xpValue = 170;
MapSystem['LichTower'][5].initPosition = new Position(23, 21, 'WEST');
MapSystem['LichTower'][5].map =  'XXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][5].map += 'X    BX X    X    XXBXXAX';
MapSystem['LichTower'][5].map += 'X X XXX X XX X XX       X';
MapSystem['LichTower'][5].map += 'X X       XEAX X  X XX XX';
MapSystem['LichTower'][5].map += 'X XX X XXXXXXX XXXX XX XX';
MapSystem['LichTower'][5].map += 'X    X XX         D     X';
MapSystem['LichTower'][5].map += 'XXXXXX    XX X XXXX XXX X';
MapSystem['LichTower'][5].map += 'X      XXXXA X XA   XXX X';
MapSystem['LichTower'][5].map += 'X XXXXXX XXX X XBXX     X';
MapSystem['LichTower'][5].map += 'X FX      XB X XX   XXXXX';
MapSystem['LichTower'][5].map += 'XXXX XX X XX X XX XXX   X';
MapSystem['LichTower'][5].map += 'DA X X  X X  X    X   X X';
MapSystem['LichTower'][5].map += 'XX X X XXXXX XXXX X XXX X';
MapSystem['LichTower'][5].map += 'XD   X      A   X   X   X';
MapSystem['LichTower'][5].map += 'XXXX XXXXXXX XX XXX X XXX';
MapSystem['LichTower'][5].map += 'X BX  X  X X XXXXXX     X';
MapSystem['LichTower'][5].map += 'X XXXXXX X    XA XXXXXX X';
MapSystem['LichTower'][5].map += 'X      X XXXXXXX      D X';
MapSystem['LichTower'][5].map += 'X XX X         X XXXXXX X';
MapSystem['LichTower'][5].map += 'XXXXXXXX XXXXX   X      X';
MapSystem['LichTower'][5].map += 'X     XX X X XXX XX XX XX';
MapSystem['LichTower'][5].map += 'X XXX XX             XG H';
MapSystem['LichTower'][5].map += 'X XCX XX XXX XXX XXX X XX';
MapSystem['LichTower'][5].map += 'X  AX     X   XX        X';
MapSystem['LichTower'][5].map += 'XXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][5].labels = {'A': 'MONSTER/INVISIBLE_STALKER', 'B': 'POTION/Healing_40', 'C': 'WEAPON/LongSword_7', 
	'D': 'DOOR/UP_6_2_11_EAST', 'E': 'WEAPON/LongSword_8', 'F': 'ARMOR/ChainMail_6', 
	'G': 'EVENT/*Hm, I feel as if I am being watched.*', 'H': 'DOOR/DOWN_3_13_13_WEST'};

MapSystem['LichTower'][6] = {};
MapSystem['LichTower'][6].mapName = 'Hall of elements';
MapSystem['LichTower'][6].wall = new Wall('TwoTriangles', '#5555aa', '#aa5555', '#666666');
MapSystem['LichTower'][6].width = 25;
MapSystem['LichTower'][6].xpValue = 200;
MapSystem['LichTower'][6].initPosition = new Position(2, 12, 'EAST');
MapSystem['LichTower'][6].map =  'XXXXXXXXXXXXXXXXXXDXXXXXX';
MapSystem['LichTower'][6].map += 'X  AX       XDX XXBXX XDX';
MapSystem['LichTower'][6].map += 'X XEX X XX XX          BX';
MapSystem['LichTower'][6].map += 'X XXX X    XXXXX XXXXXX X';
MapSystem['LichTower'][6].map += 'X     XX X    XX   BXHX X';
MapSystem['LichTower'][6].map += 'XXX XXXX XXXX  XX X X   X';
MapSystem['LichTower'][6].map += 'X     X     XX  XXX XXX X';
MapSystem['LichTower'][6].map += 'X XXX X XXX XXX  XX   XXX';
MapSystem['LichTower'][6].map += 'X XCX       XXXX  XXX   X';
MapSystem['LichTower'][6].map += 'X  AX XXXXX XX XX  XX X X';
MapSystem['LichTower'][6].map += 'XXXXX X   X X  CXX X    X';
MapSystem['LichTower'][6].map += 'XD XX X X  AX XXXX X XX X';
MapSystem['LichTower'][6].map += 'XX   I  XCX XB    B   XXX';
MapSystem['LichTower'][6].map += 'XD XXXX XXX X XXXX X XXCX';
MapSystem['LichTower'][6].map += 'XXXXX       X   XX      X';
MapSystem['LichTower'][6].map += 'X     XXXXX XXGXX  X XX X';
MapSystem['LichTower'][6].map += 'XX XXXX     XXXX  XX  X X';
MapSystem['LichTower'][6].map += 'X    XX X XXXXX  XX  XX X';
MapSystem['LichTower'][6].map += 'X XX XA X   XX  XX  XX  X';
MapSystem['LichTower'][6].map += 'X XC XX   XXX  XX  XX  XX';
MapSystem['LichTower'][6].map += 'X XXXXXXX X   XXX XX  XXX';
MapSystem['LichTower'][6].map += 'XA        X XXXBX XX XXFX';
MapSystem['LichTower'][6].map += 'XX XXXXXXXX X      B    X';
MapSystem['LichTower'][6].map += 'X           XDXXCXDXXHXDX';
MapSystem['LichTower'][6].map += 'XXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][6].labels = {'A': 'MONSTER/LESSER_FIRE_ELEMENTAL', 'B': 'MONSTER/LESSER_WATER_ELEMENTAL(Guarding)', 'C': 'POTION/Healing_50', 
	'E': 'ARMOR/PlateMail_7', 'F': 'MONSTER/LESSER_WATER_ELEMENTAL(Guarding)~ARMOR/PlateMail_8', 'G': 'WEAPON/MagicSword_8', 'H': 'WEAPON/TwoHanded_9', 
	'I': 'EVENT/The temperature is much higher here than on the previous floors.', 'EVENT_INIT': 'You hear the lock clicking behind you.'};

MapSystem['LichTower'][7] = {};
MapSystem['LichTower'][7].mapName = 'Ivory sanctum';
MapSystem['LichTower'][7].wall = new Wall('TwoTriangles', '#ddddac', '#cccccc', '#666666');
MapSystem['LichTower'][7].width = 21;
MapSystem['LichTower'][7].xpValue = 0;
MapSystem['LichTower'][7].initPosition = new Position(10, 2, 'SOUTH');
MapSystem['LichTower'][7].map =  'XXXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][7].map += 'X  JS  AEXDXXXXG    X';
MapSystem['LichTower'][7].map += 'XXX XXXXXX XXXXXX XXX';
MapSystem['LichTower'][7].map += 'X     XX  I  XX     X';
MapSystem['LichTower'][7].map += 'X XXX XX XXX XX XXX X';
MapSystem['LichTower'][7].map += 'X SGX    XXX    XXX X';
MapSystem['LichTower'][7].map += 'X XXX XX XXX XX XXX X';
MapSystem['LichTower'][7].map += 'XB    XX     XX     X';
MapSystem['LichTower'][7].map += 'XXX XXXXXXAXXXXXXKXXX';
MapSystem['LichTower'][7].map += 'XXXSXXXXXXSXXXFSXSXXX';
MapSystem['LichTower'][7].map += 'X     XX     XX  L  X';
MapSystem['LichTower'][7].map += 'X XXX XX XXX XX XXX X';
MapSystem['LichTower'][7].map += 'X XXX    XXX    XGX X';
MapSystem['LichTower'][7].map += 'X XXX XX XXX XX XSX X';
MapSystem['LichTower'][7].map += 'X     XXB    XX    BX';
MapSystem['LichTower'][7].map += 'XXXXXXXXXXSXXXXXXXXXX';
MapSystem['LichTower'][7].map += 'X       XXZXX       X';
MapSystem['LichTower'][7].map += 'X XXXXX  AH   XXXXX X';
MapSystem['LichTower'][7].map += 'X XXAXXXXXXXXXXXAXX X';
MapSystem['LichTower'][7].map += 'X         C         X';
MapSystem['LichTower'][7].map += 'XXXXXXXXXXXXXXXXXXXXX';
MapSystem['LichTower'][7].labels = {'A': 'MONSTER/DEATH_KNIGHT(Guarding)', 'B': 'MONSTER/DEATH_KNIGHT', 'C': 'MONSTER/LICH(Guarding, ArchEnemy)',  
	'E': 'ARMOR/FullPlate_9', 'F': 'WEAPON/TwoHanded_10', 'G': 'POTION/Healing_50', 'H': 'POTION/Wounding_-50', 'EVENT_INIT': 'You hear the lock clicking behind you.', 
	'I': "EVENT/Echoing voice: It's starting to be hot, adventurer. Come closer, let me see you! Hahahahaaa...", 'J': 'EVENT/*There is something strange with the east wall.*',
	'K': 'EVENT/*There is something strange with the south wall.*', 'L': 'EVENT/*It was an illusionary wall.*', 
	'Z': "EVENT/Echoing voice: So you've found the secret passage. Your agony will entertain me.", 
	'EVENT_END': 'Well done! You have killed the undead wizard and made the surrounding lands free of his torments.'};


MapSystem['DragonMountain'] = {};
MapSystem['DragonMountain'].systemDirection = 'DOWN';
MapSystem['DragonMountain'].player = {level: 3, weapon: Weapon.get('Dagger_2'), armor: Armor.get('LeatherArmor_2')};

MapSystem['DragonMountain'][0] = {};
MapSystem['DragonMountain'][0].mapName = 'Kobold cave city';
MapSystem['DragonMountain'][0].wall = new Wall('Plain', '#999999', null, '#626262');
MapSystem['DragonMountain'][0].width = 35;
MapSystem['DragonMountain'][0].xpValue = 120;
MapSystem['DragonMountain'][0].initPosition = new Position(33, 11, 'WEST');
MapSystem['DragonMountain'][0].map =  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][0].map += 'XXXXDXXXDXXDXXXDXXXXDXXXDXXDXXDXXXX';
MapSystem['DragonMountain'][0].map += 'XD    A          A           A   DX';
MapSystem['DragonMountain'][0].map += 'XX XXXXXXX XXXXXXXXXXX XXXX XXXX XX';
MapSystem['DragonMountain'][0].map += 'XX XE   AX DXXXDXXDXXD DXXDAXXXX DX';
MapSystem['DragonMountain'][0].map += 'XX XDX XDX XXXXAXXEXXX XXXX XDXX XX';
MapSystem['DragonMountain'][0].map += 'XX XXX XXX         XXX      A  X DX';
MapSystem['DragonMountain'][0].map += 'XD     ADX XXDX XXAXXD XDXX XXDX XX';
MapSystem['DragonMountain'][0].map += 'XXXXXXXXXX XXXXDXXDXXX XXXX XXXXADX';
MapSystem['DragonMountain'][0].map += 'XA            XXXXXXXX XDXX X    XX';
MapSystem['DragonMountain'][0].map += 'XDXXDXXDXX XX   A         X X XXXXX';
MapSystem['DragonMountain'][0].map += 'XXXXXXXXXXAXX XXXXXXXXXXX XAX     X';
MapSystem['DragonMountain'][0].map += 'X   A    X XX XA        X X X XXXXX';
MapSystem['DragonMountain'][0].map += 'X XXXXXX X XXAX XXXXXXX XAX      XX';
MapSystem['DragonMountain'][0].map += 'X XXAXXX X XX X XD G DX X X XXXX DX';
MapSystem['DragonMountain'][0].map += 'X ABFDXX A DX   XX X XX X X XDXX XX';
MapSystem['DragonMountain'][0].map += 'X XX XXX X XX X XD  ADX X       ADX';
MapSystem['DragonMountain'][0].map += 'X XXXXXX X XX X XXX XXX XDX XDXX XX';
MapSystem['DragonMountain'][0].map += 'X   A    X XX X    A    XXX XXXX DX';
MapSystem['DragonMountain'][0].map += 'XXXXXXX XX XX XXXXXXXXXXXXX XDXX XX';
MapSystem['DragonMountain'][0].map += 'XXDXXDX XX XX   A      A         DX';
MapSystem['DragonMountain'][0].map += 'CA        ADXXXXDXXXXDXXXDXXXDXXXXX';
MapSystem['DragonMountain'][0].map += 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][0].labels = {'A': 'MONSTER/KOBOLD', 'B': 'MONSTER/KOBOLD_CHIEFTAIN', 'C': 'DOOR/DOWN_1', 
	'E': 'EVENT/A healing potion!~POTION/Healing_20', 'G': 'WEAPON/QuarterStaff_3', 
	'F': 'POTION/Healing_30~ARMOR/StuddedLeather_3~WEAPON/QuarterStaff_3~EVENT/You find a parchment among the equipments of the chieftain which says the southwesternmost door leads further to the heart of the mountain.', 
	'EVENT_INIT': 'You are approaching the kobold caves, which are rumoured to be the entrance to the mountain of the dragon.'};

MapSystem['DragonMountain'][1] = {};
MapSystem['DragonMountain'][1].mapName = 'Old cemetery';
MapSystem['DragonMountain'][1].wall = new Wall('Plain', '#484848', null, '#222222');
MapSystem['DragonMountain'][1].width = 29;
MapSystem['DragonMountain'][1].xpValue = 150;
MapSystem['DragonMountain'][1].initPosition = new Position(27, 1, 'WEST');
MapSystem['DragonMountain'][1].map =  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][1].map += 'X            BX             E';
MapSystem['DragonMountain'][1].map += 'X XDX XDX XDX X XDX XDX XDX X';
MapSystem['DragonMountain'][1].map += 'X XXX XXX XXX X XXX XXX XXX X';
MapSystem['DragonMountain'][1].map += 'XB            X             X';
MapSystem['DragonMountain'][1].map += 'XFXDX XDX XDXHXAXDX XDX XDX X';
MapSystem['DragonMountain'][1].map += 'XXXXX XXX XXXXXXXXX XXX XXXXX';
MapSystem['DragonMountain'][1].map += 'X      A      X         A   X';
MapSystem['DragonMountain'][1].map += 'X X X X X X X X X X XIX X X X';
MapSystem['DragonMountain'][1].map += 'X             X             X';
MapSystem['DragonMountain'][1].map += 'X XFX X X X X X X X X X X X X';
MapSystem['DragonMountain'][1].map += 'X      A      X    A        X';
MapSystem['DragonMountain'][1].map += 'X XXXXXXXXXXX X XXXXXXXXXXX X';
MapSystem['DragonMountain'][1].map += 'XC                         BX';
MapSystem['DragonMountain'][1].map += 'XXXXXXX XXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][1].map += 'X     X X      JXF  X       X';
MapSystem['DragonMountain'][1].map += 'X XXX  J  XXXXX XXX X X XXX X';
MapSystem['DragonMountain'][1].map += 'X   XX XX   X X       X X   X';
MapSystem['DragonMountain'][1].map += 'X XI X XXXX   XX XXXXXXXX XXX';
MapSystem['DragonMountain'][1].map += 'X XX XJX  X X XX X    XFX   X';
MapSystem['DragonMountain'][1].map += 'XBGX   XX   X      XX  JX XBX';
MapSystem['DragonMountain'][1].map += 'XXXXXXXXXXXXXXXXXXXXXXXXXXXDX';
MapSystem['DragonMountain'][1].labels = {'A': 'MONSTER/SKELETON', 'B': 'MONSTER/GHOUL', 'C': 'MONSTER/SPECTRE', 'J': 'MONSTER/ZOMBIE', 
	'E': 'DOOR/UP_0_1_21_EAST', 'F': 'POTION/Healing_20', 'G': 'ARMOR/StuddedLeather_4', 'H': 'WEAPON/SilverBlade_4', 'I': 'WEAPON/Quarterstaff_4'};

MapSystem['DragonMountain'][2] = {};
MapSystem['DragonMountain'][2].mapName = 'Ancient passages of the Drow';
MapSystem['DragonMountain'][2].wall = new Wall('TwoTriangles', '#701B6E', '#644470', '#222222');
MapSystem['DragonMountain'][2].width = 32;
MapSystem['DragonMountain'][2].xpValue = 250;
MapSystem['DragonMountain'][2].initPosition = new Position(12, 1, 'SOUTH');
MapSystem['DragonMountain'][2].map =  'XXXXXXXXXXXXEXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][2].map += 'XI   X    XX X            IX  IX';
MapSystem['DragonMountain'][2].map += 'X XX X XX  XJX XXXX XXXXXX X XFX';
MapSystem['DragonMountain'][2].map += 'X XX X XX XX X   X      X    XXX';
MapSystem['DragonMountain'][2].map += 'X  X    X XXBXXX X XXXX X X XXIX';
MapSystem['DragonMountain'][2].map += 'XX XXXXXXC FK   C    X  X X    X';
MapSystem['DragonMountain'][2].map += 'X  X   IXXXXXXXX XXX X XX   XX X';
MapSystem['DragonMountain'][2].map += 'X XX XXXXG  XFXX XXXXXXXXXXXXX X';
MapSystem['DragonMountain'][2].map += 'X      XXXXI   X XA        X   X';
MapSystem['DragonMountain'][2].map += 'XXXXXX   XX XXXX X XXXXXXX X XXX';
MapSystem['DragonMountain'][2].map += 'X    XXX         X X     X X X X';
MapSystem['DragonMountain'][2].map += 'X XX   XXXXXXXXXXX X XXX   X   X';
MapSystem['DragonMountain'][2].map += 'X  X X X       X   X   XX XX X X';
MapSystem['DragonMountain'][2].map += 'XX X XXX X XXX XXX X X  X    X X';
MapSystem['DragonMountain'][2].map += 'DA X  X  X X    X  XXXX X XXXX X';
MapSystem['DragonMountain'][2].map += 'XXXX XXX X X X XX XX    X X    X';
MapSystem['DragonMountain'][2].map += 'X    X   X   X    X  XXXX X XX X';
MapSystem['DragonMountain'][2].map += 'X XXXX XXXXXXXXXXXXX      X X  X';
MapSystem['DragonMountain'][2].map += 'X      X X        XX XXXXXX XXXX';
MapSystem['DragonMountain'][2].map += 'X XXXX   X XAXXXX XX X         X';
MapSystem['DragonMountain'][2].map += 'X   XXXXXX XXX X     X XX XXXX X';
MapSystem['DragonMountain'][2].map += 'XXX      X     X XXX X  X XXHX X';
MapSystem['DragonMountain'][2].map += 'X XXXXXX XXXXX X X X XX      X X';
MapSystem['DragonMountain'][2].map += 'XAFX   X XF  X X X    X XX XXX X';
MapSystem['DragonMountain'][2].map += 'X XX X X XX XX X X XXXX X  X X X';
MapSystem['DragonMountain'][2].map += 'X    X         XA       XX    AX';
MapSystem['DragonMountain'][2].map += 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][2].labels = {'A': 'MONSTER/DROW_MAGE', 'B': 'MONSTER/HUMAN_ELITE_WARRIOR(OnHold)', 'C': 'MONSTER/HUMAN_PRIEST(Guarding)', 
	'E': 'DOOR/UP_1_27_20_NORTH', 'F': 'POTION/Healing_30', 'G': 'ARMOR/ChainMail_5', 'H': 'WEAPON/ShortSword_5', 'I': 'MONSTER/HUMAN_PRIEST', 
	'J': 'EVENT/Elite Warrior: Halt! We are protecting this ancient area from the undead plague. No one can enter in these times. You must leave.', 
	'K': 'EVENT/Human voice: Please, don\'t come further! You will release an extreme threat, if you still proceed. Although you killed our captain, we allow you to leave freely.'};

MapSystem['DragonMountain'][3] = {};
MapSystem['DragonMountain'][3].mapName = 'Ancient halls of the Drow';
MapSystem['DragonMountain'][3].wall = new Wall('TwoTriangles', '#701B6E', '#644470', '#222222');
MapSystem['DragonMountain'][3].width = 27;
MapSystem['DragonMountain'][3].xpValue = 220;
MapSystem['DragonMountain'][3].initPosition = new Position(25, 18, 'WEST');
MapSystem['DragonMountain'][3].map =  'XXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][3].map += 'X        X    XX          X';
MapSystem['DragonMountain'][3].map += 'X XXXXXX XAX XXXX XX XXXX X';
MapSystem['DragonMountain'][3].map += 'X XX F X XHX     AXX    X X';
MapSystem['DragonMountain'][3].map += 'X A  X   XXX XXXX XXXXXFX X';
MapSystem['DragonMountain'][3].map += 'X XX XXX XXX XXXXXXX  XXX X';
MapSystem['DragonMountain'][3].map += 'X  X   XA            XX X X';
MapSystem['DragonMountain'][3].map += 'X XX X XXXXXXXXXXXXX    X X';
MapSystem['DragonMountain'][3].map += 'X    X XA          X XXXX X';
MapSystem['DragonMountain'][3].map += 'X XXAX X XXXXJXXXX X      X';
MapSystem['DragonMountain'][3].map += 'XXXXXX X X   C  BX XX XXX X';
MapSystem['DragonMountain'][3].map += 'X     AX X XX XX X XX AXX X';
MapSystem['DragonMountain'][3].map += 'XFX X XX X XX XX X XXXXXX X';
MapSystem['DragonMountain'][3].map += 'XXX X    X   Z   X X    X X';
MapSystem['DragonMountain'][3].map += 'X   XX X X XX XX X X XX X X';
MapSystem['DragonMountain'][3].map += 'X X    X X XX XX X X XX   X';
MapSystem['DragonMountain'][3].map += 'X XXXXXX X   F   X X XX XXX';
MapSystem['DragonMountain'][3].map += 'XA     X XXXXXXXXX X    XXX';
MapSystem['DragonMountain'][3].map += 'X XXXX X          AX XX   E';
MapSystem['DragonMountain'][3].map += 'X X  X XXXXXXXXXXXXX XXXXXX';
MapSystem['DragonMountain'][3].map += 'X X XXA       X   AX      X';
MapSystem['DragonMountain'][3].map += 'X X XXXXXXXXX X XXGXXX XX X';
MapSystem['DragonMountain'][3].map += 'X X        X    XXXXXX XX X';
MapSystem['DragonMountain'][3].map += 'X X XXXX X   XX         X X';
MapSystem['DragonMountain'][3].map += 'X XXX XX XXX XX XXX XXXXX X';
MapSystem['DragonMountain'][3].map += 'XA        X  XX FXA       X';
MapSystem['DragonMountain'][3].map += 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][3].labels = {'A': 'MONSTER/DROW_MAGE', 'B': 'MONSTER/BEHOLDER', 'C': 'EVENT/*Wait! Somebody is here.*', 
	'E': 'DOOR/UP_2_1_14_EAST', 'F': 'POTION/Healing_30', 'G': 'ARMOR/ChainMail_6', 'H': 'WEAPON/MagicSword_6_2', 'I': 'WEAPON/LongSword_7', 
	'J': 'EVENT/*A dimension door! Does it lead to the mountain of the dragon?*', 'Z': 'DIMENSION/UP'};
	
MapSystem['DragonMountain'][4] = {};
MapSystem['DragonMountain'][4].mapName = 'Lower levels of the Dragon Mountain';
MapSystem['DragonMountain'][4].wall = new Wall('Plain', '#775533', null, '#222222');
MapSystem['DragonMountain'][4].width = 32;
MapSystem['DragonMountain'][4].xpValue = 250;
MapSystem['DragonMountain'][4].initPosition = new Position(1, 15, 'EAST');
MapSystem['DragonMountain'][4].map =  'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][4].map += 'X  B           XX  X  AGXAFX  CD';
MapSystem['DragonMountain'][4].map += 'X X XXXXXXX XX  XX   XXXX XX XXX';
MapSystem['DragonMountain'][4].map += 'X X     FXX XXX  XXX   XX XX XAX';
MapSystem['DragonMountain'][4].map += 'X XXXXX XX  XXXX B   X X  X    X';
MapSystem['DragonMountain'][4].map += 'X   XXB    XXXXXX X XX   XXX XFX';
MapSystem['DragonMountain'][4].map += 'XXX XX XXX     XX X XXXX X   XXX';
MapSystem['DragonMountain'][4].map += 'X      XXXXXXX    X   B  X X  XX';
MapSystem['DragonMountain'][4].map += 'X XXXX   XXXXXXXXXXXXX XXX XXXXX';
MapSystem['DragonMountain'][4].map += 'X XXXXXX X          XX XX      X';
MapSystem['DragonMountain'][4].map += 'X XXB      XXXXXXXX   A X XXXX X';
MapSystem['DragonMountain'][4].map += 'X XX X XXXXX   B  XXXXX X  XX  X';
MapSystem['DragonMountain'][4].map += 'X    X  XXBX XXXX       XX XX XX';
MapSystem['DragonMountain'][4].map += 'XAXX XX    X XHBXXXXXX XX    BXX';
MapSystem['DragonMountain'][4].map += 'XXXX XXXXX X XX     XX    XXXXXX';
MapSystem['DragonMountain'][4].map += 'E     AX   X XX XXX XXBXXXX    X';
MapSystem['DragonMountain'][4].map += 'XXXX XXX X X        XX      XX X';
MapSystem['DragonMountain'][4].map += 'XB X XB  X XXX XX XXXXX XXX XX X';
MapSystem['DragonMountain'][4].map += 'XX X XFX X     XX XXXXX XXX XX X';
MapSystem['DragonMountain'][4].map += 'X    XXX XXXXX X       BXXX XX X';
MapSystem['DragonMountain'][4].map += 'X XX           X XX XXX       BX';
MapSystem['DragonMountain'][4].map += 'X    XXX X XXX X XX XXXXXXX XX X';
MapSystem['DragonMountain'][4].map += 'X XXXXXXBX  XX         B       X';
MapSystem['DragonMountain'][4].map += 'X     BXXXXAXXXXXXX XXX XXX XXXX';
MapSystem['DragonMountain'][4].map += 'X XXXX XF   XX B XX XXX        X';
MapSystem['DragonMountain'][4].map += 'X XXXX XXX XXX X XX XXXXX X XX X';
MapSystem['DragonMountain'][4].map += 'X XX     X     X       XX   X  X';
MapSystem['DragonMountain'][4].map += 'X XX XXX XXX XXX XXXXX XXXX X XX';
MapSystem['DragonMountain'][4].map += 'X XX XXX X  B    XXXXX      X  X';
MapSystem['DragonMountain'][4].map += 'X XX     X XXX X XXXXX XX XXXX X';
MapSystem['DragonMountain'][4].map += 'X    XXXA      X      AXX     BX';
MapSystem['DragonMountain'][4].map += 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][4].labels = {'A': 'MONSTER/GORGON', 'B': 'MONSTER/TROLL', 'C': 'MONSTER/TROLL(Guarding)', 'D': 'DOOR/UP', 
	'E': 'DIMENSION/DOWN_3_13_12_NORTH', 'F': 'POTION/Healing_40', 'G': 'ARMOR/PlateMail_7', 'H': 'WEAPON/LongSword_8'};

MapSystem['DragonMountain'][5] = {};
MapSystem['DragonMountain'][5].mapName = 'Belly of the Dragon Mountain';
MapSystem['DragonMountain'][5].wall = new Wall('TwoTriangles', '#888888', '#886644', '#333333');
MapSystem['DragonMountain'][5].width = 27;
MapSystem['DragonMountain'][5].xpValue = 200;
MapSystem['DragonMountain'][5].initPosition = new Position(25, 1, 'WEST');
MapSystem['DragonMountain'][5].map =  'XXXXXXXXXXXXXXXXXXXXXXXXXXX';
MapSystem['DragonMountain'][5].map += 'XA    X   A      XXXFXA   E';
MapSystem['DragonMountain'][5].map += 'X XXX   XXXXX XX X XCXXJXXX';
MapSystem['DragonMountain'][5].map += 'X XXXXX X C X XX         XX';
MapSystem['DragonMountain'][5].map += 'X XX   BXHX X XXXXXX XXX XX';
MapSystem['DragonMountain'][5].map += 'X XX XX XXX XB       X    X';
MapSystem['DragonMountain'][5].map += 'X    XX     XXXXXXXXXX XX X';
MapSystem['DragonMountain'][5].map += 'XXXX XXXXXX X    XB    XX X';
MapSystem['DragonMountain'][5].map += 'XB        X   XX XX XXXXX X';
MapSystem['DragonMountain'][5].map += 'X XXXXXXX XXX XX XX XB    X';
MapSystem['DragonMountain'][5].map += 'X     F X XB        X XXX X';
MapSystem['DragonMountain'][5].map += 'X XXXXX X X XXX X XXX XXX X';
MapSystem['DragonMountain'][5].map += 'XA        X XXX X AFX XXX X';
MapSystem['DragonMountain'][5].map += 'X XXXXXXXXX XXX XXXXXAF   X';
MapSystem['DragonMountain'][5].map += 'X XXXX   B          XXXXXXX';
MapSystem['DragonMountain'][5].map += 'X      XXXXXXXXXXXX X  F AX';
MapSystem['DragonMountain'][5].map += 'XX XXX          C X X XXX X';
MapSystem['DragonMountain'][5].map += 'XX XXXXXXX XX X XGX X XXX X';
MapSystem['DragonMountain'][5].map += 'X         BXX X XXX X    BX';
MapSystem['DragonMountain'][5].map += 'X XX XXXXX XX X       XXXXX';
MapSystem['DragonMountain'][5].map += 'X XX X  XX    XXXXXXXXXXXIX';
MapSystem['DragonMountain'][5].map += 'XA   XXCXXXXXXXX    AXXA  X';
MapSystem['DragonMountain'][5].map += 'XXXX XC         BXXX XX X X';
MapSystem['DragonMountain'][5].map += 'X    XFX XXCXXXX XXX C  XAX';
MapSystem['DragonMountain'][5].map += 'X XXXXXX  X    X XXX XX X X';
MapSystem['DragonMountain'][5].map += 'XB       XXXXXCX     XXB  X';
MapSystem['DragonMountain'][5].map += 'XXXXXXXXXXXXXXDXXXXXXXXXXXX';
MapSystem['DragonMountain'][5].labels = {'A': 'MONSTER/INTELLECT_DEVOURER', 'B': 'MONSTER/TROLL', 'C': 'MONSTER/TROLL(Guarding)', 
	'D': 'DOOR/UP', 'E': 'DOOR/DOWN_4_30_1_WEST', 'F': 'POTION/Healing_40', 'G': 'ARMOR/PlateMail_8', 
	'H': 'WEAPON/TwoHanded_9', 'I': 'WEAPON/MagicSword_8_3', 'J': 'EVENT/*This was an intellect devourer! They use Psionic ranged attacks.*'};

MapSystem['DragonMountain'][6] = {};
MapSystem['DragonMountain'][6].mapName = 'Giant dwellings';
MapSystem['DragonMountain'][6].wall = new Wall('FourTriangles', '#8f8f8f', '#bbbbbb', '#444444');
MapSystem['DragonMountain'][6].width = 22;
MapSystem['DragonMountain'][6].xpValue = 200;
MapSystem['DragonMountain'][6].initPosition = new Position(12, 22, 'NORTH');
MapSystem['DragonMountain'][6].map =  'XXXXXXXXXXXDXXXXXXXXXX';
MapSystem['DragonMountain'][6].map += 'XB     XSIXHXX      AX';
MapSystem['DragonMountain'][6].map += 'X XXXX X XXLXD XXXDX X';
MapSystem['DragonMountain'][6].map += 'XJGDXX HRXXSXX XDXXX X';
MapSystem['DragonMountain'][6].map += 'X XXXX X   K  AX     X';
MapSystem['DragonMountain'][6].map += 'X     BXXXXXXXXX XDXXX';
MapSystem['DragonMountain'][6].map += 'XHXDXXXX      AX XXXDX';
MapSystem['DragonMountain'][6].map += 'X XXXDA  XX XX X    AX';
MapSystem['DragonMountain'][6].map += 'XC XXX XXXX XX XXXXX X';
MapSystem['DragonMountain'][6].map += 'XXOXXX XDXXB     DXX X';
MapSystem['DragonMountain'][6].map += 'XT PXX      XXXX XXX X';
MapSystem['DragonMountain'][6].map += 'X X XX XXXX      DXX X';
MapSystem['DragonMountain'][6].map += 'X C XDFXQCX X XX XXX X';
MapSystem['DragonMountain'][6].map += 'XX XXXXXX X X DX     X';
MapSystem['DragonMountain'][6].map += 'XXOXXDXXXOX   XXDXXXDX';
MapSystem['DragonMountain'][6].map += 'XXM      NX XXXXXXXXXX';
MapSystem['DragonMountain'][6].map += 'XXXXX XXXXX    A     X';
MapSystem['DragonMountain'][6].map += 'XBFDX XXDXXXXXX XXDX X';
MapSystem['DragonMountain'][6].map += 'X XXX        XX XXXX X';
MapSystem['DragonMountain'][6].map += 'X XXX XXX XX XX DXXX X';
MapSystem['DragonMountain'][6].map += 'X     XXD       XXXX X';
MapSystem['DragonMountain'][6].map += 'X XXX XXX XX XX XXDX X';
MapSystem['DragonMountain'][6].map += 'XDXXX    AXX XX     BX';
MapSystem['DragonMountain'][6].map += 'XXXXXXXXXXXXEXXXXXXXXX';
MapSystem['DragonMountain'][6].labels = {'A': 'MONSTER/FIRE_GIANT', 'B': 'MONSTER/NIGHTMARE', 'C': 'MONSTER/FIRE_GIANT(OnHold)', 
	'D': 'DOOR/UP', 'E': 'DOOR/DOWN_5_14_25_NORTH', 'F': 'POTION/Healing_50', 'G': 'ARMOR/FullPlate_10', 'H': 'MONSTER/FIRE_GIANT(Guarding)', 
	'EVENT_INIT': '*I am going slowly upwards in the mountain, heading to the top.*', 'I': 'WEAPON/MagicSword_9_3', 'J': 'MONSTER/FIRE_GIANT_KING(Guarding)', 
	'K': 'EVENT/*There is something strange with the north wall.*', 'L': 'EVENT/*It was an illusionary wall.*', 
	'M': 'EVENT/The inscription of the door says: Armory', 'N': 'EVENT/The inscription of the door says: Storage room', 
	'T': 'WEAPON/ShortSword_6~WEAPON/TwoHanded_10_-5~WEAPON/LongSword_8~WEAPON/SilverBlade_7', 'P':'ARMOR/FullPlate_9_-9~ARMOR/PlateMail_8_-7~ARMOR/ChainMail_6', 
	'Q': 'POTION/Healing_50~POTION/Healing_50~POTION/Healing_50~POTION/Healing_50', 'R': 'EVENT/*This seems to be the residence of the Fire Giant King.*'};

MapSystem['DragonMountain'][7] = {};
MapSystem['DragonMountain'][7].mapName = 'Top of the Dragon Mountain';
MapSystem['DragonMountain'][7].wall = new Wall('FourTriangles', '#999999', '#660011', '#555555');
MapSystem['DragonMountain'][7].width = 13;
MapSystem['DragonMountain'][7].xpValue = 0;
MapSystem['DragonMountain'][7].initPosition = new Position(5, 2, 'SOUTH');
MapSystem['DragonMountain'][7].map =  'XXXXXXXXXXXXX';
MapSystem['DragonMountain'][7].map += 'XX HXDXXXXXXX';
MapSystem['DragonMountain'][7].map += 'XX XX XXXXXXX';
MapSystem['DragonMountain'][7].map += 'XXSXXIXXXXXXX';
MapSystem['DragonMountain'][7].map += 'XF O  BO JXXX';
MapSystem['DragonMountain'][7].map += 'XBXXX XXX XXX';
MapSystem['DragonMountain'][7].map += 'XXXXXOX A A X';
MapSystem['DragonMountain'][7].map += 'XX GX X XXX X';
MapSystem['DragonMountain'][7].map += 'XX XXFX XXX X';
MapSystem['DragonMountain'][7].map += 'X CMXXX XXX X';
MapSystem['DragonMountain'][7].map += 'X XAXXX XXX X';
MapSystem['DragonMountain'][7].map += 'X  N  K     X';
MapSystem['DragonMountain'][7].map += 'XXXXXXXXXXXXX';

MapSystem['DragonMountain'][7].labels = {'A': 'MONSTER/FIRE_GIANT(Guarding)', 'B': 'MONSTER/BEHOLDER(Guarding)', 'C': 'MONSTER/RED_DRAGON(Guarding, ArchEnemy)', 
	'E': 'DOOR/DOWN_5_14_25_NORTH', 'F': 'POTION/Healing_50', 'G': 'POTION/Healing_80~WEAPON/LongSword_8~ARMOR/FullPlate_10~WEAPON/Dagger_3~WEAPON/SilverBlade_7_-1~WEAPON/QuarterStaff_4~ARMOR/ChainMail_6', 'H': 'WEAPON/TwoHanded_10', 
	'EVENT_INIT': 'You hear the lock clicking behind you.', 'I': 'EVENT/Dragon\'s voice: So you have found my hiding place. Be my guest and choose a door, mortal!', 
	'J': 'EVENT/Dragon\'s voice: It is a pity those mindless undeads in the old cemetery blocked the way to the surface recently. One of the priests must have messed with the dead but was too dumb to control them. Otherwise, I would have united my army of Drows, Trolls and Giants with the swarm of my faithful Kobold followers earlier to rule the world. Now, that you killed half of my army, my wrath shall destroy you!', 
	'K': 'EVENT/Dragon\'s voice: No more guards, I swear. Now follow the corridor, I am waiting for you.', 
	'M': 'MONSTER/INTELLECT_DEVOURER', 'N': 'EVENT/Dragon\'s voice: I lied. Hahahahahaaa...', 
	'EVENT_END': 'Well done! You have killed the Dragon preventing him to execute his plan to enslave the world with his army of monsters.'};
