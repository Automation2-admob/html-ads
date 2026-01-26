import os
import csv
import requests
from bs4 import BeautifulSoup  # We'll add this dependency

# ────────────────────────────────────────────────
# Config
# ────────────────────────────────────────────────
CSV_FILE = "admob_apps_list.csv"
ASSETS_DIR = "assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# ────────────────────────────────────────────────
# Functions
# ────────────────────────────────────────────────
def fetch_app_icon(package_name):
    """
    Fetch Play Store page → extract og:image meta tag → download PNG.
    Returns saved path or None.
    """
    try:
        url = f"https://play.google.com/store/apps/details?id={package_name}&hl=en_US"
        resp = requests.get(url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
        
        soup = BeautifulSoup(resp.text, "html.parser")
        meta_tag = soup.find("meta", property="og:image")
        
        if not meta_tag or "content" not in meta_tag.attrs:
            raise ValueError("No og:image meta tag found")
        
        icon_url = meta_tag["content"]
        # Clean up size param if present (get higher res)
        if "=w" in icon_url:
            icon_url = icon_url.split("=w")[0] + "=w512"  # Force 512x512
        
        img_resp = requests.get(icon_url, headers=HEADERS, timeout=10)
        img_resp.raise_for_status()
        
        save_path = os.path.join(ASSETS_DIR, f"{package_name}.png")
        with open(save_path, "wb") as f:
            f.write(img_resp.content)
        
        return save_path
    
    except Exception as e:
        print(f"   ❌ Failed for {package_name}: {str(e)}")
        return None

# ────────────────────────────────────────────────
# Main
# ────────────────────────────────────────────────
print("Starting app icons fetch from CSV...\n")

if not os.path.exists(CSV_FILE):
    raise FileNotFoundError(f"❌ {CSV_FILE} not found — run the apps list workflow first")

processed = set()
success_count = 0
failed_packages = []

with open(CSV_FILE, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        package = row.get("package_name", "").strip()
        platform = row.get("platform", "").strip().upper()
        
        if package == "unknown" or platform != "ANDROID" or package in processed:
            continue
        
        print(f"📱 Processing package: {package}")
        processed.add(package)
        
        saved_path = fetch_app_icon(package)
        if saved_path:
            print(f"   ✅ Saved: {saved_path}")
            success_count += 1
        else:
            failed_packages.append(package)

print("\n✅ Finished.")
print(f"Processed unique packages: {len(processed)}")
print(f"Successful icons: {success_count}")

if failed_packages:
    print(f"⚠️ Failed packages ({len(failed_packages)}):")
    for pkg in failed_packages:
        print(f"   - {pkg}")
else:
    print("All valid packages fetched successfully!")
