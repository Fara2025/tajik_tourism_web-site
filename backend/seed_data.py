"""
Скрипт для заполнения базы данных тестовыми данными.
Запуск: python manage.py shell < seed_data.py
или: python manage.py shell  ->  exec(open('seed_data.py').read())
"""

from tourism.models import Category, Region, CulturalObject, TouristRoute, RoutePoint, Infrastructure, Master

# Очистка (необязательно)
# Category.objects.all().delete()
# Region.objects.all().delete()

# --- Регионы ---
regions_data = [
    {"name": "Dushanbe", "name_ru": "Душанбе", "name_tj": "Душанбе"},
    {"name": "Sughd", "name_ru": "Согд", "name_tj": "Суғд"},
    {"name": "Khatlon", "name_ru": "Хатлон", "name_tj": "Хатлон"},
    {"name": "GBAO", "name_ru": "ГБАО", "name_tj": "ВМКБ"},
    {"name": "DRS", "name_ru": "РРП", "name_tj": "НТҶ"},
]
regions = {}
for r in regions_data:
    obj, _ = Region.objects.get_or_create(name=r["name"], defaults=r)
    regions[r["name"]] = obj

# --- Категории ---
categories_data = [
    {"name": "Museum", "name_ru": "Музей", "name_tj": "Осорхона"},
    {"name": "Monument", "name_ru": "Памятник", "name_tj": "Ёдгорӣ"},
    {"name": "Mosque", "name_ru": "Мечеть", "name_tj": "Масҷид"},
    {"name": "Fortress", "name_ru": "Крепость", "name_tj": "Қалъа"},
    {"name": "Nature", "name_ru": "Природа", "name_tj": "Табиат"},
    {"name": "Market", "name_ru": "Базар", "name_tj": "Бозор"},
]
categories = {}
for c in categories_data:
    obj, _ = Category.objects.get_or_create(name=c["name"], defaults=c)
    categories[c["name"]] = obj

# Очистка старых данных перед загрузкой новых
CulturalObject.objects.all().delete()
Infrastructure.objects.all().delete()

