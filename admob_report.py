import os
import csv
import requests

# ────────────────────────────────────────────────
# Accounts configuration (secrets loaded from GitHub Actions)
# ────────────────────────────────────────────────
accounts = [
    {
        "account_name": "MEDIA_TECH",
        "client_id": os.getenv("CLIENT_ID_MEDIA_TECH"),
        "client_secret": os.getenv("CLIENT_SECRET_MEDIA_TECH"),
        "refresh_token": os.getenv("REFRESH_TOKEN_MEDIA_TECH"),
        "publisher_id": "pub-2958488332734345"
    },
    {
        "account_name": "TOOL_APPS_HUB",
        "client_id": os.getenv("CLIENT_ID_TOOL_APPS_HUB"),
        "client_secret": os.getenv("CLIENT_SECRET_TOOL_APPS_HUB"),
        "refresh_token": os.getenv("REFRESH_TOKEN_TOOL_APPS_HUB"),
        "publisher_id": "pub-6407928727580827"
    },
    {
        "account_name": "EAGLE APPS",
        "client_id": os.getenv("CLIENT_ID_EAGLE_APPS"),
        "client_secret": os.getenv("CLIENT_SECRET_EAGLE_APPS"),
        "refresh_token": os.getenv("REFRESH_TOKEN_EAGLE_APPS"),
        "publisher_id": "pub-7686441346604913"
    },
    {
        "account_name": "8th Generation Apps",
        "client_id": os.getenv("CLIENT_ID_8TH_GENERATION_APPS"),
        "client_secret": os.getenv("CLIENT_SECRET_8TH_GENERATION_APPS"),
        "refresh_token": os.getenv("REFRESH_TOKEN_8TH_GENERATION_APPS"),
        "publisher_id": "pub-3866251076647448"
    },
    {
        "account_name": "Apps Resort - Daily Tool Apps",
        "client_id": os.getenv("CLIENT_ID_APPS_RESORT_DAILY_TOOL_APPS"),
        "client_secret": os.getenv("CLIENT_SECRET_APPS_RESORT_DAILY_TOOL_APPS"),
        "refresh_token": os.getenv("REFRESH_TOKEN_APPS_RESORT_DAILY_TOOL_APPS"),
        "publisher_id": "pub-4019558876287623"
    },
    {
        "account_name": "Hi_Shot_Inc",
        "client_id": os.getenv("CLIENT_ID_HI_SHOT_INC"),
        "client_secret": os.getenv("CLIENT_SECRET_HI_SHOT_INC"),
        "refresh_token": os.getenv("REFRESH_TOKEN_HI_SHOT_INC"),
        "publisher_id": "pub-2452448243939955"
    },
    {
        "account_name": "Quantam Leaps",
        "client_id": os.getenv("CLIENT_ID_QUANTAM_LEAPS"),
        "client_secret": os.getenv("CLIENT_SECRET_QUANTAM_LEAPS"),
        "refresh_token": os.getenv("REFRESH_TOKEN_QUANTAM_LEAPS"),
        "publisher_id": "pub-7849136466938181"
    },
    {
        "account_name": "App X Tech",
        "client_id": os.getenv("CLIENT_ID_APP_X_TECH"),
        "client_secret": os.getenv("CLIENT_SECRET_APP_X_TECH"),
        "refresh_token": os.getenv("REFRESH_TOKEN_APP_X_TECH"),
        "publisher_id": "pub-7080621613847710"
    },
    {
        "account_name": "Emerging Games Studio",
        "client_id": os.getenv("CLIENT_ID_EMERGING_GAMES_STUDIO"),
        "client_secret": os.getenv("CLIENT_SECRET_EMERGING_GAMES_STUDIO"),
        "refresh_token": os.getenv("REFRESH_TOKEN_EMERGING_GAMES_STUDIO"),
        "publisher_id": "pub-6150500487425428"
    },
    {
        "account_name": "Maritime Simulation Games",
        "client_id": os.getenv("CLIENT_ID_MARITIME_SIMULATION_GAMES"),
        "client_secret": os.getenv("CLIENT_SECRET_MARITIME_SIMULATION_GAMES"),
        "refresh_token": os.getenv("REFRESH_TOKEN_MARITIME_SIMULATION_GAMES"),
        "publisher_id": "pub-4868878983551188"
    },
    {
        "account_name": "Funsol Gaming Lab",
        "client_id": os.getenv("CLIENT_ID_FUNSOL_GAMING_LAB"),
        "client_secret": os.getenv("CLIENT_SECRET_FUNSOL_GAMING_LAB"),
        "refresh_token": os.getenv("REFRESH_TOKEN_FUNSOL_GAMING_LAB"),
        "publisher_id": "pub-4813805900272378"
    },
    {
        "account_name": "Gaming Stars",
        "client_id": os.getenv("CLIENT_ID_GAMING_STARS"),
        "client_secret": os.getenv("CLIENT_SECRET_GAMING_STARS"),
        "refresh_token": os.getenv("REFRESH_TOKEN_GAMING_STARS"),
        "publisher_id": "pub-3822444073990093"
    }
]

