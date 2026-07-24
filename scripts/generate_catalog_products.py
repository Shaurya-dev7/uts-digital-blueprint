import json
import os

products = []

def add_product(sku, name, short_desc, brand, cats, inds, apps, status, img, has_specs, doc=None, long_desc=None, features=None):
    p = {
        "id": sku,
        "slug": name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('.', ''),
        "name": name,
        "shortDescription": short_desc,
        "brandSlug": brand,
        "categorySlugs": cats,
        "industrySlugs": inds,
        "applicationSlugs": apps,
        "statuses": [status] if status else [],
        "images": [{"url": img, "alt": name, "isHero": True}] if img else [],
        "specifications": has_specs,
        "features": features or [],
        "downloads": [doc] if doc else []
    }
    if long_desc:
        p["longDescription"] = long_desc
    products.append(p)

# Chembond
chembond_docs = {
    "Kem Proof CWC": {"id": "doc-ch-001", "url": "/catalogs/chembond/Kem-Proof-CWC-V2.pdf", "type": "Datasheet", "title": "KEM Proof CWC Datasheet", "fileSize": "29 KB"},
    "Kem Proof PWC (White)": {"id": "doc-ch-002", "url": "/catalogs/chembond/Kem Proof PWC (White).pdf", "type": "Datasheet", "title": "KEM Proof PWC Datasheet", "fileSize": "39 KB"},
    "Kem Sealer PAV": {"id": "doc-ch-003", "url": "/catalogs/chembond/Kem Sealer PAV.pdf", "type": "Datasheet", "title": "KEM Sealer PAV Datasheet", "fileSize": "28 KB"},
    "Kem Proof IWC": {"id": "doc-ch-004", "url": "/catalogs/chembond/Kemproof IWC.pdf", "type": "Datasheet", "title": "KEM Proof IWC Datasheet", "fileSize": "34 KB"}
}

add_product("UTS-CH-001", "KEM Proof CWC", "Crystalline Waterproofing compound", "chembond", ["construction-chemicals", "waterproofing"], ["construction", "infrastructure"], ["basements", "tunnels", "water-treatment"], "Featured", "/products/chembond/kem-proof-cwc/hero.png", [{"name": "Appearance", "value": "Grey powder"}, {"name": "Penetration", "value": "2mm per week"}], chembond_docs["Kem Proof CWC"], "Integral capillary concrete waterproofing compound which waterproofs and protects concrete in depth. Consists of Portland cement, specially treated quartz sand and specialty chemicals.", ["Penetrates deeply and seals concrete capillary tracts", "Applicable for positive or negative side pressure", "Effective under high hydrostatic Pressure"])

add_product("UTS-CH-002", "KEM Proof PWC (White)", "Polymer modified cement based water proof coating", "chembond", ["construction-chemicals", "waterproofing", "coatings"], ["construction", "infrastructure"], ["waterproofing", "crack-repair"], "Popular", "/products/chembond/kem-proof-pwc/hero.png", [{"name": "Colour", "value": "Milky white"}, {"name": "Specific Gravity", "value": "1.02"}], chembond_docs["Kem Proof PWC (White)"], "Polymeric compound made from selected synthetic copolymers. Provides a complete repair as well as waterproof barrier coating to RCC and steel structures.", ["Excellent adhesion to most building substrates", "Allows breathing thus preventing peeling and scaling", "Resists carbonation effect"])

add_product("UTS-CH-003", "KEM Sealer PAV", "Masonry and concrete block sealer", "chembond", ["construction-chemicals", "sealers"], ["construction"], ["concrete-sealing"], "Best Seller", "/products/chembond/kem-sealer-pav/hero.png", [{"name": "Specific Gravity", "value": "0.85"}, {"name": "Flash Point", "value": "> 250 C"}], chembond_docs["Kem Sealer PAV"], "Colourless coating, which is quick drying. It penetrates into the pores of the substrate under treatment to bind the particles together in tough resilient, abrasion-resistant enamel.", ["Prevention of water borne dirt", "Binds together friable surfaces"])

add_product("UTS-CH-004", "KEM Proof IWC", "Liquid integral Water Proofing compound", "chembond", ["construction-chemicals", "waterproofing"], ["construction", "infrastructure"], ["basements", "swimming-pools"], "New", "/products/chembond/kem-proof-iwc/hero.png", [{"name": "Appearance", "value": "Dark brown liquid"}, {"name": "Specific Gravity", "value": "1.08"}], chembond_docs["Kem Proof IWC"], "Integral waterproofing compound for addition to cement-based mortars and concrete.", ["Improves workability of the concrete", "Reduces transmissibility and porosity", "Produces cohesive mix and reduce segregation"])