# --- Культурные объекты ---
objects_data = [
    {
        "title": "National Museum of Tajikistan",
        "title_ru": "Национальный музей Таджикистана",
        "title_tj": "Осорхонаи миллии Тоҷикистон",
        "category": categories["Museum"],
        "region": regions["Dushanbe"],
        "description": "The largest museum in Central Asia, showcasing Tajik history from ancient times to the present.",
        "description_ru": "Крупнейший музей Центральной Азии, демонстрирующий историю Таджикистана от древности до наших дней.",
        "description_tj": "Бузургтарин осорхона дар Осиёи Марказӣ, ки таърихи Тоҷикистонро аз давраи қадим то имрӯз намоиш медиҳад.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/National_Museum_of_Tajikistan.jpg?width=800",
        "latitude": 38.5598, "longitude": 68.7870,
    },
    {
        "title": "Ismoili Somoni Monument",
        "title_ru": "Памятник Исмоили Сомони",
        "title_tj": "Муҷассамаи Исмоили Сомонӣ",
        "category": categories["Monument"],
        "region": regions["Dushanbe"],
        "description": "The iconic golden monument in the heart of Dushanbe, honoring the founder of the Samanid Empire.",
        "description_ru": "Знаменитый золотой монумент в центре Душанбе, посвящённый основателю государства Саманидов.",
        "description_tj": "Муҷассамаи машҳури тиллоӣ дар маркази Душанбе, ба асосгузори давлати Сомониён бахшида шудааст.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Ilham_Aliyev_visited_a_statue_of_Ismoili_Somoni_in_Dushanbe.jpg?width=800",
        "latitude": 38.5736, "longitude": 68.7746,
    },
    {
        "title": "Haji Yakoub Mosque",
        "title_ru": "Мечеть Хаджи Якуб",
        "title_tj": "Масҷиди Ҳоҷӣ Яъқуб",
        "category": categories["Mosque"],
        "region": regions["Dushanbe"],
        "description": "The main mosque of Dushanbe, a beautiful place of worship and architectural gem.",
        "description_ru": "Главная мечеть Душанбе, прекрасное место поклонения и архитектурная жемчужина.",
        "description_tj": "Масҷиди асосии Душанбе, ҷои зебои ибодат ва гавҳари меъморӣ.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/%D0%9C%D0%B0%D1%81%D2%B7%D0%B8%D0%B4%D0%B8_%D2%B7%D0%BE%D0%BC%D0%B5%D0%B8_%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%B7%D0%B8%D0%B8_%D1%88._%D0%94%D1%83%D1%88%D0%B0%D0%BD%D0%B1%D0%B5_%D0%B1%D0%B0_%D0%BD%D0%BE%D0%BC%D0%B8_%D2%B2%D0%BE%D2%B7%D3%A3_%D0%AF%D1%8A%D2%9B%D1%83%D0%B1_%283%29.jpg?width=800",
        "latitude": 38.5602, "longitude": 68.7748,
    },
    {
        "title": "Khujand Fortress",
        "title_ru": "Худжандская крепость",
        "title_tj": "Қалъаи Хуҷанд",
        "category": categories["Fortress"],
        "region": regions["Sughd"],
        "description": "An ancient citadel dating back over 2,500 years, now housing a museum of archaeology and history.",
        "description_ru": "Древняя цитадель возрастом более 2500 лет, ныне музей археологии и истории.",
        "description_tj": "Қалъаи қадима, ки зиёда аз 2500 сол умр дорад, ҳоло осорхонаи археология ва таърих аст.",
        "location": "Khujand",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Historical_Museum_of_Sughd.jpg?width=800",
        "latitude": 40.2826, "longitude": 69.6221,
    },
    {
        "title": "Iskanderkul Lake",
        "title_ru": "Озеро Искандеркуль",
        "title_tj": "Кӯли Искандаркӯл",
        "category": categories["Nature"],
        "region": regions["DRS"],
        "description": "A stunning alpine lake in the Fann Mountains, named after Alexander the Great.",
        "description_ru": "Потрясающее высокогорное озеро в Фанских горах, названное в честь Александра Македонского.",
        "description_tj": "Кӯли зебои баландкӯҳ дар Кӯҳҳои Фан, ки ба номи Искандари Зулқарнайн гузошта шудааст.",
        "location": "Fann Mountains",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Iskander-kul,_Tajikistan.JPG?width=800",
        "latitude": 39.0833, "longitude": 68.3667,
    },
    {
        "title": "Panjshanbe Bazaar",
        "title_ru": "Базар Панджшанбе",
        "title_tj": "Бозори Панҷшанбе",
        "category": categories["Market"],
        "region": regions["Sughd"],
        "description": "The largest and most colorful bazaar in Northern Tajikistan, offering spices, dried fruits, and handicrafts.",
        "description_ru": "Крупнейший и самый красочный базар Северного Таджикистана — специи, сухофрукты и ремёсла.",
        "description_tj": "Бузургтарин ва рангинтарин бозори Тоҷикистони шимолӣ — адвияҳо, меваҳои хушк ва ҳунарҳои дастӣ.",
        "location": "Khujand",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Panjshanbe_Bazaar.jpg?width=800",
        "latitude": 40.2837, "longitude": 69.6289,
    },
    {
        "title": "Hisor Fortress",
        "title_ru": "Гиссарская крепость",
        "title_tj": "Қалъаи Ҳисор",
        "category": categories["Fortress"],
        "region": regions["DRS"],
        "description": "A magnificent historical fort just outside Dushanbe, featuring ancient madrasahs and a caravanserai.",
        "description_ru": "Величественный исторический форт недалеко от Душанбе, включающий древние медресе и караван-сарай.",
        "description_tj": "Қалъаи таърихии боҳашамат дар наздикии Душанбе, ки мадрасаҳои қадима ва корвонсаройро дар бар мегирад.",
        "location": "Hisor",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Hisor_Fort_20141006_Tajikistan_1018_Hisor_(16072348167).jpg?width=800",
        "latitude": 38.5033, "longitude": 68.5381,
    },
    {
        "title": "Karakul Lake",
        "title_ru": "Озеро Каракуль",
        "title_tj": "Кӯли Қароқӯл",
        "category": categories["Nature"],
        "region": regions["GBAO"],
        "description": "A breathtaking high-altitude lake in the Pamir Mountains, formed in a meteorite crater.",
        "description_ru": "Захватывающее дух высокогорное озеро в горах Памира, образовавшееся в метеоритном кратере.",
        "description_tj": "Кӯли баландкӯҳи ҳайратангез дар кӯҳҳои Помир, ки дар кратери метеоритӣ ба вуҷуд омадааст.",
        "location": "Pamir Mountains",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Karakul_lake_Tajikistan.jpg?width=800",
        "latitude": 39.0167, "longitude": 73.4000,
    },
    {
        "title": "Hulbuk Palace",
        "title_ru": "Дворец Хулбук",
        "title_tj": "Қасри Ҳулбук",
        "category": categories["Museum"],
        "region": regions["Khatlon"],
        "description": "A restored 9th-century palace complex offering a glimpse into the ancient civilization of Khatlon.",
        "description_ru": "Восстановленный дворцовый комплекс 9-го века, дающий представление о древней цивилизации Хатлона.",
        "description_tj": "Маҷмааи қасри барқароршудаи асри 9, ки ба тамаддуни қадимаи Хатлон назар мекунад.",
        "location": "Vose",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Ancient_Town_Khulbuk,_Tajikistan_(28912837737).jpg?width=800",
        "latitude": 37.7788, "longitude": 69.5515,
    },
    {
        "title": "Ayni Opera and Ballet Theatre",
        "title_ru": "Театр оперы и балета имени Айни",
        "title_tj": "Театри давлатии академии опера ва балети ба номи С. Айнӣ",
        "category": categories["Monument"],
        "region": regions["Dushanbe"],
        "description": "A stunning classical theatre building in Dushanbe hosting world-class ballet and opera performances.",
        "description_ru": "Потрясающее классическое здание театра в Душанбе, где проходят балетные и оперные спектакли.",
        "description_tj": "Бинои зебои театри классикӣ дар Душанбе, ки дар он намоишномаҳои балет ва опера баргузор мешаванд.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Ayni_Opera_Theatre_in_Dushanbe.JPG?width=800",
        "latitude": 38.5684, "longitude": 68.7963,
    },
    {
        "title": "Khoja Obi Garm Sanatorium",
        "title_ru": "Санаторий Ходжа Оби Гарм",
        "title_tj": "Осоишгоҳи Хоҷа Оби Гарм",
        "category": categories["Nature"],
        "region": regions["DRS"],
        "description": "A legendary Soviet-era mountain resort famous for its healing hot radon springs.",
        "description_ru": "Легендарный горный курорт советских времен, известный своими целебными горячими радоновыми источниками.",
        "description_tj": "Осоишгоҳи машҳури кӯҳии замони шӯравӣ, ки бо чашмаҳои оби гарми шифобахши худ маълум аст.",
        "location": "Varzob District",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Sanatorium_Khodjaobigarm_01.jpg?width=800",
        "latitude": 38.9056, "longitude": 68.7692,
    },
    {
        "title": "Rohat Teahouse",
        "title_ru": "Чайхана Рохат",
        "title_tj": "Чойхонаи Роҳат",
        "category": categories["Monument"],
        "region": regions["Dushanbe"],
        "description": "A classic, exquisitely decorated open-air teahouse serving traditional Tajik cuisine since 1958.",
        "description_ru": "Классическая, изысканно украшенная чайхана под открытым небом, где с 1958 года подают традиционные блюда.",
        "description_tj": "Чойхонаи классикӣ ва зебои кушод, ки аз соли 1958 таомҳои миллии тоҷикиро пешкаш мекунад.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tea_House_Rohat,_Dushanbe,_Tajikistan_2.jpg?width=800",
        "latitude": 38.5830, "longitude": 68.7845,
    },
    {
        "title": "Rudaki Park",
        "title_ru": "Парк Рудаки",
        "title_tj": "Боғи Рӯдакӣ",
        "category": categories["Nature"],
        "region": regions["Dushanbe"],
        "description": "The green heart of Dushanbe, featuring manicured gardens, fountains, and a statue of poet Rudaki.",
        "description_ru": "Зеленое сердце Душанбе с ухоженными садами, фонтанами и памятником поэту Рудаки.",
        "description_tj": "Қалби сабзи Душанбе, ки дорои боғҳои зебо, фаввораҳо ва ҳайкали шоир Рӯдакӣ мебошад.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Ustod_Rudaki_Park_and_Palace_of_the_Nation_in_Dushanbe_-_panoramio.jpg?width=800",
        "latitude": 38.5750, "longitude": 68.7758,
    },
    {
        "title": "Palace of Nations",
        "title_ru": "Дворец Нации",
        "title_tj": "Қасри Миллат",
        "category": categories["Monument"],
        "region": regions["Dushanbe"],
        "description": "The official residence of the President of Tajikistan, an architectural masterpiece in central Dushanbe.",
        "description_ru": "Официальная резиденция Президента Таджикистана, архитектурный шедевр в центре Душанбе.",
        "description_tj": "Қароргоҳи расмии Президенти Тоҷикистон, шоҳасари меъморӣ дар маркази Душанбе.",
        "location": "Dushanbe",
        "image": "https://upload.wikimedia.org/wikipedia/en/1/1b/Dushanbe_Presidential_Palace_01.jpg",
        "latitude": 38.5833, "longitude": 68.7733,
    },
    {
        "title": "Tajik National University",
        "title_ru": "Таджикский национальный университет",
        "title_tj": "Донишгоҳи миллии Тоҷикистон",
        "category": categories["Monument"],
        "region": regions["Dushanbe"],
        "description": "The largest and most prestigious higher education institution in the country, featuring impressive architecture.",
        "description_ru": "Крупнейшее и самое престижное высшее учебное заведение страны, отличающееся впечатляющей архитектурой.",
        "description_tj": "Бузургтарин ва бонуфузтарин муассисаи таҳсилоти олии кишвар, ки бо меъмории таъсирбахши худ фарқ мекунад.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Tajik_National_University_(Main_Building).jpg?width=800",
        "latitude": 38.5886, "longitude": 68.7844,
    },
    {
        "title": "Victory Park",
        "title_ru": "Парк Победы",
        "title_tj": "Боғи Ғалаба",
        "category": categories["Monument"],
        "region": regions["Dushanbe"],
        "description": "A hilltop memorial complex offering the best panoramic views of the entire city of Dushanbe.",
        "description_ru": "Мемориальный комплекс на вершине холма, откуда открывается лучший панорамный вид на весь Душанбе.",
        "description_tj": "Маҷмааи мемориалӣ дар болои теппа, ки манзараи беҳтарини тамоми шаҳри Душанберо пешкаш мекунад.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/World_war_2_memorial,_victory_park_(2)_-_panoramio.jpg?width=800",
        "latitude": 38.5830, "longitude": 68.8050,
    },
    {
        "title": "Kamoli Khujandi Mausoleum",
        "title_ru": "Мавзолей Камола Худжанди",
        "title_tj": "Мақбараи Камоли Хуҷандӣ",
        "category": categories["Monument"],
        "region": regions["Sughd"],
        "description": "A beautiful mausoleum honoring the great 14th-century poet, located in his hometown of Khujand.",
        "description_ru": "Красивый мавзолей в честь великого поэта 14 века, расположенный в его родном городе Худжанде.",
        "description_tj": "Мақбараи зебое бахшида ба шоири бузурги асри 14, ки дар зодгоҳаш шаҳри Хуҷанд ҷойгир аст.",
        "location": "Khujand",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/%D0%9C%D0%B0%D2%9B%D0%B1%D0%B0%D1%80%D0%B0%D0%B8_%D0%9A%D0%B0%D0%BC%D0%BE%D0%BB%D0%B8_%D0%A5%D1%83%D2%B7%D0%B0%D0%BD%D0%B4%D3%A3.jpg?width=800",
        "latitude": 40.2800, "longitude": 69.6230,
    },
    {
        "title": "Istiklol Complex",
        "title_ru": "Комплекс Истиклол",
        "title_tj": "Маҷмааи Истиқлол",
        "category": categories["Monument"],
        "region": regions["Sughd"],
        "description": "A modern cultural and historical complex in Khujand celebrating the independence of Tajikistan.",
        "description_ru": "Современный культурно-исторический комплекс в Худжанде, посвященный независимости Таджикистана.",
        "description_tj": "Маҷмааи муосири фарҳангӣ ва таърихӣ дар Хуҷанд, ки ба истиқлолияти Тоҷикистон бахшида шудааст.",
        "location": "Khujand",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/%D0%9C%D0%B0%D2%B7%D0%BC%D0%B0%D0%B0%D0%B8_%D1%82%D0%B0%D1%8A%D1%80%D0%B8%D1%85%D3%A3-_%D1%84%D0%B0%D1%80%D2%B3%D0%B0%D0%BD%D0%B3%D0%B8%D0%B8_%D0%98%D1%81%D1%82%D0%B8%D0%BA%D0%BB%D0%BE%D0%BB.jpg?width=800",
        "latitude": 40.2850, "longitude": 69.6260,
    },
    {
        "title": "Puppet Theatre",
        "title_ru": "Кукольный театр",
        "title_tj": "Театри лухтак",
        "category": categories["Museum"],
        "region": regions["Dushanbe"],
        "description": "The State Puppet Theatre in Dushanbe, a whimsical building bringing joy to generations of children.",
        "description_ru": "Государственный театр кукол в Душанбе, причудливое здание, приносящее радость поколениям детей.",
        "description_tj": "Театри давлатии лухтак дар Душанбе, бинои афсонавие, ки ба наслҳои кӯдакон шодӣ мебахшад.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Puppet_theatre_in_Dushanbe.jpg?width=800",
        "latitude": 38.5700, "longitude": 68.7900,
    },
    {
        "title": "Botanical Garden",
        "title_ru": "Ботанический сад",
        "title_tj": "Боғи ботаникӣ",
        "category": categories["Nature"],
        "region": regions["Dushanbe"],
        "description": "A vast collection of trees and plants from around the world, perfect for peaceful strolls.",
        "description_ru": "Огромная коллекция деревьев и растений со всего мира, идеально подходящая для спокойных прогулок.",
        "description_tj": "Маҷмӯаи бузурги дарахтон ва растаниҳо аз саросари ҷаҳон, беҳтарин ҷой барои сайру гашти ором.",
        "location": "Dushanbe",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Botanical_gardens_2_-_panoramio.jpg?width=800",
        "latitude": 38.6010, "longitude": 68.7840,
    },
    {
        "title": "Nurek Dam",
        "title_ru": "Нурекская ГЭС",
        "title_tj": "Нерӯгоҳи обии Норак",
        "category": categories["Monument"],
        "region": regions["DRS"],
        "description": "One of the tallest dams in the world, holding back a massive reservoir in a scenic mountain gorge.",
        "description_ru": "Одна из самых высоких плотин в мире, удерживающая огромное водохранилище в живописном горном ущелье.",
        "description_tj": "Яке аз баландтарин сарбандҳо дар ҷаҳон, ки обанбори азимеро дар дараи зебоманзари кӯҳӣ нигоҳ медорад.",
        "location": "Nurek",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Nurek_dam_july.JPG?width=800",
        "latitude": 38.3715, "longitude": 69.3492,
    },
    {
        "title": "Alaudin Lakes",
        "title_ru": "Алаудинские озера",
        "title_tj": "Кӯлҳои Аловуддин",
        "category": categories["Nature"],
        "region": regions["Sughd"],
        "description": "A stunning group of crystal-clear alpine lakes situated high in the majestic Fann Mountains.",
        "description_ru": "Потрясающая группа кристально чистых высокогорных озер, расположенных высоко в величественных Фанских горах.",
        "description_tj": "Гурӯҳи ҳайратангези кӯлҳои кӯҳии кристаллӣ, ки дар баландтарини кӯҳҳои боҳашамати Фан ҷойгиранд.",
        "location": "Fann Mountains",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Alaudin_lakes.jpg?width=800",
        "latitude": 39.2333, "longitude": 68.2500,
    },
    {
        "title": "Yaghnob Valley",
        "title_ru": "Долина Ягноб",
        "title_tj": "Водии Яғноб",
        "category": categories["Nature"],
        "region": regions["Sughd"],
        "description": "An isolated valley where inhabitants still speak the ancient Sogdian language.",
        "description_ru": "Изолированная долина, жители которой до сих пор говорят на древнем согдийском языке.",
        "description_tj": "Водии ҷудогонае, ки сокинонаш то ҳол бо забони қадимаи суғдӣ ҳарф мезананд.",
        "location": "Ayni District",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Khishirtop_village.jpg?width=800",
        "latitude": 39.1972, "longitude": 68.5583,
    },
    {
        "title": "Ismoil Somoni Peak",
        "title_ru": "Пик Исмоила Сомони",
        "title_tj": "Қуллаи Исмоили Сомонӣ",
        "category": categories["Nature"],
        "region": regions["GBAO"],
        "description": "The highest mountain in Tajikistan and the former Soviet Union, standing at 7,495 meters.",
        "description_ru": "Самая высокая гора в Таджикистане и бывшем Советском Союзе высотой 7495 метров.",
        "description_tj": "Баландтарин кӯҳ дар Тоҷикистон ва Иттиҳоди Шӯравии собиқ бо баландии 7495 метр.",
        "location": "Pamir Mountains",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Pik_Kommunizma.jpg?width=800",
        "latitude": 38.9400, "longitude": 72.0150,
    }
]

