import urllib.request
import json
import urllib.parse
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def search(query):
    req = urllib.request.Request(f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=5", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as response:
        data = json.loads(response.read().decode())
        if data['results']:
            print(f"--- {query} ---")
            for r in data['results']:
                print(r['urls']['raw'] + "&w=800&q=80")

search("water bottle")
search("water cooler dispenser")
search("six pack water bottles")
search("warehouse boxes")
