import face_recognition
import cv2
import numpy as np
import os
import json
from datetime import datetime
import sys
import csv
import time

# Arguments
cls = sys.argv[1] if len(sys.argv) > 1 else "10"
section = sys.argv[2] if len(sys.argv) > 2 else "A"
date_str = sys.argv[3] if len(sys.argv) > 3 else datetime.today().strftime("%Y-%m-%d")

# Directories
known_faces_dir = "backend/known_faces"
attendance_dir = "backend/attendance_records"
os.makedirs(attendance_dir, exist_ok=True)
csv_file = os.path.join(attendance_dir, f"attendance_{cls}_{section}_{date_str}.csv")

# Load known faces
known_encodings = []
regNos = []
for file in os.listdir(known_faces_dir):
    if file.endswith(".jpg") or file.endswith(".png"):
        regNo = os.path.splitext(file)[0]
        image = face_recognition.load_image_file(os.path.join(known_faces_dir, file))
        encoding = face_recognition.face_encodings(image)
        if encoding:
            known_encodings.append(encoding[0])
            regNos.append(regNo)

# Initialize attendance (all absent)
attendance = [{"name": r, "regNo": r, "status": "absent", "timeMarked": "-"} for r in regNos]

# --- Open webcam and run recognition for 60 seconds ---
video_capture = cv2.VideoCapture(0)
start_time = time.time()
duration = 60  # seconds
process_frame = True

try:
    while time.time() - start_time < duration:
        ret, frame = video_capture.read()
        if not ret:
            continue

        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]

        if process_frame:
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(known_encodings, face_encoding)
                face_distances = face_recognition.face_distance(known_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    regNo = regNos[best_match_index]
                    for a in attendance:
                        if a["regNo"] == regNo and a["status"] == "absent":
                            a["status"] = "present"
                            a["timeMarked"] = datetime.now().strftime("%H:%M")
        process_frame = not process_frame

finally:
    video_capture.release()
    cv2.destroyAllWindows()

# Save CSV
with open(csv_file, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "regNo", "status", "timeMarked"])
    writer.writeheader()
    for a in attendance:
        writer.writerow(a)

# Return JSON
print(json.dumps(attendance))
