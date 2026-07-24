"""Extract images from image-only PDFs and save OCR-unfriendly info."""
import os
import json
import fitz  # PyMuPDF

EXTRACT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "catalogs_extracted")
IMAGE_OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "catalogs", "extracted_images")
os.makedirs(IMAGE_OUT_DIR, exist_ok=True)

# Files with no text (image-based PDFs)
image_pdfs = ["Darling Muesco Flyer.pdf", "Igeba (2).pdf", "Pressure Reducing valve.pdf"]

for fname in image_pdfs:
    fpath = os.path.join(EXTRACT_DIR, fname)
    if not os.path.exists(fpath):
        print(f"SKIP: {fname} not found")
        continue
    
    doc = fitz.open(fpath)
    base_name = os.path.splitext(fname)[0].replace(" ", "_").replace("(", "").replace(")", "")
    brand_dir = os.path.join(IMAGE_OUT_DIR, base_name)
    os.makedirs(brand_dir, exist_ok=True)
    
    print(f"\n=== {fname} ({doc.page_count} pages) ===")
    
    # Render each page as high-res image
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        # Render at 2x resolution for quality
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        img_path = os.path.join(brand_dir, f"page_{page_num + 1}.png")
        pix.save(img_path)
        print(f"  Saved page {page_num + 1} -> {img_path}")
    
    # Also extract embedded images
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        img_list = page.get_images(full=True)
        for img_idx, img_info in enumerate(img_list):
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            if base_image:
                ext = base_image["ext"]
                img_data = base_image["image"]
                img_path = os.path.join(brand_dir, f"embedded_p{page_num + 1}_img{img_idx + 1}.{ext}")
                with open(img_path, "wb") as f:
                    f.write(img_data)
                print(f"  Embedded image p{page_num + 1} #{img_idx + 1} ({base_image['width']}x{base_image['height']}) -> {img_path}")
    
    doc.close()

print("\nDone! All images extracted.")
