import urllib.request
import json

def search_images(query, num=5):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(query)}&gsrlimit={num}&prop=imageinfo&iiprop=url"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        pages = data.get('query', {}).get('pages', {})
        res = []
        for page_id, page_info in pages.items():
            title = page_info.get('title')
            img_url = page_info.get('imageinfo', [{}])[0].get('url')
            if img_url and ('jpg' in img_url.lower() or 'png' in img_url.lower()):
                # Add width parameter for thumbnails to avoid huge files
                img_url += "?width=800" if "?" not in img_url else "&width=800"
                res.append(f"Title: {title}\nURL: {img_url}\n")
        return res
    except Exception as e:
        return [f"Error for {query}: {e}"]

queries = [
    "Sumalak preparation",
    "Cooking sumalak",
    "Istaravshan",
    "Isfara",
    "Khujand city",
    "Dushanbe city",
    "Pamir Highway",
    "Pamir mountains"
]

with open('wiki_results.txt', 'w', encoding='utf-8') as f:
    for q in queries:
        f.write(f"--- {q} ---\n")
        results = search_images(q)
        f.write("".join(results) + "\n")
