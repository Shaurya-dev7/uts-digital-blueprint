import os
import urllib.request

brands_products = {
    "chembond": ["kem-proof-cwc", "kem-proof-pwc", "kem-sealer-pav", "kem-proof-iwc"],
    "darling-muesco": ["prv-steam", "safety-relief", "robotrol", "prs-steam", "multi-spring", "piston", "desuperheater", "prv-gas"],
    "igeba": ["tf-34", "tf-35", "tfw-60", "tf-65", "tf-95", "tf-160"],
    "steam-con": ["prv-100", "rcv-100", "pcv-100"]
}

base_dir = r"d:\Projects\UTS"
public_products_dir = os.path.join(base_dir, "public", "products")
public_catalogs_dir = os.path.join(base_dir, "public", "catalogs")

def get_placeholder(text, output_path):
    url = f"https://placehold.co/800x600/0f172a/ffffff.png?text={text.replace(' ', '+')}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(output_path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
    except Exception as e:
        print(f"Failed to download placeholder for {text}: {e}")

# Create product image directories
for brand, products in brands_products.items():
    brand_dir = os.path.join(public_products_dir, brand)
    os.makedirs(brand_dir, exist_ok=True)
    for prod in products:
        prod_dir = os.path.join(brand_dir, prod)
        os.makedirs(prod_dir, exist_ok=True)
        
        hero_path = os.path.join(prod_dir, "hero.png")
        if not os.path.exists(hero_path):
            get_placeholder(prod, hero_path)
            print(f"Created placeholder for {brand}/{prod}")
            
# Create catalog directories
for brand in brands_products.keys():
    os.makedirs(os.path.join(public_catalogs_dir, brand), exist_ok=True)

print("Asset directories organized.")
