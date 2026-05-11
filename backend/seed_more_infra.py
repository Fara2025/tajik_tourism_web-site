import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from tourism.models import Infrastructure, Region

def seed():
    dushanbe = Region.objects.get(name="Dushanbe")
    sughd = Region.objects.get(name="Sughd")
    khatlon = Region.objects.get(name="Khatlon")
    gbao = Region.objects.get(name="GBAO")
    drs = Region.objects.get(name="DRS")

    more_infra = [
        # --- TRANSPORT DUSHANBE ---
        {
            "name": "Terminal 'Asian Express' (Vokzal)", 
            "name_ru": "Терминал 'Asian Express' (Вокзал)", 
            "name_tj": "Терминали 'Asian Express' (Вокзал)", 
            "inf_type": "transport", 
            "region": dushanbe, 
            "address": "Dushanbe, Nazarshoev St.", 
            "phone": "+992 44 600 6600", 
            "description": "Main bus terminal for southern routes (Khatlon). Marshrutkas and big buses.",
            "description_ru": "Главный терминал для южных направлений (Хатлон). Маршрутки и большие автобусы.",
            "description_tj": "Терминали асосӣ барои самтҳои ҷанубӣ (Хатлон). Маршруткаҳо ва автобусҳои калон.",
            "latitude": 38.5585, "longitude": 68.8010
        },
        {
            "name": "Cementzavod Taxi Stand (North Gate)", 
            "name_ru": "Стоянка 'Цементзавод' (Северные ворота)", 
            "name_tj": "Истгоҳи 'Сементзавод'", 
            "inf_type": "transport", 
            "region": dushanbe, 
            "address": "Northern outskirts of Dushanbe", 
            "phone": "No official number, negotiate on site", 
            "description": "Taxis and marshrutkas to Khujand, Istaravshan, and Panjakent.",
            "description_ru": "Такси и маршрутки до Худжанда, Истаравшана и Пенджикента.",
            "description_tj": "Такси ва маршруткаҳо ба Хуҷанд, Истаравшан ва Панҷакент.",
            "latitude": 38.6415, "longitude": 68.7845
        },
        {
            "name": "Korvon Transport Hub", 
            "name_ru": "Транспортный узел Корвон", 
            "name_tj": "Маркази нақлиётии Корвон", 
            "inf_type": "transport", 
            "region": dushanbe, 
            "address": "Southern part of Dushanbe, Korvon Market", 
            "phone": "+992 90 777 0011 (Taxi info)", 
            "description": "Marshrutkas to nearby villages and Khatlon region.",
            "description_ru": "Маршрутки до ближайших кишлаков и Хатлонской области.",
            "description_tj": "Маршруткаҳо ба деҳаҳои наздик ва вилояти Хатлон.",
            "latitude": 38.5020, "longitude": 68.7610
        },

        # --- FOOD DUSHANBE ---
        {
            "name": "Chaykhana 'Navruz'", 
            "name_ru": "Чайхана 'Навруз'", 
            "name_tj": "Чойхонаи 'Наврӯз'", 
            "inf_type": "restaurant", 
            "region": dushanbe, 
            "address": "Ismoili Somoni Ave, near the lake", 
            "phone": "+992 93 555 1122", 
            "description": "Exquisite palace-style teahouse with traditional food.",
            "description_ru": "Изысканная чайхана в дворцовом стиле с традиционной едой.",
            "description_tj": "Чойхонаи боҳашамат дар услуби қаср бо таомҳои миллӣ.",
            "latitude": 38.5855, "longitude": 68.7680
        },
        {
            "name": "Merve Restaurant", 
            "name_ru": "Ресторан Мерве", 
            "name_tj": "Тарабхонаи Мерве", 
            "inf_type": "restaurant", 
            "region": dushanbe, 
            "address": "Rudaki Ave, near Opera Theatre", 
            "phone": "+992 37 221 1133", 
            "description": "Popular Turkish and international cuisine.",
            "description_ru": "Популярная турецкая и международная кухня.",
            "description_tj": "Таомҳои машҳури туркӣ ва байналмилалӣ.",
            "latitude": 38.5670, "longitude": 68.7940
        },

        # --- KHUJAND ---
        {
            "name": "Panjshanbe Transport Stand", 
            "name_ru": "Стоянка Панджшанбе", 
            "name_tj": "Истгоҳи Панҷшанбе", 
            "inf_type": "transport", 
            "region": sughd, 
            "address": "Khujand, near Panjshanbe Bazaar", 
            "phone": "Available on site", 
            "description": "Central transport hub of Khujand. Marshrutkas to all parts of Sughd region.",
            "description_ru": "Центральный транспортный узел Худжанда. Маршрутки во все части Согдийской области.",
            "description_tj": "Маркази нақлиётии Хуҷанд. Маршруткаҳо ба тамоми гӯшаву канори вилояти Суғд.",
            "latitude": 40.2840, "longitude": 69.6295
        },
        {
            "name": "Zaytun Restaurant", 
            "name_ru": "Ресторан Зайтун", 
            "name_tj": "Тарабхонаи Зайтун", 
            "inf_type": "restaurant", 
            "region": sughd, 
            "address": "Khujand, Syr Darya riverbank", 
            "phone": "+992 92 888 0099", 
            "description": "Excellent riverside dining with local specialties.",
            "description_ru": "Отличный ресторан на берегу Сырдарьи с местными деликатесами.",
            "description_tj": "Тарабхонаи аъло дар соҳили Сирдарё бо таомҳои маҳаллӣ.",
            "latitude": 40.2910, "longitude": 69.6150
        },

        # --- PANJAKENT ---
        {
            "name": "Panjakent Taxi Stand (to Samarkand)", 
            "name_ru": "Стоянка Пенджикент (до Самарканда)", 
            "name_tj": "Истгоҳи Панҷакент (ба Самарқанд)", 
            "inf_type": "transport", 
            "region": sughd, 
            "address": "West exit of Panjakent", 
            "phone": "Contact local drivers", 
            "description": "Taxis to the Uzbek border (Sarazm) and Samarkand.",
            "description_ru": "Такси до границы с Узбекистаном (Саразм) и Самарканда.",
            "description_tj": "Таксиҳо то сарҳади Ӯзбекистон (Саразм) ва Самарқанд.",
            "latitude": 39.5015, "longitude": 67.5810
        },

        # --- KHOROG ---
        {
            "name": "Khorog Bus Station (to Dushanbe)", 
            "name_ru": "Автовокзал Хорог (до Душанбе)", 
            "name_tj": "Автовокзали Хоруғ (ба Душанбе)", 
            "inf_type": "transport", 
            "region": gbao, 
            "address": "Khorog, near the central market", 
            "phone": "+992 93 505 4433", 
            "description": "Shared taxis (джипы) to Dushanbe. Usually leaves in early morning.",
            "description_ru": "Такси (джипы) до Душанбе. Обычно выезжают рано утром.",
            "description_tj": "Таксиҳо (ҷипҳо) ба Душанбе. Одатан субҳи барвақт мераванд.",
            "latitude": 37.4910, "longitude": 71.5510
        },
        
        # --- MORE TRANSPORT DUSHANBE ---
        {
            "name": "Sakhovat Taxi Stand", 
            "name_ru": "Стоянка 'Саховат'", 
            "name_tj": "Истгоҳи 'Саховат'", 
            "inf_type": "transport", 
            "region": dushanbe, 
            "address": "Dushanbe, Sakhovat Market area", 
            "phone": "Negotiate with drivers", 
            "description": "Taxis and marshrutkas to Khatlon region (Bokhtar, Yovon).",
            "description_ru": "Такси и маршрутки до Хатлонской области (Бохтар, Яван).",
            "description_tj": "Такси ва маршруткаҳо ба вилояти Хатлон (Бохтар, Ёвон).",
            "latitude": 38.5210, "longitude": 68.7550
        },

        # --- ISTARAVSHAN ---
        {
            "name": "Istaravshan Central Hub", 
            "name_ru": "Центральный узел Истаравшана", 
            "name_tj": "Маркази нақлиётии Истаравшан", 
            "inf_type": "transport", 
            "region": sughd, 
            "address": "Istaravshan center, near the bazaar", 
            "phone": "Ask at the local bazaar", 
            "description": "Marshrutkas to Dushanbe and Khujand. High frequency during day.",
            "description_ru": "Маршрутки до Душанбе и Худжанда. Высокая частота рейсов днем.",
            "description_tj": "Маршруткаҳо ба Душанбе ва Хуҷанд. Рӯзона бисёр мераванд.",
            "latitude": 39.9140, "longitude": 69.0030
        },

        # --- KULOB ---
        {
            "name": "Kulob Bus Terminal", 
            "name_ru": "Автовокзал Куляба", 
            "name_tj": "Автовокзали Кӯлоб", 
            "inf_type": "transport", 
            "region": khatlon, 
            "address": "Kulob, near the fortress", 
            "phone": "+992 90 222 3344", 
            "description": "Daily marshrutkas to Dushanbe and nearby districts.",
            "description_ru": "Ежедневные маршрутки до Душанбе и ближайших районов.",
            "description_tj": "Маршруткаҳои ҳаррӯза ба Душанбе ва ноҳияҳои наздик.",
            "latitude": 37.9110, "longitude": 69.7810
        },

        # --- MORE FOOD ---
        {
            "name": "Cafe 'Osh-i Markazi'", 
            "name_ru": "Кафе 'Оши Маркази'", 
            "name_tj": "Оши Марказӣ", 
            "inf_type": "restaurant", 
            "region": dushanbe, 
            "address": "Dushanbe, near the main mosque", 
            "phone": "+992 91 888 7766", 
            "description": "Best place for traditional Dushanbe pilaf (Osh).",
            "description_ru": "Лучшее место для традиционного душанбинского плова (Ош).",
            "description_tj": "Беҳтарин ҷой барои оши палави миллии Душанбе.",
            "latitude": 38.5910, "longitude": 68.7810
        }
    ]

    for item in more_infra:
        Infrastructure.objects.update_or_create(name=item["name"], defaults=item)
    
    print(f"Added {len(more_infra)} more infrastructure points.")

if __name__ == "__main__":
    seed()
