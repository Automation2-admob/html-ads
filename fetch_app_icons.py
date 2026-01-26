import os
import csv
import requests

# ────────────────────────────────────────────────
# Config
# ────────────────────────────────────────────────
CSV_FILE = "admob_apps_list.csv"
ASSETS_DIR = "assets"
SERPAPI_KEY = os.getenv("SERPAPI_KEY")

if not SERPAPI_KEY:
    raise ValueError("❌ SERPAPI_KEY is missing in GitHub secrets — add it to run this script")

os.makedirs(ASSETS_DIR, exist_ok=True)

# ────────────────────────────────────────────────
# Functions
# ────────────────────────────────────────────────
def fetch_app_icon(package_name):
    """
    Use SerpAPI to get app icon URL from Google Play, then download PNG.
    Returns path to saved file or None on failure.
    """
    try:
        # SerpAPI Google Play Product endpoint
        api_url = "https://serpapi.com/search.json"
        params = {
            "engine": "google_play_product",
            "product_id": package_name,
            "store": "apps",
            "api_key": SERPAPI_KEY
        }
        resp = requests.get(api_url, params=params)
        resp.raise_for_status()
        data = resp.json()
        
        # Extract thumbnail (icon URL)
        icon_url = data.get("thumbnail")
        if not icon_url:
            raise ValueError("No thumbnail found in API response")
        
        # Download PNG
        img_resp = requests.get(icon_url)
        img_resp.raise_for_status()
        
        # Save to assets/{package_name}.png
        save_path = os.path.join(ASSETS_DIR, f"{package_name}.png")
        with open(save_path, "wb") as f:
            f.write(img_resp.content)
        
        return save_path
    
    except Exception as e:
        print(f"   ❌ Failed for {package_name}: {str(e)}")
        return None

# ────────────────────────────────────────────────
# Main logic
# ────────────────────────────────────────────────
print("Starting app icons fetch from CSV...\n")

if not os.path.exists(CSV_FILE):
    raise FileNotFoundError(f"❌ {CSV_FILE} not found — run the apps list workflow first")

# Read CSV and process unique valid packages
processed = set()  # Track unique packages to avoid duplicates
success_count = 0
failed_packages = []

with open(CSV_FILE, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        package = row.get("package_name", "").strip()
        platform = row.get("platform", "").strip().upper()
        
        if package == "unknown" or platform != "ANDROID" or package in processed:
            continue  # Skip invalid or duplicates
        
        print(f"📱 Processing package: {package}")
        processed.add(package)
        
        saved_path = fetch_app_icon(package)
        if saved_path:
            print(f"   ✅ Saved icon: {saved_path}")
            success_count += 1
        else:
            failed_packages.append(package)

print("\n✅ Processing finished.")
print(f"Total unique valid packages processed: {len(processed)}")
print(f"Successful icons fetched: {success_count}")

if failed_packages:
    print(f"⚠️ {len(failed_packages)} package(s) failed:")
    for pkg in failed_packages:
        print(f"   - {pkg}")
else:
    print("All valid packages processed successfully!")
