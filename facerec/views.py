from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.base import ContentFile
import io
import base64
from PIL import Image, ImageDraw
from io import BytesIO
import cv2
from .simple_facerec import SimpleFacerec
import face_recognition

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


class RealTimeRecognition(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        print("Hahaha")

    def post(self, request, format=None):
        try:
            # Retrieve the image sent from the frontend
            base64_image_data = request.data["image_data"]

            if not base64_image_data:
                return JsonResponse(
                    {"error": "No image data provided"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            image_data = base64.b64decode(base64_image_data)
            image = Image.open(io.BytesIO(image_data)).convert("RGB")
            # Convert the image to RGB format
            rgb_image = image.convert("RGB")
            # Load a sample image with faces (provide the correct path)
            known_image = face_recognition.load_image_file("images/francel.jpg")
            print(
                f"base64_image_data: {base64_image_data[:50]}"
            )  # Print the first 50 characters of the data
            print(f"image_data: {image_data[:50]}")
            face_locations = face_recognition.face_locations(known_image)
            face_encodings = face_recognition.face_encodings(
                known_image, face_locations
            )

            # Save the modified image with rectangles around the faces
            rgb_image.save("output_image.jpg")

            result = "tata"
            return JsonResponse(
                {"result": result}, status=status.HTTP_200_OK, safe=False
            )

        except Exception as e:
            # Log the error for debugging
            print(f"Error processing image: {e}")

            # Return an error response
            return JsonResponse(
                {"error": "Failed to process the image"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


"""class CapturePhoto(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        # the user chooses the camera
        camera_choice = choisir_camera()
        cap = cv2.VideoCapture(camera_choice - 1)

        # check if the camera is open
        if not cap.isOpened():
            # print("Error: impossible to open the camera")
            return Response(
                {"Camera not found": "We cannot find any Camera on your divice"},
                status=status.HTTP_404_NOT_FOUND,
            )
        # recuperer le nom de l'utilisateur
        user_name = request.GET.get("user_name")
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

        return JsonResponse(file_name, status=status.HTTP_200_OK)"""


def recognition_of_face(request):
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


# Create your views here.
def main(request):
    return HttpResponse("Face recognition")


"""

class AddNewUser(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data = {"code": self.request.session.get("room_code")}

        return JsonResponse(data, status=status.HTTP_200_OK)
"""