# Darling Muesco
dm_doc = {"id": "doc-dm-001", "url": "/catalogs/darling-muesco/Darling Muesco Flyer.pdf", "type": "Flyer", "title": "Darling Muesco Product Range Flyer", "fileSize": "3 MB"}
add_product("UTS-DM-001", "Pressure Reducing Valve - Steam", "High performance steam pressure reducing valve", "darling-muesco", ["valves", "pressure-control"], ["power-generation", "manufacturing"], ["steam-control"], "Featured", "/products/darling-muesco/prv-steam/hero.png", [], dm_doc)
add_product("UTS-DM-002", "Safety Relief Valve", "Industrial safety relief valve for critical applications", "darling-muesco", ["valves", "safety"], ["oil-and-gas", "chemical"], ["overpressure-protection"], "Best Seller", "/products/darling-muesco/safety-relief/hero.png", [], dm_doc)
add_product("UTS-DM-003", "Robotrol Operated Pneumatic Control Valve", "Precision pneumatic control valve", "darling-muesco", ["valves", "control-valves"], ["manufacturing", "chemical"], ["process-control"], "Popular", "/products/darling-muesco/robotrol/hero.png", [], dm_doc)
add_product("UTS-DM-004", "Pressure Reducing Station - Steam", "Complete steam pressure reduction station", "darling-muesco", ["systems", "pressure-control"], ["power-generation"], ["steam-control"], "New", "/products/darling-muesco/prs-steam/hero.png", [], dm_doc)
add_product("UTS-DM-005", "Multi Spring Actuator Control Valve", "Advanced actuator control valve", "darling-muesco", ["valves", "control-valves", "actuators"], ["manufacturing", "chemical"], ["process-control"], "", "/products/darling-muesco/multi-spring/hero.png", [], dm_doc)
add_product("UTS-DM-006", "Piston Valve", "Robust piston valve for various media", "darling-muesco", ["valves", "isolation-valves"], ["power-generation", "manufacturing"], ["isolation"], "In Stock", "/products/darling-muesco/piston/hero.png", [], dm_doc)
add_product("UTS-DM-007", "De-Superheater", "Temperature reduction equipment for superheated steam", "darling-muesco", ["equipment", "temperature-control"], ["power-generation"], ["steam-conditioning"], "On Request", "/products/darling-muesco/desuperheater/hero.png", [], dm_doc)
add_product("UTS-DM-008", "Pilot Operated Pressure Reducing Valve - Gas", "Gas pressure reducing valve", "darling-muesco", ["valves", "pressure-control"], ["oil-and-gas", "chemical"], ["gas-control"], "Imported", "/products/darling-muesco/prv-gas/hero.png", [], dm_doc)

# IGEBA
igeba_doc = {"id": "doc-ig-001", "url": "/catalogs/igeba/Igeba (2).pdf", "type": "Catalog", "title": "IGEBA Thermal Foggers Catalog", "fileSize": "1.6 MB"}
add_product("UTS-IG-001", "IGEBA TF 34", "Indoor Thermal Fogger", "igeba", ["pest-control", "equipment"], ["agriculture", "public-health", "food-beverage"], ["indoor-fogging"], "Featured", "/products/igeba/tf-34/hero.png", [], igeba_doc)
add_product("UTS-IG-002", "IGEBA TF 35", "Professional Thermal Fogger", "igeba", ["pest-control", "equipment"], ["agriculture", "public-health"], ["outdoor-fogging", "greenhouses"], "Best Seller", "/products/igeba/tf-35/hero.png", [], igeba_doc)
add_product("UTS-IG-003", "IGEBA TF-W 60", "Water-Based Thermal Fogger", "igeba", ["pest-control", "equipment"], ["agriculture", "public-health"], ["water-based-fogging"], "Popular", "/products/igeba/tfw-60/hero.png", [], igeba_doc)
add_product("UTS-IG-004", "IGEBA TF 65", "Portable Thermal Fogger", "igeba", ["pest-control", "equipment"], ["agriculture", "public-health"], ["general-fogging"], "", "/products/igeba/tf-65/hero.png", [], igeba_doc)
add_product("UTS-IG-005", "IGEBA TF 95", "Vehicle-Mounted Thermal Fogger", "igeba", ["pest-control", "equipment"], ["agriculture", "public-health"], ["large-scale-fogging"], "Made in India", "/products/igeba/tf-95/hero.png", [], igeba_doc)
add_product("UTS-IG-006", "IGEBA TF 160", "Heavy-Duty Vehicle Fogger", "igeba", ["pest-control", "equipment"], ["agriculture", "public-health"], ["large-scale-fogging", "municipal"], "Imported", "/products/igeba/tf-160/hero.png", [], igeba_doc)

# Steam-Con
steamcon_doc = {"id": "doc-st-001", "url": "/catalogs/steam-con/Pressure Reducing valve.pdf", "type": "Catalog", "title": "Steam-Con Pressure Reducing Valves", "fileSize": "1.4 MB"}
add_product("UTS-ST-001", "PRV-100 Series", "Self Actuating Mechanical Pressure Reducing Valve", "steam-con", ["valves", "pressure-control"], ["power-generation", "chemical"], ["steam-control"], "Featured", "/products/steam-con/prv-100/hero.png", [], steamcon_doc)
add_product("UTS-ST-002", "RCV-100 Series", "Roboter Operated Pressure Reducing Valve", "steam-con", ["valves", "pressure-control", "control-valves"], ["power-generation", "chemical"], ["automated-pressure-control"], "Popular", "/products/steam-con/rcv-100/hero.png", [], steamcon_doc)
add_product("UTS-ST-003", "PCV-100 Series", "Pneumatic / Motorized Operated Pressure Reducing Valve", "steam-con", ["valves", "pressure-control", "actuators"], ["power-generation", "chemical"], ["process-control"], "New", "/products/steam-con/pcv-100/hero.png", [], steamcon_doc)

output = f"""import {{ Product }} from '../types/catalog';

export const catalogProducts: Product[] = {json.dumps(products, indent=2)};
"""

with open(r'd:\Projects\UTS\src\data\catalogProducts.ts', 'w') as f:
    f.write(output)
print("catalogProducts.ts generated.")
