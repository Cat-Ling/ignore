import os
import requests

def main():
    api_token = os.environ['GOFILE_TOKEN']
    download_path = os.environ['DOWNLOAD_PATH']
    upload_url = 'https://upload-eu-par.gofile.io'

    with open(download_path, 'rb') as f:
        files = {'file': (os.path.basename(download_path), f)}
        headers = {'Authorization': f'Bearer {api_token}'}
        resp = requests.post(upload_url, headers=headers, files=files)
        print('Upload status code:', resp.status_code)
        print('Response JSON:', resp.json())

if __name__ == "__main__":
    main()
