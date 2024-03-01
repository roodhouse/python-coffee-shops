import requests

def process_image(image, place_id):
    response = requests.get(image, stream=True)
    if response.status_code == 200:
        with open(f"app/images/{place_id}.jpg", 'wb') as f:
            f.write(response.content)
        return f'app/images/{place_id}.jpg'
    else:
        print(f'Failed to download image: {response.status_code}')
        return None
