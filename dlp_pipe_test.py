# dlp_pipe_test.py
import os
import requests

def main():
    api_token = os.environ['GOFILE_TOKEN']
    upload_url = 'https://upload.gofile.io/uploadfile'

    video_path = os.environ.get('DOWNLOAD_PATH')
    if not video_path or not os.path.isfile(video_path):
        raise ValueError(f"DOWNLOAD_PATH is not set or file does not exist: {video_path}")

    # Use the actual filename
    filename = os.path.basename(video_path)

    try:
        print(f'Uploading local file {video_path} to GoFile...')
        with open(video_path, 'rb') as f:
            files = {'file': (filename, f)}
            headers = {'Authorization': f'Bearer {api_token}'}
            response = requests.post(upload_url, headers=headers, files=files)

        print('Upload status code:', response.status_code)
        print('Response JSON:', response.json())
    except requests.RequestException as e:
        print('Error during upload:', e)

if __name__ == "__main__":
    main()
