import urllib.request
import re

urls = [
    'https://en.wikipedia.org/wiki/Ismail_Samani_Monument',
    'https://en.wikipedia.org/wiki/Haji_Yaqub_Mosque',
    'https://en.wikipedia.org/wiki/Khujand_Fortress',
    'https://en.wikipedia.org/wiki/Iskanderkul',
    'https://en.wikipedia.org/wiki/Panjshanbe_Bazaar',
    'https://en.wikipedia.org/wiki/Hisor',
    'https://en.wikipedia.org/wiki/Karakul_(Tajikistan)',
    'https://en.wikipedia.org/wiki/Hulbuk'
]

req = urllib.request.build_opener()
req.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
urllib.request.install_opener(req)

for u in urls:
    try:
        html = urllib.request.urlopen(u).read().decode('utf-8', errors='ignore')
        m = re.search(r'\"(https://upload\.wikimedia\.org/wikipedia/commons/thumb/[^\"]+\.jpe?g/\d+px-[^\"]+)\"', html, re.IGNORECASE)
        if m:
            print(f'{u}: {m.group(1)}')
        else:
            print(f'{u}: No image found')
    except Exception as e:
        print(f'{u}: Error {e}')
