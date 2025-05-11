# mongodb/main.py

from mongodb import db
from mongodb.gridfs_handler import upload_image  # Make sure this exists

def insert_politician():
    collection = db["politicians"]

    # Upload the image using GridFS
    image_id = upload_image("images/maria_cruz.jpg", filename="maria_cruz.jpg")

    politician_data = {
        "Politician_Name": "Maria Cruz",
        "Position": "Representative",
        "Party": "Progressive Alliance",
        "Location": "Quezon City, Philippines",
        "Values": ["Transparency", "Public Service", "Sustainability"],
        "Credentials": {
            "Education": "University of the Philippines – Political Science",
            "Experience": "Former councilor, 12 years in public service",
            "Certifications": ["Leadership in Governance", "Public Administration"]
        },
        "SocialMedia": {
            "Facebook": "https://facebook.com/mariacruzph",
            "Twitter": "https://twitter.com/mariacruzph",
            "Instagram": "https://instagram.com/mariacruzph",
            "LinkedIn": "https://linkedin.com/in/mariacruz"
        },
        "ContactInfo": {
            "Email": "maria.cruz@congress.gov.ph",
            "Phone": "+63 912 345 6789",
            "Office": "Room 204, House of Representatives, Batasan Hills"
        },
        "Achievements": [
            "Authored the Clean Water Act",
            "Initiated scholarship programs for 5000+ students",
            "Recognized as Legislator of the Year (2022)"
        ],
        "VotingHistory": [
            {"Bill": "Universal Healthcare Act", "Vote": "Yes", "Date": "2019-02-20"},
            {"Bill": "Anti-Terrorism Act", "Vote": "No", "Date": "2020-07-03"},
        ],
        "BillSponsorships": [
            {"Title": "Sustainable Transportation Act", "Year": 2023},
            {"Title": "Open Government Data Act", "Year": 2024}
        ],
        "NewsArticles": [
            {
                "Title": "Maria Cruz pushes for environmental reforms",
                "URL": "https://news.ph/politics/maria-cruz-green-laws",
                "Date": "2023-08-15"
            },
            {
                "Title": "House passes bill sponsored by Rep. Cruz",
                "URL": "https://inquirer.net/bills/cruz-bill-passed",
                "Date": "2024-03-09"
            }
        ],
        "Image_ID": str(image_id)  # GridFS ObjectId as a string
    }

    result = collection.insert_one(politician_data)
    print(f"✅ Inserted Politician with image: {result.inserted_id}")

if __name__ == "__main__":
    insert_politician()