for o in objects_data:
    CulturalObject.objects.update_or_create(title=o["title"], defaults=o)

# --- Инфраструктура ---
infra_data = [
    {"name": "Hyatt Regency Dushanbe", "name_ru": "Хаятт Ридженси Душанбе", "name_tj": "Ҳаятт Риҷенсӣ Душанбе", "inf_type": "hotel", "region": regions["Dushanbe"], "address": "Dushanbe, Ismoili Somoni Ave.", "phone": "+992 48 702 1234", "latitude": 38.5602, "longitude": 68.7730},
    {"name": "Serena Hotel Dushanbe", "name_ru": "Серена Отель Душанбе", "name_tj": "Серена Ҳотели Душанбе", "inf_type": "hotel", "region": regions["Dushanbe"], "address": "Dushanbe, Rudaki Ave.", "phone": "+992 44 600 1515", "latitude": 38.5610, "longitude": 68.7750},
    {"name": "Restaurant Rohat", "name_ru": "Ресторан Роҳат", "name_tj": "Тарабхонаи Роҳат", "inf_type": "restaurant", "region": regions["Dushanbe"], "address": "Dushanbe, Rudaki Ave.", "phone": "+992 37 221 0808"},
    {"name": "Dushanbe Airport (DYU)", "name_ru": "Аэропорт Душанбе", "name_tj": "Фурудгоҳи Душанбе", "inf_type": "transport", "region": regions["Dushanbe"], "address": "Dushanbe International Airport", "latitude": 38.5433, "longitude": 68.8249},
    {"name": "Khujand Grand Hotel", "name_ru": "Гранд Отель Худжанд", "name_tj": "Гранд Ҳотели Хуҷанд", "inf_type": "hotel", "region": regions["Sughd"], "address": "Khujand, Lenin St.", "phone": "+992 92 777 5555"},
    {"name": "Pamir Lodge", "name_ru": "Памир Лодж", "name_tj": "Помир Лоҷ", "inf_type": "hotel", "region": regions["GBAO"], "address": "Khorog, Pamir", "phone": "+992 93 111 2233"},
]

for item in infra_data:
    Infrastructure.objects.update_or_create(name=item["name"], defaults=item)

# --- Мастера / Гиды ---
masters_data = [
    {"name": "Firdavs Karimov", "specialty": "Mountain Guide (Pamir)", "bio": "Experienced guide with 10+ years in Pamir expeditions.", "contact": "+992 93 500 1234"},
    {"name": "Nilufar Rahimova", "specialty": "Cultural Guide (Dushanbe)", "bio": "Expert in Tajik history and cultural heritage tours.", "contact": "+992 90 111 2222"},
]

for m in masters_data:
    Master.objects.update_or_create(name=m["name"], defaults=m)

print("Test data uploaded successfully!")
print(f"Regions: {Region.objects.count()}")
print(f"Categories: {Category.objects.count()}")
print(f"Cultural Objects: {CulturalObject.objects.count()}")
print(f"Infrastructure: {Infrastructure.objects.count()}")

