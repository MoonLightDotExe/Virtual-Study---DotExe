import requests
import os
from flask import Flask, jsonify
import subprocess  # For shell command execution

app = Flask(__name__)

# Replace with your actual team ID and developer key
TEAM_ID = "8a93102c-dcef-403a-84ff-21bebf37af1c"
DEV_KEY = "F2h3Noses4vIOdAfTKjPi4nD64GPVaRf77KcTz0nGieKJ2wQjEoxtxQo8obtNhsE"

@app.route('/get_audio_link_and_transcript/<recording_id>', methods=['GET'])
def get_audio_link_and_transcript(recording_id):
    url = f"https://api.digitalsamba.com/api/v1/recordings/{recording_id}/download"
    auth = requests.auth.HTTPBasicAuth(TEAM_ID, DEV_KEY)

    try:
        response = requests.get(url, auth=auth)
        response.raise_for_status()  # Raise exception for non-2xx status codes
        data = response.json()
        download_link = data.get("link")

        if not download_link:
            return jsonify({"error": "Download link not found in response"}), 400

        import wget  # Install with pip install wget
        filename = wget.download(download_link)
        audio_filepath = os.path.join(os.getcwd(), f"{recording_id}.mp4")

        transcript = extract_transcript_from_whisper(audio_filepath)
        if transcript:
            return jsonify({"transcript": transcript}), 200
        else:
            return jsonify({"error": "Error extracting transcript"}), 500

    except (requests.exceptions.RequestException, subprocess.CalledProcessError) as e:
        return jsonify({"error": f"Error processing request: {e}"}), 500

def extract_transcript_from_whisper(audio_file_path):
    try:
        process = subprocess.run(['whisper', audio_file_path, '--model', 'medium'], capture_output=True, text=True)
        if process.returncode != 0:
            raise ValueError("Whisper command failed with exit code {}".format(process.returncode))

        return process.stdout

    except subprocess.CalledProcessError as e:
        print(f"Error running whisper command: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True)
