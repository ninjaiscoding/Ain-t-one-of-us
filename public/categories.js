const CATEGORIES = {
  animals: {
    id: "animals",
    name: "Animals",
    icon: "🐾",
    words: [
      "Lion", "Tiger", "African Elephant", "Cheetah", "Leopard", "Jaguar", "Snow Leopard", "Puma", "Wolf", "Grizzly Bear",
      "Polar Bear", "Panda Bear", "Gorilla", "Chimpanzee", "Orangutan", "Kangaroo", "Koala", "Sloth", "Giraffe", "Zebra",
      "Hippopotamus", "Rhinoceros", "Camel", "Llama", "Alpaca", "Deer", "Moose", "Elk", "Wild Boar", "Hyena",
      "Fox", "Red Panda", "Raccoon", "Skunk", "Otter", "Beaver", "Capybara", "Porcupine", "Hedgehog", "Platypus",
      "Eagle", "Falcon", "Hawk", "Owl", "Flamingo", "Penguin", "Peacock", "Toucan", "Parrot", "Hummingbird",
      "Ostrich", "Pelican", "Swan", "Vulture", "Albatross", "Kingfisher", "Woodpecker", "Crow", "Blue Jay", "Cardinal",
      "Great White Shark", "Hammerhead Shark", "Blue Whale", "Humpback Whale", "Killer Whale (Orca)", "Dolphin", "Manatee", "Seal", "Walrus", "Sea Otter",
      "Giant Squid", "Octopus", "Jellyfish", "Stingray", "Sea Turtle", "Seahorse", "Clownfish", "Pufferfish", "Lobster", "Crab",
      "King Cobra", "Python", "Rattlesnake", "Komodo Dragon", "Chameleon", "Gecko", "Iguana", "Alligator", "Crocodile", "Galapagos Tortoise",
      "Poison Dart Frog", "Axolotl", "Salamander", "Chinchilla", "Lemur", "Meerkat", "Tasmanian Devil", "Wombat", "Dingo", "Fennec Fox"
    ],
    questions: [
      { normal: "How dangerous would this animal be if you met it in the wild?", imposter: "How cute would this animal be to keep as a home pet?" },
      { normal: "What type of environment or ecosystem does this animal prefer?", imposter: "What color or skin pattern is most iconic for this animal?" },
      { normal: "What does this animal typically eat to survive?", imposter: "How fast or agile is this animal when escaping predators?" },
      { normal: "If you had to describe this animal's sound, what would it be?", imposter: "What size is this animal compared to an average adult human?" },
      { normal: "Is this animal known for swimming, flying, running, or climbing?", imposter: "Is this animal active mostly during the day or at night?" }
    ]
  },
  sports: {
    id: "sports",
    name: "Sports",
    icon: "⚽",
    words: [
      "Soccer", "Basketball", "American Football", "Tennis", "Cricket", "Baseball", "Golf", "Rugby", "Ice Hockey", "Field Hockey",
      "Table Tennis", "Badminton", "Volleyball", "Beach Volleyball", "Swimming", "Formula 1", "Boxing", "Mixed Martial Arts (MMA)", "Wrestling", "Judo",
      "Karate", "Taekwondo", "Gymnastics", "Track & Field", "Marathon", "Skiing", "Snowboarding", "Surfing", "Skateboarding", "Archery",
      "Fencing", "Rowing", "Canoeing", "Water Polo", "Bowling", "Billiards / Pool", "Dart Throwing", "Squash", "Cricket T20", "Equestrian"
    ],
    questions: [
      { normal: "What primary piece of equipment is essential to play this sport?", imposter: "How many players are typically on the field/court per team?" },
      { normal: "Is this sport played indoors, outdoors, or on water/ice?", imposter: "How physical or contact-heavy is this sport?" },
      { normal: "What is the main goal or scoring mechanism in this sport?", imposter: "Which global tournament or event is biggest for this sport?" },
      { normal: "Does this sport rely more on team coordination or individual stamina?", imposter: "How long does a standard match or game usually last?" }
    ]
  },
  sportsmen: {
    id: "sportsmen",
    name: "Sportsmen & Athletes",
    icon: "🏆",
    words: [
      "Lionel Messi", "Cristiano Ronaldo", "LeBron James", "Michael Jordan", "Kobe Bryant", "Usain Bolt", "Serena Williams", "Roger Federer", "Rafael Nadal", "Novak Djokovic",
      "Muhammad Ali", "Mike Tyson", "Conor McGregor", "Tom Brady", "Tiger Woods", "Stephen Curry", "Lewis Hamilton", "Max Verstappen", "Michael Schumacher", "Pele",
      "Diego Maradona", "Kylian Mbappé", "Neymar Jr", "Virat Kohli", "Sachin Tendulkar", "MS Dhoni", "Wayne Gretzky", "Simone Biles", "Michael Phelps", "Shaquille O'Neal",
      "Giannis Antetokounmpo", "Erling Haaland", "Luka Dončić", "Zlatan Ibrahimović", "Yuvraj Singh", "Shohei Ohtani", "Carlos Alcaraz", "Manny Pacquiao", "Floyd Mayweather", "Ronda Rousey"
    ],
    questions: [
      { normal: "Which sport brought this legendary athlete international fame?", imposter: "Which country or national team did this athlete represent?" },
      { normal: "What is the most famous record or achievement of this athlete?", imposter: "Is this athlete still actively competing or retired?" },
      { normal: "What personal style or signature move is this athlete known for?", imposter: "How would you rate their global popularity on a scale of 1 to 10?" }
    ]
  },
  movies: {
    id: "movies",
    name: "Famous Movies",
    icon: "🎬",
    words: [
      "Inception", "Titanic", "Avatar", "The Dark Knight", "Interstellar", "Pulp Fiction", "The Matrix", "Fight Club", "The Godfather", "Forrest Gump",
      "Gladiator", "Jurassic Park", "Avengers: Endgame", "Star Wars: A New Hope", "Harry Potter and the Sorcerer's Stone", "Lord of the Rings: The Fellowship", "The Shawshank Redemption", "Spider-Man: Into the Spider-Verse", "Oppenheimer", "Barbie",
      "La La Land", "Schindler's List", "Parasite", "Whiplash", "Jaws", "Back to the Future", "Alien", "The Silence of the Lambs", "Django Unchained", "The Wolf of Wall Street",
      "Spirited Away", "Coco", "The Lion King", "Toy Story", "Shrek", "The Avengers", "Black Panther", "Joker", "Top Gun: Maverick", "Dune"
    ],
    questions: [
      { normal: "What is the core genre or main conflict in this movie?", imposter: "What emotion did you feel most while watching this movie?" },
      { normal: "Who is the protagonist or main iconic character in this film?", imposter: "Where or in what setting does the majority of the plot take place?" },
      { normal: "Is this movie known for mind-bending plot twists or heavy action?", imposter: "Was this movie a massive box office blockbuster or an indie hit?" }
    ]
  },
  youtubers: {
    id: "youtubers",
    name: "Famous YouTubers",
    icon: "📹",
    words: [
      "MrBeast", "PewDiePie", "Markiplier", "Jacksepticeye", "KSI", "Logan Paul", "Jake Paul", "Dude Perfect", "IShowSpeed", "Kai Cenat",
      "MKBHD (Marques Brownlee)", "Linus Tech Tips", "DanTDM", "Dream", "Ninja", "SSundee", "Technoblade", "Smosh", "Ryan Trahan", "Unspeakable",
      "Airrack", "Veritasium", "Vsauce", "Kurzgesagt", "Mark Rober", "Casey Neistat", "Gordon Ramsay", "Zach King", "Fidias", "Aphmau",
      "SSSniperWolf", "Pokimane", "Valkyrae", "Emma Chamberlain", "Lofi Girl", "Daily Dose of Internet", "Good Mythical Morning", "First We Feast (Hot Ones)", "Niko Omilana", "Jaser"
    ],
    questions: [
      { normal: "What style of content is this creator most famous for?", imposter: "What age demographic watches this YouTuber the most?" },
      { normal: "What type of signature challenge or visual style do they use?", imposter: "How many subscriber milestones have they surpassed (millions)?" },
      { normal: "What is a signature catchphrase or recurring theme on their channel?", imposter: "Do they upload long-form videos, streams, or short clips primarily?" }
    ]
  },
  space: {
    id: "space",
    name: "Space & Cosmos",
    icon: "🚀",
    words: [
      "Supernova", "Black Hole", "Milky Way Galaxy", "James Webb Space Telescope", "International Space Station", "Apollo 11", "Hubble Telescope", "Mars Rover Curiosity", "Saturn's Rings", "Solar Eclipse",
      "Neutron Star", "Light Year", "Nebula", "Asteroid Belt", "Halley's Comet", "Exoplanet", "Jupiter's Great Red Spot", "Solar Flare", "Andromeda Galaxy", "Gravitational Wave",
      "Pluto", "Moon Landing", "SpaceX Falcon Heavy", "Voyager 1", "Artemis Program", "Cosmic Microwave Background", "Dark Matter", "Wormhole", "Orbital Satellite", "Event Horizon",
      "Astronaut Suit", "Red Giant", "White Dwarf", "Kuiper Belt", "Solar Wind", "Gamma Ray Burst", "Space Shuttle Discovery", "Zero Gravity", "Terraforming", "Alien Life Search"
    ],
    questions: [
      { normal: "How dangerous or extreme is this space entity/concept?", imposter: "Can humans physically visit or see this with current technology?" },
      { normal: "What branch of astronomy or science studies this phenomenon?", imposter: "Is this located within our Solar System or far beyond in deep space?" },
      { normal: "What visual appearance or color comes to mind when you picture this?", imposter: "How large is this compared to Planet Earth?" }
    ]
  },
  objects: {
    id: "objects",
    name: "Objects & Household Items",
    icon: "📦",
    words: [
      "Ceiling Fan", "Refrigerator", "Microwave Oven", "Washing Machine", "Vacuum Cleaner", "Air Conditioner", "Desk Lamp", "Coffee Maker", "Toaster", "Electric Kettle",
      "Television", "Blender", "Alarm Clock", "Wall Mirror", "Bookshelf", "Sofa / Couch", "Dining Table", "Frying Pan", "Chef Knife", "Hair Dryer",
      "Ironing Board", "Water Bottle", "Umbrella", "Backpack", "Sunglasses", "Wristwatch", "Headphones", "Toothbrush", "Pillow", "Bed Mattress",
      "Curtains", "Trash Can", "Fire Extinguisher", "Door Key", "Calculator", "Scissors", "Flashlight", "Luggage Suitcase", "Wall Clock", "Shoe Rack"
    ],
    questions: [
      { normal: "In which room of a standard house would you find this object?", imposter: "Does this object require electricity or batteries to function?" },
      { normal: "What daily problem or task does this object solve?", imposter: "Is this object made primarily of metal, plastic, fabric, or glass?" },
      { normal: "How often do you interact with or use this item in a week?", imposter: "How heavy or difficult is it to carry this item in a backpack?" }
    ]
  },
  people: {
    id: "people",
    name: "Famous People & Celebrities",
    icon: "🌟",
    words: [
      "Elon Musk", "Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos", "Taylor Swift", "Beyoncé", "Rihanna", "Drake", "Kanye West",
      "Leonardo DiCaprio", "Tom Cruise", "Brad Pitt", "Dwayne 'The Rock' Johnson", "Keanu Reeves", "Zendaya", "Margot Robbie", "Ryan Reynolds", "Morgan Freeman", "Johnny Depp",
      "Oprah Winfrey", "Barack Obama", "Donald Trump", "Kim Kardashian", "Kylie Jenner", "Lady Gaga", "Justin Bieber", "Ariana Grande", "Ed Sheeran", "Billie Eilish",
      "Gordon Ramsay", "MrBeast", "Stephen Hawking", "Albert Einstein", "Oprah", "Will Smith", "Jennifer Lawrence", "Chris Hemsworth", "Robert Downey Jr", "Scarlett Johansson"
    ],
    questions: [
      { normal: "What industry or field made this individual internationally famous?", imposter: "What is their public reputation or general media image?" },
      { normal: "What is one iconic product, song, movie, or company linked to them?", imposter: "Have they ever won an Oscar, Grammy, or built a tech empire?" },
      { normal: "How active are they on social media platforms like X or Instagram?", imposter: "Are they primarily active in America, Europe, or globally?" }
    ]
  },
  history: {
    id: "history",
    name: "History & Events",
    icon: "📜",
    words: [
      "Pyramids of Giza", "Roman Empire", "Industrial Revolution", "World War I", "World War II", "French Revolution", "The Renaissance", "The Great Wall of China", "Apollo 11 Moon Landing", "Fall of the Berlin Wall",
      "The Black Death", "American Civil War", "The Viking Age", "Ancient Egypt", "The Silk Road", "Discovery of America", "The Cold War", "Titanium Sinking", "Incan Empire (Machu Picchu)", "Alexander the Great's Conquests",
      "Civil Rights Movement", "The Printing Press Invention", "Sinking of the Titanic", "Chernobyl Disaster", "Boston Tea Party", "Mongol Empire", "The Crusades", "Prohibition Era", "Gold Rush", "Ancient Greece"
    ],
    questions: [
      { normal: "Roughly how many centuries or decades ago did this historical event occur?", imposter: "Was this event marked by war, discovery, architecture, or revolution?" },
      { normal: "Which region or major empire was at the epicenter of this event?", imposter: "Did this event permanently change global technology or human rights?" },
      { normal: "Is this event remembered as a tragic disaster or a triumphant achievement?", imposter: "Do school textbooks feature this event as a major chapter?" }
    ]
  },
  games: {
    id: "games",
    name: "Video Games & Franchises",
    icon: "🎮",
    words: [
      "Minecraft", "Grand Theft Auto V", "Fortnite", "The Legend of Zelda: Tears of the Kingdom", "Elden Ring", "Cyberpunk 2077", "Valorant", "League of Legends", "Counter-Strike 2", "Call of Duty: Warzone",
      "Overwatch", "Apex Legends", "Red Dead Redemption 2", "The Witcher 3: Wild Hunt", "Super Mario Odyssey", "Pokemon GO", "God of War Ragnarok", "Roblox", "Among Us", "Fall Guys",
      "Rocket League", "FIFA / EA Sports FC", "Minecraft Dungeons", "Dark Souls", "Assassins Creed Valhalla", "Genshin Impact", "Terraria", "Stardew Valley", "Subnautica", "Portal 2",
      "Hollow Knight", "Resident Evil 4", "Halo Infinite", "Final Fantasy VII", "Super Smash Bros Ultimate", "Tetris", "Pac-Man", "Clash of Clans", "Brawl Stars", "PUBG Mobile"
    ],
    questions: [
      { normal: "What genre of gameplay defines this title (FPS, RPG, Sandbox, Battle Royale)?", imposter: "Can this game be played in multiplayer co-op/PVP or singleplayer?" },
      { normal: "What iconic art style or graphical realism does this game use?", imposter: "What platform is this game most popularly played on (PC, Console, Mobile)?" },
      { normal: "What mechanics make players sink hundreds of hours into this game?", imposter: "Does this game feature open-world exploration or linear match rounds?" }
    ]
  },
  emotions: {
    id: "emotions",
    name: "Emotions & Feelings",
    icon: "🎭",
    words: [
      "Pure Joy", "Furious Anger", "Deep Melancholy", "Nostalgia", "Anxiety", "Enthusiasm", "Jealousy / Envy", "Embarrassment", "Serenity / Peace", "Pride", "Guilt", "Relief", "Curiosity", "Confusion", "Hope", "Despair", "Affection / Love", "Loneliness", "Awe & Wonder", "Frustration", "Boredom", "Euphoria", "Shame", "Compassion", "Bitterness", "Gratitude", "Amusement", "Satisfaction", "Suspicion", "Heartbreak"
    ],
    questions: [
      { normal: "Is this feeling generally positive, negative, or neutral?", imposter: "What physical bodily reaction occurs when feeling this (sweating, smiling, tears)?" },
      { normal: "What scenario or news event would trigger this emotion in a person?", imposter: "How long does this emotion usually last (seconds, hours, or years)?" },
      { normal: "How easy is it to hide this emotion from people around you?", imposter: "Is this emotion intense or subtle?" }
    ]
  },
  vehicles: {
    id: "vehicles",
    name: "Vehicles & Transport",
    icon: "🏎️",
    words: [
      "Electric Sports Car (Tesla)", "Formula 1 Racecar", "Monster Truck", "Commercial Jetliner", "Fighter Jet (F-22)", "Helicopter", "Bullet Train (Shinkansen)", "Steam Locomotive", "Cruise Ship", "Nuclear Submarine",
      "Speedboat", "Hovercraft", "Hot Air Balloon", "Space Shuttle", "Cargo Container Ship", "Electric Scooter", "Mountain Bicycle", "Harley Davidson Motorcycle", "Double Decker Bus", "Fire Engine Truck",
      "Ambulance", "Police Patrol Car", "Tractor", "Forklift", "Segway", "Kayak / Canoe", "Golf Cart", "Snowmobile", "Jet Ski", "Tuk Tuk / Auto Rickshaw"
    ],
    questions: [
      { normal: "Does this vehicle travel primarily on road, tracks, water, or air?", imposter: "How many passengers can this vehicle safely transport at once?" },
      { normal: "What engine or fuel type powers this vehicle?", imposter: "How fast can this vehicle go at top speed?" },
      { normal: "Is this vehicle used for public transport, emergency services, or luxury speed?", imposter: "Do you need a specialized commercial license to pilot this?" }
    ]
  },
  tech: {
    id: "tech",
    name: "Tech Objects & Gadgets",
    icon: "💻",
    words: [
      "Smartphone (iPhone)", "Virtual Reality Headset (Meta Quest)", "Smartwatch (Apple Watch)", "Gaming Laptop", "Wireless Noise-Canceling Earbuds", "Drone Quadcopter", "Mechanical Keyboard", "Curved OLED Gaming Monitor", "Action Camera (GoPro)", "Portable Power Bank",
      "Smart Home Speaker (Alexa)", "3D Printer", "Microphone Boom", "Graphic Drawing Tablet", "External SSD Drive", "Wi-Fi 6 Router", "E-Reader (Kindle)", "Smart Video Doorbell", "Robot Vacuum Cleaner", "Handheld Gaming Console (Steam Deck)",
      "Augmented Reality Glasses", "Dash Camera", "Bluetooth Speaker", "Laser Engraver", "Biometric Fingerprint Scanner", "Raspberry Pi Single Board", "Smart Thermostat", "Projector", "Electric Skateboard", "Ring Light"
    ],
    questions: [
      { normal: "What is the primary daily function or purpose of this tech gadget?", imposter: "Is this device portable in a pocket/bag or stationary on a desk?" },
      { normal: "Does this device connect to Wi-Fi/Bluetooth or operate offline?", imposter: "How expensive is a premium version of this gadget ($50 vs $1000+)?" },
      { normal: "What type of user interface does it rely on (touchscreen, buttons, voice, VR)?", imposter: "How long does its battery last on a full charge?" }
    ]
  },
  countries: {
    id: "countries",
    name: "Famous Countries",
    icon: "🌍",
    words: [
      "Japan", "United States", "Brazil", "France", "Italy", "Germany", "India", "Australia", "Canada", "Egypt",
      "South Korea", "United Kingdom", "Mexico", "Spain", "China", "South Africa", "Argentina", "Thailand", "Switzerland", "Greece",
      "Turkey", "Russia", "Saudi Arabia", "Norway", "Iceland", "New Zealand", "Netherlands", "United Arab Emirates", "Singapore", "Portugal",
      "Ireland", "Vietnam", "Indonesia", "Colombia", "Morocco", "Kenya", "Peru", "Jamaica", "Sweden", "Poland"
    ],
    questions: [
      { normal: "Which continent or global geographical zone is this country located in?", imposter: "What climate or landscape is most iconic for this country?" },
      { normal: "What food, dish, or cultural export is this country famous for?", imposter: "Is this country known for ancient history, high-tech cities, or nature?" },
      { normal: "What primary language or greeting is spoken here?", imposter: "Is this country a major island nation or landlocked/mainland?" }
    ]
  },
  cities: {
    id: "cities",
    name: "Famous Cities",
    icon: "🏙️",
    words: [
      "Tokyo", "New York City", "Paris", "London", "Rome", "Dubai", "Sydney", "Rio de Janeiro", "Cairo", "Los Angeles",
      "Seoul", "Venice", "Barcelona", "Amsterdam", "Singapore", "Hong Kong", "Istanbul", "Bangkok", "Berlin", "Toronto",
      "Las Vegas", "Mumbai", "San Francisco", "Kyoto", "Cape Town", "Athens", "Prague", "Miami", "Vienna", "Chicago"
    ],
    questions: [
      { normal: "What world-famous landmark or architectural tower is located in this city?", imposter: "What is the vibe or nightlife of this city like?" },
      { normal: "What continent or region is this city situated in?", imposter: "Is this city a coastal ocean harbor or inland metropolis?" },
      { normal: "What transport system (subway, gondola, double decker) is iconic here?", imposter: "Is this city known for fashion, gambling, food, or ancient ruins?" }
    ]
  },
  apps: {
    id: "apps",
    name: "Famous Apps & Websites",
    icon: "📱",
    words: [
      "YouTube", "Instagram", "TikTok", "WhatsApp", "Spotify", "Netflix", "ChatGPT", "Discord", "X (Twitter)", "Reddit",
      "Google Maps", "Uber", "Amazon", "Twitch", "Duolingo", "Pinterest", "Snapchat", "LinkedIn", "Telegram", "Roblox",
      "Steam", "AirBnB", "Wikipedia", "GitHub", "Canva", "Shazam", "Notion", "Subway Surfers", "Tinder", "Zoom"
    ],
    questions: [
      { normal: "What is the core utility or entertainment format of this app?", imposter: "Do users mostly scroll videos, read text, listen to audio, or message?" },
      { normal: "How much time do average young adults spend on this app daily?", imposter: "Is this app free with ads or subscription-based?" },
      { normal: "What icon color or logo is associated with this app?", imposter: "Does this app rely heavily on user-generated posts or professional media?" }
    ]
  },
  school: {
    id: "school",
    name: "School & Office Things",
    icon: "✏️",
    words: [
      "Whiteboard Marker", "Stapler", "Highlighter Pen", "Graphing Calculator", "Spiral Notebook", "Backpack / Schoolbag", "Pencil Sharpener", "Paperclip", "Sticky Post-it Notes", "Ruler",
      "Scissors", "Glue Stick", "Desk Organizer", "Erasing Rubber", "Binder Clip", "Fountain Pen", "Laminating Machine", "Paper Shredder", "Ballpoint Pen", "Correction Tape",
      "Geometry Compass", "Index Cards", "Folder Portfolio", "Standing Desk", "Ergonomic Mesh Chair", "Projector Screen", "USB Flash Drive", "Hole Puncher", "Clipboard", "Desk Mat"
    ],
    questions: [
      { normal: "What task in a classroom or office is this tool used for?", imposter: "Is this item disposable/consumable or reusable for years?" },
      { normal: "Where inside a pencil case or desk drawer is this usually stored?", imposter: "What material (plastic, metal, paper, ink) is it mostly made of?" },
      { normal: "How annoying is it when you run out of this item right before a deadline?", imposter: "Is this item used more by elementary students or corporate workers?" }
    ]
  },
  relationships: {
    id: "relationships",
    name: "Relationships & Family Roles",
    icon: "❤️",
    words: [
      "Best Friend", "Twin Brother / Sister", "Grandparent", "High School Crush", "Strict Parent", "Cool Uncle / Aunt", "Roommate", "Co-worker", "Mentor / Coach", "Arch Rival / Nemesis",
      "Childhood Neighbor", "Step-parent", "Soulmate / Spouse", "Godparent", "Classroom Teacher", "Boss / Manager", "Babysitter", "In-law Relative", "Pen Pal", "Fiance",
      "Business Partner", "Squad Leader", "Teammate", "Study Buddy", "Ex-partner", "Chaperone", "Protector", "Next-door Neighbor", "Acquaintance", "Caregiver"
    ],
    questions: [
      { normal: "What level of emotional closeness or trust exists in this relationship?", imposter: "How often do people in this role communicate or meet up?" },
      { normal: "In what life stage or location do you typically bond with this person?", imposter: "Is this role chosen by preference or bonded by blood/contracts?" },
      { normal: "What common conflict or wholesome moment occurs with this role?", imposter: "How would you describe the hierarchy (equal, authoritative, guidance)?" }
    ]
  },
  food: {
    id: "food",
    name: "Food & Dishes",
    icon: "🍕",
    words: [
      "Pepperoni Pizza", "Cheeseburger & Fries", "Sushi Roll (California)", "Italian Pasta Carbonara", "Mexican Tacos", "Ramen Noodles", "Chicken Tikka Masala", "Fried Chicken Wings", "French Croissant", "Belgium Waffles",
      "Pancakes with Maple Syrup", "Donuts", "Chocolate Ice Cream", "Steak Ribeye", "Burrito Bowl", "Dim Sum Dumplings", "Pad Thai Noodles", "Paella Seafood", "Greek Gyro / Kebab", "Nachos with Cheese",
      "Caesar Salad", "Eggs Benedict", "Churros with Chocolate", "Pho Soup", "Falafel Wrap", "Tiramisu Dessert", "Cheesecake", "Macaroni and Cheese", "Hot Dog", "Lobster Roll"
    ],
    questions: [
      { normal: "Is this dish usually served hot, warm, or chilled cold?", imposter: "Is this eaten with hands, chopsticks, or fork & knife?" },
      { normal: "What primary flavor profile dominates this dish (savory, sweet, spicy, cheesy)?", imposter: "Is this considered fast food / street food or fine dining?" },
      { normal: "Which country or culture is famous for originating this food?", imposter: "How heavy or filling is a full portion of this meal?" }
    ]
  }
};

// Generate "random" category by combining all word pools & questions dynamically
const allWords = Array.from(new Set(Object.values(CATEGORIES).flatMap(c => c.words)));
const allQuestions = Object.values(CATEGORIES).flatMap(c => c.questions);

CATEGORIES.random = {
  id: "random",
  name: "Random (All Combined)",
  icon: "🎲",
  words: allWords,
  questions: allQuestions
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CATEGORIES;
} else if (typeof window !== 'undefined') {
  window.CATEGORIES = CATEGORIES;
}
