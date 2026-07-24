"""
Map real extracted product images from catalogs to product directories.
Also copy the images into the proper product image folders.
"""
import shutil
import os

base = r"d:\Projects\UTS\public"
extracted = os.path.join(base, "catalogs", "extracted_images")
products_dir = os.path.join(base, "products")

# Image mapping: product_path -> source extracted image
# Based on visual inspection of extracted images

image_map = {
    # Darling Muesco products - from Darling_Muesco_Flyer
    "darling-muesco/prv-steam": [
        ("Darling_Muesco_Flyer/embedded_p1_img6.png", "hero.png"),      # 3 valves together - PRV, Safety, Control
    ],
    "darling-muesco/safety-relief": [
        ("Darling_Muesco_Flyer/embedded_p1_img6.png", "hero.png"),      # Same group shot, safety valve visible
    ],
    "darling-muesco/robotrol": [
        ("Darling_Muesco_Flyer/embedded_p2_img9.png", "hero.png"),      # Control valve with rotork positioner
    ],
    "darling-muesco/prs-steam": [
        ("Darling_Muesco_Flyer/embedded_p2_img9.png", "hero.png"),      # Pressure reducing station
    ],
    "darling-muesco/multi-spring": [
        ("Darling_Muesco_Flyer/embedded_p2_img7.png", "hero.png"),      # 3 valves - piston, control, yellow
    ],
    "darling-muesco/piston": [
        ("Darling_Muesco_Flyer/embedded_p2_img7.png", "hero.png"),      # Blue piston valve visible
    ],
    "darling-muesco/desuperheater": [
        ("Darling_Muesco_Flyer/embedded_p2_img9.png", "hero.png"),      # Equipment image
    ],
    "darling-muesco/prv-gas": [
        ("Darling_Muesco_Flyer/embedded_p1_img6.png", "hero.png"),      # Valve image
    ],

    # IGEBA products - from Igeba_2
    "igeba/tf-34": [
        ("Igeba_2/embedded_p2_img3.jpeg", "hero.jpeg"),                 # Small indoor fogger
    ],
    "igeba/tf-35": [
        ("Igeba_2/embedded_p2_img5.jpeg", "hero.jpeg"),                 # Professional fogger
    ],
    "igeba/tfw-60": [
        ("Igeba_2/embedded_p2_img9.jpeg", "hero.jpeg"),                 # Water-based fogger with tank
    ],
    "igeba/tf-65": [
        ("Igeba_2/embedded_p2_img7.jpeg", "hero.jpeg"),                 # Mid-size fogger
    ],
    "igeba/tf-95": [
        ("Igeba_2/embedded_p2_img1.jpeg", "hero.jpeg"),                 # Large vehicle fogger
    ],
    "igeba/tf-160": [
        ("Igeba_2/embedded_p2_img11.jpeg", "hero.jpeg"),                # Heavy-duty vehicle fogger
    ],

    # Steam-Con products - from Pressure_Reducing_valve
    "steam-con/prv-100": [
        ("Pressure_Reducing_valve/embedded_p2_img20.jpeg", "hero.jpeg"),  # Steam-Con branded valve
    ],
    "steam-con/rcv-100": [
        ("Pressure_Reducing_valve/embedded_p2_img19.jpeg", "hero.jpeg"),  # Valve closeup
    ],
    "steam-con/pcv-100": [
        ("Pressure_Reducing_valve/embedded_p1_img13.jpeg", "hero.jpeg"),  # Valve cutaway
    ],
}

copied = 0
for product_path, images in image_map.items():
    prod_dir = os.path.join(products_dir, product_path)
    os.makedirs(prod_dir, exist_ok=True)
    
    for src_relative, dest_name in images:
        src = os.path.join(extracted, src_relative)
        dest = os.path.join(prod_dir, dest_name)
        
        if os.path.exists(src):
            shutil.copy2(src, dest)
            copied += 1
            print(f"  OK {product_path}/{dest_name} <- {src_relative}")
        else:
            print(f"  MISS Source missing: {src_relative}")

print(f"\nCopied {copied} real product images.")