def get_access_token(client_id, client_secret, refresh_token):
    try:
        response = requests.post(
            'https://oauth2.googleapis.com/token',
            data={
                'client_id': client_id,
                'client_secret': client_secret,
                'refresh_token': refresh_token,
                'grant_type': 'refresh_token',
            }
        )
        response.raise_for_status()
        return response.json()['access_token']
    except requests.exceptions.HTTPError as e:
        print("❌ Failed to get access token:")
        print(f"   Status: {e.response.status_code}")
        print(f"   Response: {e.response.text}")
        raise

def get_apps_list(publisher_id, access_token):
    url = f"https://admob.googleapis.com/v1/accounts/{publisher_id}/apps"
    headers = {"Authorization": f"Bearer {access_token}"}
    apps = []
    page_count = 0

    while url:
        page_count += 1
        resp = requests.get(url, headers=headers).json()
        if 'error' in resp:
            raise Exception(f"API error: {resp.get('error', {}).get('message', 'Unknown error')}")

        for app in resp.get("apps", []):
            linked = app.get("linkedAppInfo", {})
            manual = app.get("manualAppInfo", {})
            apps.append({
                "app_id": app.get("appId", "unknown"),
                "app_name": linked.get("displayName") or manual.get("displayName", "unknown"),
                "package_name": linked.get("appStoreId", "unknown"),
                "platform": app.get("platform", "unknown")
            })

        next_page = resp.get("nextPageToken")
        url = f"https://admob.googleapis.com/v1/accounts/{publisher_id}/apps?pageToken={next_page}" if next_page else None

    print(f"   → Fetched {len(apps)} apps ({page_count} page(s))")
    return apps

def save_to_csv(all_data, filename="admob_apps_list.csv"):
    if not all_data:
        print("⚠️ No apps fetched from any account → CSV not created/overwritten")
        return

    headers = ["account_name", "publisher_id", "app_id", "app_name", "package_name", "platform"]

    # "w" = always overwrite → previous data removed, only latest successful data kept
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for row in all_data:
            writer.writerow(row)

    print(f"✅ Successfully overwrote {filename} with {len(all_data)} rows from successful accounts")

# ────────────────────────────────────────────────
# Main logic — process every account independently
# ────────────────────────────────────────────────
all_apps = []
failed_accounts = []

print("Starting AdMob apps fetch...\n")

for acc in accounts:
    name = acc["account_name"]
    print(f"📊 Processing: {name}")

    try:
        # Early check for missing credentials
        if not acc["client_id"]:
            raise ValueError("CLIENT_ID is missing/empty in secrets")
        if not acc["client_secret"]:
            raise ValueError("CLIENT_SECRET is missing/empty in secrets")
        if not acc["refresh_token"]:
            raise ValueError("REFRESH_TOKEN is missing or empty in secrets")

        token = get_access_token(
            acc["client_id"],
            acc["client_secret"],
            acc["refresh_token"]
        )

        apps = get_apps_list(acc["publisher_id"], token)

        for app in apps:
            all_apps.append({
                "account_name": name,
                "publisher_id": acc["publisher_id"],
                "app_id": app["app_id"],
                "app_name": app["app_name"],
                "package_name": app["package_name"],
                "platform": app["platform"]
            })

        print(f"✅ Success: {name} ({len(apps)} apps fetched)")

    except Exception as e:
        print(f"❌ Failed: {name}")
        print(f"   → {str(e)}")
        failed_accounts.append(name)

# Save result (always overwrites)
save_to_csv(all_apps)

print("\n✅ Processing finished.")
if failed_accounts:
    print(f"⚠️ {len(failed_accounts)} account(s) failed:")
    for acc in failed_accounts:
        print(f"   - {acc}")
else:
    print("All accounts processed successfully!")

if all_apps:
    print(f"Total apps saved: {len(all_apps)}")
else:
    print("No apps were fetched.")
