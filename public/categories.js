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
        { normal: "What is an animal you would love to pet, but can't?", imposter: "What is an animal you would love to eat, but can't?" },
  { normal: "What do you think a cat is exceptionally good at?", imposter: "What do you think a cat is completely incapable of doing?" },
  { normal: "What is an animal you would keep at home if safety wasn't an issue?", imposter: "What is an animal you would instantly run away from in the wild?" },
  { normal: "What is a wild animal that seems surprisingly peaceful?", imposter: "What is a domestic pet that can be surprisingly aggressive?" },
  { normal: "What animal do you think has the best survival instincts in nature?", imposter: "What animal do you think would perish first in a harsh winter?" },
  { normal: "What animal would you want to transform into for a day?", imposter: "What animal would you least want to be reincarnated as?" },
  { normal: "What animal makes a noise that would terrify you at night?", imposter: "What animal makes a sound that you find calm or soothing?" },
  { normal: "What animal do you think is surprisingly intelligent?", imposter: "What animal do you think is driven purely by basic instinct?" },
  { normal: "What animal would be the most fun to ride into battle?", imposter: "What animal would be the worst choice to use for transportation?" },
  { normal: "What animal do you think has the coolest natural defense mechanism?", imposter: "What animal seems completely defenseless against predators?" },
  { normal: "What creature in the ocean freaks you out the most?", imposter: "What sea creature would you love to swim alongside in clear water?" },
  { normal: "What animal would win in an all-out tournament against every other beast?", imposter: "What animal relies entirely on safety in numbers to stay alive?" },
  { normal: "What animal looks like an alien creature from another planet?", imposter: "What animal looks like a giant, oversized version of a common bug?" },
  { normal: "What animal would you trust to guard your house while you are away?", imposter: "What animal would cause absolute destruction if let loose inside a house?" },
  { normal: "What bird do you find most majestic to watch in flight?", imposter: "What bird do you find most annoying or noisy in the morning?" },
  { normal: "What animal has the most impressive camouflage in the wild?", imposter: "What animal stands out so bright that it cannot hide anywhere?" },
  { normal: "What creature would you be most terrified to find under your bed?", imposter: "What small creature would you gently pick up and carry outside?" },
  { normal: "What animal do you think spends almost its entire day sleeping?", imposter: "What animal seems to constantly be moving and looking for food?" },
  { normal: "What animal would make the best protagonist in an animated movie?", imposter: "What animal always gets cast as the evil villain in stories?" },
  { normal: "What animal would you hate to get sprayed or bitten by?", imposter: "What animal has a texture or coat that feels incredibly soft to touch?" },
  { normal: "What animal would cause the most chaos if it escaped a zoo in a city?", imposter: "What animal would just blend into a city park without anyone noticing?" },
  { normal: "What animal do you think has the most painful bite or sting?", imposter: "What animal looks scary but is actually completely harmless to humans?" },
  { normal: "What creature would you build a high-tech habitat for if you were rich?", imposter: "What animal requires almost zero effort to keep alive as a pet?" },
  { normal: "What animal would you choose as your personal superhero sidekick?", imposter: "What animal would be the worst companion on a long hike?" },
  { normal: "What animal moves so fast it looks like a blur to the human eye?", imposter: "What animal moves so slowly it feels like watching paint dry?" },
  { normal: "What deep-sea creature would you be scared to see in dark water?", imposter: "What shallow-water creature would you love to spot while snorkeling?" },
  { normal: "What animal do you think has the most legendary sense of smell or vision?", imposter: "What animal seems practically blind or clumsy in its environment?" },
  { normal: "What animal would you hate to bump into while trekking through a jungle?", imposter: "What animal would make you stop and take out your phone for a picture?" },
  { normal: "What animal do you think has the strongest maternal or group bond?", imposter: "What animal abandons its offspring the moment they are born?" },
  { normal: "What extinct animal would you bring back to life if you could cloning tech?", imposter: "What dangerous animal would you erase from existence if you had the power?" }
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
       { normal: "What sport requires the most physical strength to excel at?", imposter: "What sport requires the most stamina and cardio to excel at?" },
  { normal: "What sport is most exciting to watch live in a packed stadium?", imposter: "What sport is best suited to play casually with friends on a weekend?" },
  { normal: "What is a sport where a referee's bad decision can ruin the whole game?", imposter: "What is a sport where weather conditions severely impact play?" },
  { normal: "What sport takes the longest amount of time to master professionally?", imposter: "What sport has the highest risk of injury for players?" },
  { normal: "What sport requires expensive equipment or facilities to play properly?", imposter: "What sport can be played anywhere with just a basic ball or no gear?" },
  { normal: "What sport do you think is most exhausting after just 10 minutes?", imposter: "What sport looks easy on TV but is incredibly difficult in reality?" },
  { normal: "What sport relies most heavily on raw speed and sprinting power?", imposter: "What sport relies most heavily on strategic patience and mental chess?" },
  { normal: "What sport has the most intense and hostile rivalries between teams?", imposter: "What sport has the most respectful and quiet crowd etiquette?" },
  { normal: "What sport requires incredible hand-eye coordination above all else?", imposter: "What sport requires massive flexibility and balance to perform?" },
  { normal: "What sport is most fun to play in the water or at the beach?", imposter: "What sport is most brutal to play in freezing cold weather?" },
  { normal: "What sport would you choose to play if you wanted to avoid heavy contact?", imposter: "What sport involves the most aggressive physical collisions?" },
  { normal: "What sport do you think has the most confusing rules for beginners?", imposter: "What sport has rules so simple that anyone can understand in two minutes?" },
  { normal: "What sport produces the most viral highlight-reel moments?", imposter: "What sport is relaxing to listen to or watch in the background?" },
  { normal: "What Olympic sport do you only watch once every four years?", imposter: "What sport do you follow obsessively every single week of the season?" },
  { normal: "What sport requires athletes to be remarkably tall to compete?", imposter: "What sport rewards athletes who have a low center of gravity?" },
  { normal: "What combat sport takes the most mental discipline to practice?", imposter: "What racing sport provides the highest sensation of pure speed?" },
  { normal: "What sport would be the hardest to play while wearing full armor?", imposter: "What sport would be hilarious to watch if played entirely on ice?" },
  { normal: "What sport has the most dramatic tension in the final seconds of a game?", imposter: "What sport can stretch on for hours without much visible action?" },
  { normal: "What team sport relies most on flawless communication between players?", imposter: "What solo sport puts 100% of the mental pressure on one individual?" },
  { normal: "What sport uses a playing surface that requires constant maintenance?", imposter: "What sport can be played on asphalt or dirt without any issue?" },
  { normal: "What sport has the most passionate international fanbases globally?", imposter: "What sport is huge in one specific country but ignored elsewhere?" },
  { normal: "What sport would you force every high school student to try once?", imposter: "What sport would you ban from schools due to safety concerns?" },
  { normal: "What sport requires precise footwork above everything else?", imposter: "What sport requires upper body and shoulder strength above everything else?" },
  { normal: "What sport features the most iconic trophy or championship ring?", imposter: "What sport has the most elaborate uniform or protective gear?" },
  { normal: "What sport feels like a game of human chess played at high speeds?", imposter: "What sport comes down to pure instinct and reaction time?" },
  { normal: "What sport would you pick if you had to earn a gold medal next month?", imposter: "What sport would you play if you just wanted to burn 1000 calories?" },
  { normal: "What indoor sport requires lighting and climate control to play?", imposter: "What outdoor sport is ruined by a sudden gust of strong wind?" },
  { normal: "What sport has the most grueling training camps in offseason?", imposter: "What sport allows players to have long careers well into their 40s?" },
  { normal: "What sport features the highest scoring games on average?", imposter: "What sport often ends in low-scoring defensive standoffs?" },
  { normal: "What sport would be the most fun to play in zero gravity on space station?", imposter: "What sport would be impossible to adapt for virtual reality headsets?" }
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
        { normal: "Who is an athlete known for having an unbeatable mindset?", imposter: "Who is an athlete known for having massive global brand endorsements?" },
  { normal: "Which legendary sports figure dominated their era completely uncontested?", imposter: "Which sports figure is famous for dramatic comebacks from defeat?" },
  { normal: "Which athlete would you choose to carry your team in a high-pressure final?", imposter: "Which athlete is most famous for their flashy personal style and lifestyle?" },
  { normal: "Which athlete retired at the absolute peak of their career?", imposter: "Which athlete stayed active long past their prime because they loved competing?" },
  { normal: "Which athlete has inspired the most motivational speeches and edits online?", imposter: "Which athlete is famous for their trash talk and mental games?" },
  { normal: "Which sports star was considered a generational prodigy from age 15?", imposter: "Which sports star worked their way up as a late bloomer nobody expected?" },
  { normal: "Which athlete has the most impressive physique or athletic build?", imposter: "Which athlete succeeded despite not looking like a typical superstar?" },
  { normal: "Which athlete made an entire sport popular in their home country?", imposter: "Which athlete played in the most star-studded team lineup ever assembled?" },
  { normal: "Which athlete would you want as your personal fitness coach for a month?", imposter: "Which athlete would be the most fun to hang out with at a VIP party?" },
  { normal: "Which competitor made rivalries feel like real-life movie battles?", imposter: "Which competitor was so respectful that even opponents loved them?" },
  { normal: "Which athlete holds a world record that might never be broken?", imposter: "Which athlete won championships in multiple different teams or eras?" },
  { normal: "Which superstar had a signature move named after or associated with them?", imposter: "Which superstar was known for breaking down in emotional celebrations?" },
  { normal: "Which athlete overcame a career-ending injury to win again?", imposter: "Which athlete had their legacy tainted by off-field controversies?" },
  { normal: "Which sports legend would you want to watch in their prime live?", imposter: "Which modern athlete is currently on track to become the GOAT?" },
  { normal: "Which athlete appears in the most video game covers and commercials?", imposter: "Which athlete avoids social media and lives a quiet private life?" },
  { normal: "Which fighter or racer showed absolute cold-blooded fearlessness?", imposter: "Which team captain was famous for holding teammates accountable?" },
  { normal: "Which athlete had the highest peak performance season ever witnessed?", imposter: "Which athlete maintained elite world-class consistency for 20 years?" },
  { normal: "Which athlete would make a great action movie hero after retirement?", imposter: "Which athlete would make a great head coach for a championship team?" },
  { normal: "Which sports icon sacrificed their wealth or status for a cause?", imposter: "Which sports icon signed the most mind-boggling contract in history?" },
  { normal: "Which athlete do you think had the fastest acceleration or top speed?", imposter: "Which athlete had the most tactical game IQ in their sport?" },
  { normal: "Which athlete is considered the undisputed GOAT of their discipline?", imposter: "Which athlete's debate against their main rival will never be settled?" },
  { normal: "Which athlete had the most legendary performance while sick or injured?", imposter: "Which athlete pulled off the most miraculous last-second game winner?" },
  { normal: "Which sports star transitioned successfully into a business mogul?", imposter: "Which sports star became a prominent media commentator or podcaster?" },
  { normal: "Which athlete made fans fall in love with a sport they never watched before?", imposter: "Which athlete drew the highest television viewership ratings in history?" },
  { normal: "Which player was famous for changing how defense is played in their sport?", imposter: "Which player was an unstoppable offensive machine every single night?" },
  { normal: "Which athlete had the most dramatic fall from grace in public eyes?", imposter: "Which athlete stayed humble despite winning every possible award?" },
  { normal: "Which icon had a documentary made about them that everyone was talking about?", imposter: "Which icon's jersey number is retired across entire leagues?" },
  { normal: "Which individual athlete carried their entire national team on their back?", imposter: "Which athlete flourished only because they had incredible teammates?" },
  { normal: "Which athlete would you trust to execute a high-stakes penalty or clutch play?", imposter: "Which athlete was known for getting easily frustrated under heavy pressure?" },
  { normal: "Which legendary sportsman would you choose to represent humanity in an alien contest?", imposter: "Which sportsman had the most humble origin story coming from poverty?" }
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
        { normal: "What movie ending left you completely shocked or mind-blown?", imposter: "What movie ending made you feel emotional or teary-eyed?" },
  { normal: "What film is best experienced on a massive IMAX cinema screen?", imposter: "What film is best enjoyed late at night wrapped in a blanket?" },
  { normal: "Which iconic movie villain stole the spotlight from the hero?", imposter: "Which movie protagonist underwent the most intense character arc?" },
  { normal: "What movie has a musical soundtrack or score that gives you chills?", imposter: "What movie relies heavily on practical visual effects and stunts?" },
  { normal: "What film could you rewatch 10 times without getting bored?", imposter: "What film was a masterpiece but too intense to ever watch again?" },
  { normal: "What movie universe would be the coolest to live in as an ordinary person?", imposter: "What movie universe would be absolute nightmare fuel to survive in?" },
  { normal: "What film has the most suspenseful tense scene from start to finish?", imposter: "What film has the most hilarious comedic timing and dialogue?" },
  { normal: "What movie plot revolves around mind-bending time travel or realities?", imposter: "What movie plot revolves around a high-stakes heist or robbery?" },
  { normal: "What film has an opening scene that hooks you within the first 5 minutes?", imposter: "What film builds up very slowly before delivering a crazy climax?" },
  { normal: "Which movie director has a distinct visual style you can recognize instantly?", imposter: "Which movie actor gave an Oscar-worthy performance of a lifetime?" },
  { normal: "What sci-fi film feels shockingly predictive of our real future?", imposter: "What historical movie felt completely authentic to its time period?" },
  { normal: "What movie features a battle or fight scene that set a new standard?", imposter: "What movie features an emotional confrontation between two characters?" },
  { normal: "What animated film carries deep emotional themes that hit adults harder than kids?", imposter: "What animated film has the most stunning art style ever created?" },
  { normal: "What film had a trailer that hyped up the entire internet before release?", imposter: "What film was a sleeper hit that spread purely through word of mouth?" },
  { normal: "Which movie poster or title is instantly recognizable worldwide?", imposter: "Which movie quote is repeated by people who haven't even seen the film?" },
  { normal: "What horror movie relies on psychological tension rather than jump scares?", imposter: "What horror movie features a monster design that genuinely creeped you out?" },
  { normal: "What film features a plot twist that completely changes the story on rewatch?", imposter: "What film has a cliffhanger ending that left audiences begging for a sequel?" },
  { normal: "What movie has the best ensemble cast of famous actors together?", imposter: "What movie carried an entire feature film with mostly one character on screen?" },
  { normal: "Which movie franchise had a perfect trilogy before going downhill?", imposter: "Which movie reboot or remake was actually better than the original?" },
  { normal: "What film explores the dark side of technology or artificial intelligence?", imposter: "What film explores deep philosophical questions about human nature?" },
  { normal: "What movie would you show someone to convince them cinema is an art form?", imposter: "What movie is pure dumb fun that you turn off your brain to watch?" },
  { normal: "Which movie setting feels like its own living, breathing character?", imposter: "Which movie costume or makeup transformation was completely unrecognizable?" },
  { normal: "What film handles a delicate romance without feeling cheesy or forced?", imposter: "What film portrays a tragic friendship breakup that hurt to watch?" },
  { normal: "What movie has a dialogue-heavy dinner scene where tension is sky high?", imposter: "What movie features a high-speed chase scene that kept your heart pounding?" },
  { normal: "What movie was so ahead of its time that people didn't appreciate it at release?", imposter: "What movie won tons of awards but aged terribly years later?" },
  { normal: "Which superhero film felt like a true cinematic event in theaters?", imposter: "Which indie movie achieved legendary status on a tiny budget?" },
  { normal: "What movie portrays survival against raw nature in a brutal way?", imposter: "What movie portrays survival inside a dystopian futuristic city?" },
  { normal: "What film has a plot that is almost impossible to explain briefly to a friend?", imposter: "What film has a simple premise executed with absolute perfection?" },
  { normal: "What movie climax made the entire theater audience break into cheers or gasp?", imposter: "What movie left the audience sitting in dead silence as credits rolled?" },
  { normal: "What film would you choose to preserve in a vault for alien civilizations to discover?", imposter: "What movie sequel surpassed the original film in every possible way?" }
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
       { normal: "Which YouTuber spends astronomical amounts of money on video production?", imposter: "Which YouTuber gained massive popularity primarily through livestreaming?" },
  { normal: "What creator do you turn to when you want educational or mind-bending facts?", imposter: "What creator do you watch when you just want pure chaotic entertainment?" },
  { normal: "Which internet personality has successfully launched major real-world businesses?", imposter: "Which internet personality is famous for doing extreme viral challenges?" },
  { normal: "Which YouTuber has the most dedicated, loyal fanbase on the platform?", imposter: "Which YouTuber is constantly involved in internet drama or feuds?" },
  { normal: "Which creator produces documentaries that look like professional TV shows?", imposter: "Which creator makes short-form viral videos that dominate TikTok/Shorts?" },
  { normal: "Which gaming YouTuber defined your childhood or early internet memories?", imposter: "Which tech reviewer do you trust before buying a new smartphone?" },
  { normal: "Which creator pulled off a real-life stunt that made global news headlines?", imposter: "Which creator raised millions of dollars for charity or environmental causes?" },
  { normal: "Which YouTuber is famous for their incredibly high-effort thumbnail editing?", imposter: "Which YouTuber streams for 10 hours straight interacting with chat?" },
  { normal: "Which channel makes you feel cozy and relaxed while watching their vlogs?", imposter: "Which channel keeps you on the edge of your seat with fast pacing?" },
  { normal: "Which YouTuber has an iconic intro catchphrase that everyone knows?", imposter: "Which YouTuber uses an avatar or animation instead of showing their face?" },
  { normal: "Which creator successfully transitioned from YouTube to mainstream Hollywood/TV?", imposter: "Which mainstream celebrity started a YouTube channel that actually succeeded?" },
  { normal: "Which YouTuber is famous for hosting intense multi-creator tournaments?", imposter: "Which YouTuber travels to dangerous or isolated places around the globe?" },
  { normal: "Which channel posts mind-blowing engineering or science experiments?", imposter: "Which channel posts food tasting or eating challenges with insane calories?" },
  { normal: "Which YouTuber vanished from the platform at their peak and left fans missing them?", imposter: "Which YouTuber has maintained daily or weekly uploads for over a decade?" },
  { normal: "Which creator started out doing simple commentary videos in their bedroom?", imposter: "Which group channel has legendary chemistry between all its members?" },
  { normal: "Which YouTuber has the most iconic studio or recording setup?", imposter: "Which YouTuber is famous for doing unboxing videos of rare items?" },
  { normal: "Which gaming creator is known for losing their temper and smashing gear?", imposter: "Which gaming creator is known for speedrunning or beating games on hardest difficulty?" },
  { normal: "Which YouTuber makes hilarious animation clips about daily life struggles?", imposter: "Which YouTuber makes detailed video essays breaking down pop culture?" },
  { normal: "Which channel is a lifesaver when you need to fix something or learn a skill?", imposter: "Which channel posts satisfying compilation videos with millions of views?" },
  { normal: "Which creator hit 10 million subscribers faster than almost anyone else?", imposter: "Which creator built an empire without ever speaking a word in videos?" },
  { normal: "Which creator gives away massive prizes or cash to random subscribers?", imposter: "Which creator tests fake life hacks to prove if they actually work?" },
  { normal: "Which YouTuber has a mascot or pet that became famous in its own right?", imposter: "Which YouTuber frequently collaborates with famous musicians or athletes?" },
  { normal: "Which YouTuber made a video that completely changed the platform's culture?", imposter: "Which YouTuber survived being cancelled and came back even bigger?" },
  { normal: "Which fitness creator gives honest, science-based workout tips?", imposter: "Which beauty/lifestyle creator built a cosmetics empire from scratch?" },
  { normal: "Which channel posts music or beats that millions of students study to?", imposter: "Which channel posts street interviews asking hilarious questions to strangers?" },
  { normal: "Which YouTuber buys ridiculously expensive luxury gadgets just to destroy them?", imposter: "Which YouTuber builds custom rooms or secret passages inside houses?" },
  { normal: "Which creator has the best storytelling ability that keeps you watching to the end?", imposter: "Which creator uses cinematic camera angles and color grading in every vlog?" },
  { normal: "Which YouTuber started a viral food or drink brand that sold out in stores?", imposter: "Which YouTuber hosted a massive real-world boxing or sport event?" },
  { normal: "Which creator would you choose to collaborate with if you launched a channel?", imposter: "Which creator do you think will still be top of YouTube in 10 years?" },
  { normal: "Which channel makes content that appeals equally to 8-year-olds and adults?", imposter: "Which creator's audience inside jokes are completely confusing to outsiders?" }
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
        { normal: "What cosmic entity or event poses the scariest threat to human existence?", imposter: "What space phenomenon produces the most breathtaking visual imagery?" },
  { normal: "What technological milestone would make interplanetary travel realistic?", imposter: "What scientific discovery would definitively prove extraterrestrial life exists?" },
  { normal: "If you could instantly travel anywhere in space, where would you go?", imposter: "What heavenly body would be the hardest for humanity to terraform?" },
  { normal: "What object in space has gravity so intense that not even light escapes it?", imposter: "What object in space is composed almost entirely of super-dense ice and gas?" },
  { normal: "What space mission represents humanity's greatest engineering achievement?", imposter: "What space telescope has expanded our view of the early universe most?" },
  { normal: "What planet in our solar system has the most hostile surface conditions?", imposter: "What planet or moon in our solar system is most likely to harbor microbial life?" },
  { normal: "What feeling would you have looking back at Earth from the surface of the Moon?", imposter: "What feeling would you have stepping out onto the dusty red surface of Mars?" },
  { normal: "What space movie gets the physics of zero gravity relatively accurate?", imposter: "What sci-fi concept in space movies do you wish was real in our lifetime?" },
  { normal: "What would be the most terrifying way to die while on a space walk?", imposter: "What would be the most difficult physical challenge for astronauts on Mars?" },
  { normal: "What solar system feature is famous for its massive ring system or storms?", imposter: "What deep space object is formed by the explosion of a dying star?" },
  { normal: "What space company or agency is leading the modern space race today?", imposter: "What historic space rocket carried humans beyond Earth orbit for the first time?" },
  { normal: "What concept about the sheer size of the universe breaks your brain?", imposter: "What concept about time dilation near massive objects blows your mind?" },
  { normal: "What theoretical shortcut through space-time do sci-fi fans love?", imposter: "What invisible substance makes up most of the mass in the universe?" },
  { normal: "What planet in our solar system has the most interesting moons orbiting it?", imposter: "What asteroid or comet trajectory keeps space agencies monitoring closely?" },
  { normal: "What would be the first rule for humans building a permanent colony on Mars?", imposter: "What would be the biggest psychological challenge of a 3-year space flight?" },
  { normal: "What constellation or night sky event do you look for on a clear night?", imposter: "What atmospheric phenomenon creates colorful light displays near Earth's poles?" },
  { normal: "What space craft is currently traveling out into interstellar space beyond our sun?", imposter: "What satellite network provides global communication and imaging from orbit?" },
  { normal: "What star in our galaxy would cause chaos if it went supernova nearby?", imposter: "What dwarf planet was famously demoted from full planet status in 2006?" },
  { normal: "What sensory experience would you miss most while living on a space station?", imposter: "What food or luxury would be impossible to enjoy in zero gravity?" },
  { normal: "What mystery about black holes do astrophysicists want to solve most?", imposter: "What signal from deep space made scientists wonder if aliens were talking?" },
  { normal: "What space suit feature is most critical to keeping an astronaut alive?", imposter: "What launch phase of a rocket launch produces the most extreme G-forces?" },
  { normal: "What space station allows international astronauts to live and work together?", imposter: "What lunar crater or landing site holds the most historical significance?" },
  { normal: "What cosmic radiation threat do space missions have to shield against?", imposter: "What space junk problem in orbit could trap us on Earth if it gets worse?" },
  { normal: "What ocean world moon in our solar system might have liquid water oceans?", imposter: "What planet in our solar system rotates on its side or backwards?" },
  { normal: "What private space tourist experience would you buy if money was no object?", imposter: "What zero-gravity trick would you try first onboard a space flight?" },
  { normal: "What scientific instrument on a space rover delivers the coolest data?", imposter: "What radio telescope array listens for signals from deep space galaxies?" },
  { normal: "What collision event in Earth's history wiped out most living species?", imposter: "What future collision between our galaxy and a neighbor will happen eventually?" },
  { normal: "What space suit color is iconic for spacewalks vs launch phases?", imposter: "What launch location on Earth is famous for sending rockets into orbit?" },
  { normal: "What fundamental force holds solar systems and galaxies together?", imposter: "What mystery expansion force is pushing the universe apart faster over time?" },
  { normal: "What message or artifact carried on a space probe represents Earth to aliens?", imposter: "What futuristic space propulsion concept could reach another star system?" }}
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
       { normal: "What household appliance would cause the biggest disaster if it broke down today?", imposter: "What household item do you use daily without giving it any thought?" },
  { normal: "What object in a home is most satisfying to clean or organize?", imposter: "What object in a home is the biggest hassle to move to a new apartment?" },
  { normal: "What item in your room do you rely on most for personal comfort?", imposter: "What item in your living space cost way more money than it should have?" },
  { normal: "What sharp tool in the kitchen requires the most careful handling?", imposter: "What kitchen gadget sits in a drawer for months without being used?" },
  { normal: "What electronic item in your house is constantly running low on battery?", imposter: "What household object makes an annoying squeak or noise when used?" },
  { normal: "What object do you constantly misplace and spend 15 minutes looking for?", imposter: "What item do you carry in your pocket or bag every time you leave the house?" },
  { normal: "What furniture item is the undisputed center of social gatherings at home?", imposter: "What furniture item do you collapse onto after an exhausting workday?" },
  { normal: "What cleaning device makes keeping floors tidy effort-free?", imposter: "What object in the bathroom requires frequent washing or replacement?" },
  { normal: "What item would you grab first if your house caught fire and everyone was safe?", imposter: "What heavy object in your home would take three people to carry?" },
  { normal: "What object in your home provides immediate cooling during hot summer days?", imposter: "What item keeps you warm and cozy during freezing winter nights?" },
  { normal: "What container item do you take with you to stay hydrated all day?", imposter: "What item protects your personal belongings when traveling or commuting?" },
  { normal: "What item sitting on a nightstand is the last thing you touch before sleep?", imposter: "What morning routine device wakes you up with a loud sound or light?" },
  { normal: "What object in a workshop or garage is essential for basic DIY repairs?", imposter: "What measuring or cutting tool do you need for building furniture?" },
  { normal: "What object hanging on a wall tells you information or adds decoration?", imposter: "What glass object in a room reflects your appearance or brightens space?" },
  { normal: "What kitchen tool do you use to prepare hot caffeine beverages in the morning?", imposter: "What small appliance heats up bread or quick snacks in minutes?" },
  { normal: "What item inside a wardrobe takes up the most hanging space?", imposter: "What accessory do you wear on your wrist or face every day?" },
  { normal: "What object protects you from sudden downpours when walking outside?", imposter: "What outdoor item do you store on a balcony or patio for relaxing?" },
  { normal: "What object in a bedroom is designed purely for sleep and rest quality?", imposter: "What decorative item sitting on a shelf collects dust if not wiped?" },
  { normal: "What item inside a bathroom is essential for personal hygiene every morning?", imposter: "What grooming tool operates on electricity to dry or style hair?" },
  { normal: "What utility item in a house safely cuts off power or prevents fires?", imposter: "What metal object grants access through locked doors into a home?" },
  { normal: "What object in an office setup supports your posture while typing?", imposter: "What audio object covers your ears to block out surrounding noise?" },
  { normal: "What cookware item do you use on a stove to fry or sear food?", imposter: "What baking dish or pan goes directly into a hot oven?" },
  { normal: "What plastic or metal trash container keeps bad smells contained?", imposter: "What laundry room appliance dries wet clothes using heat and tumbling?" },
  { normal: "What item sitting in a hallway keeps shoes neatly arranged?", imposter: "What textile object on the floor cushions your steps and warms a room?" },
  { normal: "What portable light source helps you navigate dark spaces during power outages?", imposter: "What window covering blocks out sunlight when you want to sleep in?" },
  { normal: "What dining object is essential for serving soup or cereal dishes?", imposter: "What dining utensil is used for cutting through meat or tough food?" },
  { normal: "What small device calculates numbers quickly for finance or math?", imposter: "What stationery item cuts paper smoothly in straight lines?" },
  { normal: "What travel luggage item rolls on wheels through airport terminals?", imposter: "What compact item holds your cash, ID, and credit cards safely?" },
  { normal: "What object in a living room displays movies and games on a big screen?", imposter: "What audio setup delivers surrounding sound for home theater entertainment?" },
  { normal: "What object would you leave behind in a time capsule for people 100 years from now?", imposter: "What cheap plastic object breaks easily and ends up in the recycling bin?" }
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
        { normal: "Which public figure built an empire through visionary innovation?", imposter: "Which public figure constantly dominates internet viral headlines?" },
  { normal: "Who is a celebrity that seems genuinely likeable and grounded in interviews?", imposter: "Who is a celebrity that has built a massive global cult following?" },
  { normal: "If you could sit down for dinner with one global icon, who would it be?", imposter: "Which famous person's career trajectory surprised everyone the most?" },
  { normal: "Which tech billionaire has the most influence over the world's future?", imposter: "Which world leader or politician has the most controversial media image?" },
  { normal: "Which music artist sells out stadium tours across the globe instantly?", imposter: "Which movie star is considered the highest-paid box office draw today?" },
  { normal: "Which historical genius reshaped human understanding of the universe?", imposter: "Which historical leader commanded one of the vastest empires in history?" },
  { normal: "Which celebrity is famous for doing incredible philanthropic and charity work?", imposter: "Which internet star turned 15 minutes of fame into a permanent business empire?" },
  { normal: "Which actor is known for doing their own insane movie stunts?", imposter: "Which actor is famous for transforming their body drastically for movie roles?" },
  { normal: "Which musician's fan base is known for analyzing every single clue they post?", imposter: "Which hip-hop artist shaped street fashion and culture for a generation?" },
  { normal: "Which famous figure's social media posts can move stock prices or crypto?", imposter: "Which famous figure is constantly involved in public legal battles or feuds?" },
  { normal: "Which legendary talk show host held immense cultural influence for decades?", imposter: "Which celebrity chef is famous for screaming at contestants on TV?" },
  { normal: "Which movie star has played the most iconic hero characters in blockbusters?", imposter: "Which actor's voice is so deep and iconic that everyone recognizes it instantly?" },
  { normal: "Which fashion mogul or influencer set global trends for millions of teens?", imposter: "Which reality TV family built a multi-billion dollar media dynasty?" },
  { normal: "Which famous scientist explained complex physics concepts to the public?", imposter: "Which famous inventor changed how humans access electricity or light?" },
  { normal: "Which international superstar transitioned from wrestling/sports to Hollywood lead?", imposter: "Which former child star built an acclaimed adult acting career?" },
  { normal: "Which public icon's autobiography or memoir became an instant bestseller?", imposter: "Which celebrity speech went viral for inspiring millions of young people?" },
  { normal: "Which famous figure lives an extremely modest life despite having billions?", imposter: "Which celebrity flexes ultra-luxury supercars and private jets constantly?" },
  { normal: "Which movie director's name alone on a poster guarantees massive ticket sales?", imposter: "Which music producer produced hit songs for almost every pop star?" },
  { normal: "Which historical activist led peaceful movements that changed human rights?", imposter: "Which monarch or royal figure captured world attention for decades?" },
  { normal: "Which internet creator broke global streaming records in a single stream?", imposter: "Which podcast host interviews the most famous thinkers and celebrities?" },
  { normal: "Which Hollywood star is famous for being incredibly generous to movie crews?", imposter: "Which celebrity couple was pursued relentlessly by paparazzi everywhere?" },
  { normal: "Which famous innovator co-founded one of the most valuable tech companies?", imposter: "Which executive transformed how humanity buys products online?" },
  { normal: "Which legendary musician passed away leaving a legacy that defined a genre?", imposter: "Which young pop sensation achieved global stardom before turning 20?" },
  { normal: "Which actor became universally loved for playing a beloved comic book hero?", imposter: "Which villain actor is so convincing people forget they are nice in real life?" },
  { normal: "Which famous author created a fantasy book world enjoyed by millions?", imposter: "Which famous director created iconic sci-fi sagas that defined pop culture?" },
  { normal: "Which public figure would you trust to negotiate peace in a crisis?", imposter: "Which public figure would make the most hilarious host for an awards show?" },
  { normal: "Which celebrity has a distinctive facial expression or smile that spawned memes?", imposter: "Which celebrity vanished from Hollywood to live a quiet life on a farm?" },
  { normal: "Which famous figure's wax statue at Madame Tussauds looks shockingly real?", imposter: "Which celebrity has the most chaotic and unhinged interview moments?" },
  { normal: "Which historical figure's life story deserves a 10-episode HBO series?", imposter: "Which modern icon's rise to fame felt like it happened literally overnight?" },
  { normal: "Which famous person would you choose to be your mentor for a career in business?", imposter: "Which famous person would you choose to accompany you on a wilderness trip?" }
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
  { normal: "What school supply was always getting lost or borrowed without returning?", imposter: "What desk tool is essential when preparing for an upcoming exam or presentation?" },
  { normal: "What classroom item makes the most satisfying sound when used correctly?", imposter: "What office supply turns into an absolute nightmare when it jams or malfunctions?" },
  { normal: "What object is found on almost every student's desk during study sessions?", imposter: "What tool would be completely useless in a 100% digital paperless classroom?" },
  { normal: "What dry-erase marker tool do teachers use to write notes across big board screens?", imposter: "What mechanical desktop device binds sheets of paper together with tiny metal wires?" },
  { normal: "What neon ink marker is used to highlight key textbook passages while studying?", imposter: "What specialized scientific calculator is required for advanced algebra and math exams?" },
  { normal: "What spiral-bound paper item holds all your handwritten lecture notes for a subject?", imposter: "What durable backpack bag carries heavy textbooks and laptops across campus daily?" },
  { normal: "What small device sharpens wooden graphite pencils into sharp points?", imposter: "What small metal stationery item clips loose paper documents together temporarily?" },
  { normal: "What sticky paper post-it item do you use to leave quick reminder notes on desks?", imposter: "What clear plastic ruler is used for drawing straight lines or measuring centimeters?" },
  { normal: "What station cutting tool features sharp blades for trimming paper or craft cardboard?", imposter: "What adhesive glue stick tool is essential for school poster and art projects?" },
  { normal: "What desk organizer holds all your pens, pencils, and markers in one place?", imposter: "What rubber eraser tool removes pencil mistakes cleanly without tearing paper?" },
  { normal: "What spring-loaded binder clip clamps thick stacks of documents together firmly?", imposter: "What luxury fountain pen uses liquid ink cartridges for elegant handwriting?" },
  { normal: "What office laminating machine seals paper documents inside protective plastic sheets?", imposter: "What office paper shredder destroys confidential documents into tiny strips?" },
  { normal: "What smooth ballpoint pen is every student's go-to for writing fast during exams?", imposter: "What liquid correction tape covers up pen ink mistakes with a white strip?" },
  { normal: "What metal geometry compass tool draws perfect circles on math graph paper?", imposter: "What small index cards do students use to make flashcards for flash revision?" },
  { normal: "What plastic folder portfolio keeps important certificates and handouts wrinkle-free?", imposter: "What modern standing desk allows office workers to adjust height and work standing?" },
  { normal: "What mesh office chair provides ergonomic lumbar support for long sitting hours?", imposter: "What classroom projector projects computer screens onto a pull-down wall screen?" },
  { normal: "What compact USB flash drive stores backups of school presentations and files?", imposter: "What heavy metal hole puncher stamps two or three holes along paper edges for binders?" },
  { normal: "What rigid wooden clipboard holds papers flat while taking notes while walking around?", imposter: "What smooth desk pad mat covers your workspace for mouse movement and comfort?" },
  { normal: "What classroom item produces an annoying squeak when written with at bad angles?", imposter: "What school item is most satisfying to snap in half when frustrated?" },
  { normal: "What item inside a pencil case is most likely to leak ink or leave stains inside?", imposter: "What item in a classroom do students constantly look at when waiting for class to end?" },
  { normal: "What office supply would be most dangerous if thrown across a room in anger?", imposter: "What school supply item runs out right when you are halfway through an assignment?" },
  { normal: "What item inside a backpack gets crushed at the bottom under heavy books?", imposter: "What classroom furniture item is notoriously uncomfortable during a 2-hour exam?" },
  { normal: "What item do you borrow from a classmate on test day because you forgot yours?", imposter: "What object on a teacher's desk is off-limits for students to touch?" },
  { normal: "What school supply was considered a status flex among kids if you had the fancy brand?", imposter: "What office item makes a loud clacking sound every time it punches or binds?" },
  { normal: "What item in an art class leaves colorful powder or paint stains on hands?", imposter: "What stationery item do people end up chewing on mindlessly while thinking?" },
  { normal: "What paper document tool contains 3 ring metal loops that snap shut loudly?", imposter: "What desk accessory holds rolls of clear adhesive tape with a sharp cutter edge?" },
  { normal: "What item do you use to clean chalk dust or marker lines off a blackboard?", imposter: "What classroom item rings loudly to signal the start or end of passing periods?" },
  { normal: "What school item would be the most nostalgic to smell or see 20 years from now?", imposter: "What office gadget do you find surprisingly fun to play with when distracted?" },
  { normal: "What item would you add to every student's desk to make learning more comfortable?", imposter: "What school supply item seems completely outdated in modern digital classrooms?" },
  { normal: "What item in a school lab requires wearing safety goggles before handling?", imposter: "What heavy reference book sitting on a library shelf weighs five pounds?" }
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
  { normal: "Who in your life is most likely to give you brutally honest advice?", imposter: "Who in your life is most likely to bail you out when you get into trouble?" },
  { normal: "What relationship dynamic makes for the most entertaining movie stories?", imposter: "What relationship dynamic requires the highest level of mutual trust?" },
  { normal: "Which person in a household is most likely to initiate a heated debate?", imposter: "Which person in a family is known for spoiling everyone with gifts?" },
  { normal: "Which companion is your absolute first call when you receive amazing life news?", imposter: "Which person do you turn to when you need deep emotional comfort or a shoulder to cry on?" },
  { normal: "Which family figure tells embarrassing stories about your childhood to new friends?", imposter: "Which relative is famous for bringing delicious home-cooked meals to gatherings?" },
  { normal: "Which sibling bond is famous for constant teasing that instantly turns to fierce protection?", imposter: "Which parental role involves enforcing house rules and curfew deadlines?" },
  { normal: "Which fun family figure visits on holidays with cool gifts and zero discipline rules?", imposter: "Which wise elder figure shares life advice and stories from decades ago?" },
  { normal: "Which person sharing an apartment with you constantly forgets to do their dishes?", imposter: "Which office colleague do you grab coffee with to vent about work tasks?" },
  { normal: "Which professional guide figure helps shape your career and skills over years?", imposter: "Which athletic figure pushes you past physical limits during intense training?" },
  { normal: "Which intense rival figure drives you to perform at your absolute best out of competition?", imposter: "Which childhood neighbor figure did you spend endless summer afternoons playing with?" },
  { normal: "Which life partner figure shares your home, finances, and long-term future goals?", imposter: "Which special person did you have a secret, nervous crush on during school days?" },
  { normal: "Which authority figure at school managed classroom discipline and graded your work?", imposter: "Which workplace leader assigns your weekly projects and evaluates performance?" },
  { normal: "Which temporary caregiver looked after you at home when your parents went on date nights?", imposter: "Which trusted family friend was officially chosen to guide you as a godparent?" },
  { normal: "Which distant pen pal or online friend do you write long messages to across oceans?", imposter: "Which prospective partner figure did you recently exchange rings with before marriage?" },
  { normal: "Which co-founder partner shares equal financial risk and vision for launching a startup?", imposter: "Which sports teammate coordinates plays with you on the field to win games?" },
  { normal: "Which classmate study buddy sits with you in libraries cramming before big exams?", imposter: "Which next-door neighbor do you ask to keep an eye on your home while traveling?" },
  { normal: "Which casual acquaintance do you smile at and make small talk with when passing by?", imposter: "Which former partner figure do you bump into awkwardly in public years later?" },
  { normal: "Which dedicated caregiver figure provides daily support for vulnerable or aging loved ones?", imposter: "Which protective squad leader figure takes charge of organizing group trips?" },
  { normal: "Which relationship role is most difficult to maintain long-distance across time zones?", imposter: "Which relationship role involves the most intense high-stakes emotional drama?" },
  { normal: "Which person would you choose to accompany you on a 10-hour flight sitting next to you?", imposter: "Which person would you choose to have on your team in a high-stakes escape room?" },
  { normal: "Which relationship dynamic changes the most after someone gets married or has kids?", imposter: "Which relationship dynamic is built purely on shared humor and inside jokes?" },
  { normal: "Which person's approval or praise meant the absolute world to you growing up?", imposter: "Which person in a group chat is famous for leaving messages on read for days?" },
  { normal: "Which relationship figure would you call at 3 AM if your car broke down on a highway?", imposter: "Which person in your social circle plans every detail of birthday celebrations?" },
  { normal: "Which connection feels like family even though you share zero biological blood?", imposter: "Which relationship requires strict professional boundaries at all times?" },
  { normal: "Which person is hardest to buy a Christmas or birthday gift for every year?", imposter: "Which person always knows exactly what to say to make you feel confident?" },
  { normal: "Which relationship figure is famous for giving unsolicited dating or career advice?", imposter: "Which person in a family holds the remote control during movie nights?" },
  { normal: "Which relationship dynamic is tested most when traveling on a tight budget together?", imposter: "Which bond remains completely unchanged even if you don't speak for six months?" },
  { normal: "Which person in your life would make the most chaotic travel partner ever?", imposter: "Which person in your life is the ultimate secret-keeper who takes secrets to the grave?" },
  { normal: "Which relationship role carries the heaviest social responsibility in a community?", imposter: "Which relationship role is most likely to surprise you with unexpected thoughtful gestures?" },
  { normal: "Which person in your life would you want standing next to you as your best man/maid of honor?", imposter: "Which person in your life inspired you most to become who you are today?" }
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
  { normal: "What comfort food hits the spot best late at night after a long day?", imposter: "What meal do you order when you want to celebrate a special event?" },
  { normal: "What food is notoriously messy to eat on a first date?", imposter: "What dish relies heavily on having perfect fresh ingredients to taste good?" },
  { normal: "What famous dish would you recommend to a friend visiting your city?", imposter: "What treat is impossible to stop eating once you open the serving?" },
  { normal: "What cheesy, oven-baked Italian slice is the universal favorite for movie nights?", imposter: "What iconic fast food stack features a juicy beef patty, lettuce, and bun with fries?" },
  { normal: "What Japanese delicacy features fresh raw fish over seasoned rice rolls?", imposter: "What rich Italian pasta dish features creamy egg sauce, pancetta, and parmesan?" },
  { normal: "What Mexican street food features spiced meat and salsa stuffed inside soft tortillas?", imposter: "What Japanese noodle soup features flavorful broth, sliced pork, and a soft-boiled egg?" },
  { normal: "What Indian curry dish features tender chicken cooked in a rich, spiced tomato butter sauce?", imposter: "What crispy fast food item comes tossed in hot buffalo or BBQ sauce?" },
  { normal: "What buttery French pastry is famous for its flaky crescent layers at breakfast?", imposter: "What fluffy breakfast grid cake is served topped with melted butter and syrup?" },
  { normal: "What stack of sweet golden cakes is drizzled with maple syrup for weekend breakfast?", imposter: "What deep-fried ring dessert is glazed with chocolate or colorful sprinkles?" },
  { normal: "What frozen dessert treat is the ultimate way to cool down on a hot summer day?", imposter: "What premium cut of beef steak is seared on a grill for a luxurious dinner?" },
  { normal: "What stuffed Mexican burrito bowl is packed with rice, beans, guac, and grilled protein?", imposter: "What steamed Asian dumpling dish is served in bamboo baskets during brunch?" },
  { normal: "What stir-fried Thai noodle dish features peanuts, lime, bean sprouts, and sweet tamarind sauce?", imposter: "What classic Spanish rice dish is cooked in a wide pan with saffron and seafood?" },
  { normal: "What Mediterranean pita wrap is stuffed with shaved seasoned meat and garlic sauce?", imposter: "What crunchy Mexican snack dish is piled high with warm melted cheese and jalapeños?" },
  { normal: "What fresh green Caesar salad is tossed with crunchy croutons, parmesan, and creamy dressing?", imposter: "What classic breakfast dish features poached eggs and hollandaise sauce on English muffins?" },
  { normal: "What sweet fried Spanish churro dough pastry is served dipped in thick hot chocolate?", imposter: "What comforting Vietnamese noodle soup features aromatic herb broth and thin beef slices?" },
  { normal: "What crispy fried falafel chickpea ball wrap is packed with tahini and fresh veggies?", imposter: "What layered Italian dessert features coffee-soaked ladyfingers and mascarpone cream?" },
  { normal: "What rich baked dessert features a graham cracker crust and smooth cream cheese center?", imposter: "What baked macaroni dish features elbow pasta smothered in warm melted cheese?" },
  { normal: "What stadium staple sausage is served inside a soft sliced bun topped with mustard?", imposter: "What luxurious seafood roll features fresh buttered lobster meat stuffed in a toasted bun?" },
  { normal: "What spicy dish tests your heat tolerance and leaves your mouth burning?", imposter: "What sweet dessert dish is the ultimate reward after finishing a workout?" },
  { normal: "What street food item is best bought hot from a food truck vendor on a cold evening?", imposter: "What fine-dining dish costs a small fortune but leaves you hungry an hour later?" },
  { normal: "What food item do people have the strongest love-it-or-hate-it opinions about?", imposter: "What snack food makes a loud crunchy sound that annoys people in quiet theaters?" },
  { normal: "What meal is most satisfying to cook completely from scratch on a Sunday?", imposter: "What takeaway food arrives at your door steaming hot when you don't want to cook?" },
  { normal: "What dish is traditionally associated with big family holiday dinners?", imposter: "What food item is most commonly associated with healthy fitness meal prep containers?" },
  { normal: "What breakfast item smells so incredible while cooking that it wakes up the house?", imposter: "What bakery item smells so good when passing by that you have to step inside?" },
  { normal: "What food item would you choose if you could only eat one dish for the rest of your life?", imposter: "What food combination sounds weird on paper but tastes surprisingly amazing?" },
  { normal: "What dish leaves you feeling so full and heavy that you need a nap immediately?", imposter: "What light snack gives you a quick energy boost without feeling heavy?" },
  { normal: "What sweet treat is mandatory at birthday party celebrations when candles are blown out?", imposter: "What cinema snack box do you buy every time you watch a movie at the theater?" },
  { normal: "What dip sauce like guacamole or garlic dip makes any snack taste 10 times better?", imposter: "What condiment like hot sauce or ketchup do people put on literally everything?" },
  { normal: "What classic food item is ruined completely if served at room temperature?", imposter: "What leftover food tastes arguably even better cold out of the fridge the next morning?" },
  { normal: "What regional dish from your country would you defend with your life against haters?", imposter: "What international cuisine would you choose if you could eat at local spots there for a month?" }
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
