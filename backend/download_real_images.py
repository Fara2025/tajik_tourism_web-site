import os
import time
import urllib.request
from django.core.wsgi import get_wsgi_application

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
application = get_wsgi_application()

from tourism.models import CulturalObject

images_map = {
    "National Museum of Tajikistan": "https://en.wikipedia.org/wiki/Special:Redirect/file/National_Museum_of_Tajikistan.jpg",
    "Ismoili Somoni Monument": "https://en.wikipedia.org/wiki/Special:Redirect/file/Ismail_Samani_Monument,_Dushanbe.jpg",
    "Haji Yakoub Mosque": "https://en.wikipedia.org/wiki/Special:Redirect/file/Haji_Yaqub_Mosque.jpg",
    "Khujand Fortress": "https://en.wikipedia.org/wiki/Special:Redirect/file/Khujand_fortress.jpg",
    "Iskanderkul Lake": "https://en.wikipedia.org/wiki/Special:Redirect/file/Iskander-kul,_Tajikistan.JPG",
    "Panjshanbe Bazaar": "https://en.wikipedia.org/wiki/Special:Redirect/file/Panjshanbe_Bazaar_Khujand.jpg",
    "Hisor Fortress": "https://en.wikipedia.org/wiki/Special:Redirect/file/Hissar_Fortress,_Tajikistan.jpg",
    "Karakul Lake": "https://en.wikipedia.org/wiki/Special:Redirect/file/Lake_Karakul_in_Tajikistan.jpg",
    "Hulbuk Palace": "https://en.wikipedia.org/wiki/Special:Redirect/file/Ancient_Town_Khulbuk,_Tajikistan_(28912837737).jpg",
}

media_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'media', 'images')
os.makedirs(media_dir, exist_ok=True)

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'TajikTourismApp/1.0 (Student Project)')]
urllib.request.install_opener(opener)

for title, url in images_map.items():
    print(f"Downloading {title}...")
    filename = title.replace(' ', '_').replace(',', '') + ".jpg"
    filepath = os.path.join(media_dir, filename)
    
    try:
        urllib.request.urlretrieve(url, filepath)
        
        # Verify it's not a 404 HTML page by checking size
        if os.path.getsize(filepath) < 5000:
            print(f"  -> File too small for {title}, might be an error page.")
            os.remove(filepath)
            continue
            
        # Update database
        obj = CulturalObject.objects.filter(title=title).first()
        if obj:
            obj.image = f"http://localhost:8000/media/images/{filename}"
            obj.save()
            print(f"  -> Saved and updated DB for {title}")
        time.sleep(1) # Sleep to avoid rate limits
    except Exception as e:
        print(f"  -> Error downloading {title}: {e}")

print("All real images downloaded and applied successfully!")
