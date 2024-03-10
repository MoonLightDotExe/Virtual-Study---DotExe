import requests
import os
from flask import Flask, jsonify
import subprocess  # For shell command execution

app = Flask(__name__)

# Replace with your actual team ID and developer key
TEAM_ID = "8a93102c-dcef-403a-84ff-21bebf37af1c"
DEV_KEY = "F2h3Noses4vIOdAfTKjPi4nD64GPVaRf77KcTz0nGieKJ2wQjEoxtxQo8obtNhsE"

@app.route('/get_audio_link_and_run_whisper/<recording_id>', methods=['GET'])
def get_audio_link_and_run_whisper(recording_id):
    print('123')
    url = f"https://api.digitalsamba.com/api/v1/recordings/{recording_id}/download"
    auth = requests.auth.HTTPBasicAuth(TEAM_ID, DEV_KEY)

    try:
        response = requests.get(url, auth=auth)
        response.raise_for_status()  # Raise exception for non-2xx status codes
        data = response.json()
        download_link = data.get("link")

        if not download_link:
            return jsonify({"error": "Download link not found in response"}), 400

        # Download the audio file using a reliable library like wget
        import wget  # Install with pip install wget
        filename = wget.download(download_link)
        audio_filepath = os.path.join(os.getcwd(), f"{recording_id}.mp4")  # Use os.getcwd() for current directory
        print("AUDIO DOWNL" + audio_filepath) # Print
        # Execute the whisper command on the downloaded file
        try:
            process = subprocess.run(['whisper', audio_filepath, '--model', 'medium'])
            if process.returncode != 0:
                return jsonify({"error": f"Whisper command failed (exit code {process.returncode})"}), 500
            return jsonify({"message": "Download and whisper command successful"}), 200
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Error running whisper command: {e}"}), 500

    except requests.exceptions.RequestException as e:
        print(f"Error getting download link: {e}")
        return jsonify({"error": "Failed to retrieve download link"}), 500

if __name__ == '__main__':
    app.run(debug=True)