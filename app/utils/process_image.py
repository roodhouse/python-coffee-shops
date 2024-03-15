import requests
import os
import uuid
from werkzeug.utils import secure_filename

def process_image(image, id, type):
    # define base dir for saving images
    base_dir = 'app/images'
    # make sure the directory exists for venues and users
    os.makedirs(os.path.join(base_dir, 'venues'), exist_ok=True)
    os.makedirs(os.path.join(base_dir, 'users'), exist_ok=True)

    if type == 'venue':
        # handle as url for venues
        response = requests.get(image, stream=True)
        if response.status_code == 200:
            filepath = os.path.join(base_dir, 'venues', f'{id}.jpg')
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=128):
                    f.write(chunk)
                return f'http://127.0.0.1:5000/{filepath}'
        else:
            print(f'Failed to download image: {response.status_code}')
            return None
    elif type == 'user':
        print(f'image is: {image}')
        # handle as file upload for users
        if hasattr(image, 'filename'):
            secure_filename(image.filename)
            filepath = os.path.join(base_dir, 'users', f'{id}_{uuid.uuid4().hex}.jpg')
            image.save(filepath)
            return f'http://127.0.0.1:5000/{filepath}'
        else:
            print("Image file for user is not a valid FileStorage object.")
            return None
        