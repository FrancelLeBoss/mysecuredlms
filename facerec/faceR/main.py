import cv2
from simple_facerec import SimpleFacerec

# Encodes faces from a folder
sfr = SimpleFacerec()

sfr.load_encoding_images(("images/"))


# chooses the camera
def choisir_camera():
    number_of_cameras = detect_cameras()
    if number_of_cameras == 1:
        return 1
    print(f"We have {number_of_cameras} cameras available.")
    while True:
        camera = input("Which one do you want to use ? : ")
        if camera.isdigit() and 1 <= int(camera) <= number_of_cameras:
            return int(camera)
        print("Invalid camera. Please try again.")


# Détection du nombre de caméras disponibles
def detect_cameras():
    num_cameras = 0
    for i in range(10):  # tries like 10 possible cameras
        cap = cv2.VideoCapture(i)
        if not cap.read()[0]:
            break
        num_cameras += 1
        cap.release()
    return num_cameras


# Function to take a new picture
import face_recognition


def capture_photo():
    # the user chooses the camera
    camera_choice = choisir_camera()
    cap = cv2.VideoCapture(camera_choice - 1)

    # check if the camera is open
    if not cap.isOpened():
        print("Error: impossible to open the camera")
        return None
    # Demander le nom de l'utilisateur
    user_name = input("Enter the name of the person that you want to capture: ")
    # Créer une fenêtre pour afficher la vidéo en temps réel
    cv2.namedWindow("Real-time Video")

    while True:
        # Lire la vidéo en temps réel
        ret, frame = cap.read()

        # Vérifier s'il y a un visage humain
        face_locations = face_recognition.face_locations(frame)

        if face_locations:
            loc, face_names = sfr.detect_known_faces(frame)
            for face_loc, name in zip(loc, face_names):
                Y1, X2, Y2, X1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]
                if name != "Unknown":
                    cv2.putText(
                        frame,
                        name,
                        (X1, Y1 - 10),
                        cv2.FONT_HERSHEY_DUPLEX,
                        1,
                        (0, 0, 0),
                    )
                else:
                    cv2.putText(
                        frame,
                        "Register a new user",
                        (X1, Y1 - 10),
                        cv2.FONT_HERSHEY_DUPLEX,
                        1,
                        (0, 0, 0),
                    )
                cv2.rectangle(frame, (X1, Y1), (X2, Y2), (14, 55, 168), 2)

        # Afficher la vidéo en temps réel
        cv2.imshow("Real-time Video", frame)

        # Vérifier si l'utilisateur souhaite prendre la photo ou appuyer sur Echap pour quitter
        key = cv2.waitKey(1)
        if key == ord("c"):
            break
        elif key == 27:  # 27 est le code ASCII pour la touche Echap
            cap.release()
            cv2.destroyWindow("Real-time Video")
            return None

    file_name = f"images/{user_name}.jpg"
    # Enregistrer la photo
    cv2.imwrite(file_name, frame)

    # Fermer la fenêtre de la vidéo
    cv2.destroyWindow("Real-time Video")

    # Libérer la caméra
    cap.release()

    print(f"The new image was added with the name '{file_name}'.")
    return file_name


def recognition_of_face():
    # use of the chosen camera
    camera_choice = choisir_camera()
    cap = cv2.VideoCapture(camera_choice - 1)

    while True:
        ret, frame = cap.read()
        # Detection of faces
        face_locations, face_names = sfr.detect_known_faces(frame)
        for face_loc, name in zip(face_locations, face_names):
            Y1, X2, Y2, X1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

            cv2.putText(
                frame, name, (X1, Y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 0, 0)
            )
            cv2.rectangle(frame, (X1, Y1), (X2, Y2), (14, 55, 168), 2)

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1)
        if key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()


c = recognition_of_face()
print(c)
# Utilisation de la fonction pour capturer une nouvelle photo
"""
captur = capture_photo()
if captur is not None:
    print(captur)"""
