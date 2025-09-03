# dlp_pipe_test.py
import os
import requests
import yt_dlp

def main():
    api_token = os.environ['GOFILE_TOKEN']
    upload_url = 'https://upload.gofile.io/uploadfile'
    video_link = os.environ['VIDEO_LINK']
    downloader = os.environ['DOWNLOADER']
    proxy_enabled = os.environ['PROXY'] == 'true'
    proxy_url = 'http://127.0.0.1:1080' if proxy_enabled else None

    ydl_opts = {
        'format': 'best',
        'noprogress': True,
        'quiet': True,
    }

    if downloader in ['ffmpeg', 'aria2c']:
        ydl_opts['downloader'] = downloader
    if proxy_url:
        ydl_opts['proxy'] = proxy_url

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        print(f'Starting streaming download for {video_link}')
        info = ydl.extract_info(video_link, download=False)
        video_url = info['url']

        with requests.get(video_url, stream=True) as r:
            r.raise_for_status()
            files = {'file': (info.get('title', 'video') + '.' + info.get('ext', 'mp4'), r.raw)}
            headers = {'Authorization': f'Bearer {api_token}'}
            resp = requests.post(upload_url, headers=headers, files=files)
            print('Upload status code:', resp.status_code)
            print('Response JSON:', resp.json())

if __name__ == "__main__":
    main()
