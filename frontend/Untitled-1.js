
useEffect(() => {
    const sendDataToServer = async (dataURL) => {
        try {

            const formData = new FormData();
            formData.append('image_data', dataURL);
            formData.append('test', 'Adje wouah');

            const response = await fetch('facerec/realtimerecognition', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log({ result })

        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };
    // Envoyer les images en temps réel au serveur
    videoRef?.current?.addEventListener('play', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        setInterval(() => {
            if (!videoRef.current.paused && !videoRef.current.ended) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/jpeg');
                a = sendDataToServer(dataURL); // Fonction pour envoyer les données au serveur
                console.log({ a })
            }
        }, 10000); // Environ 30 images par seconde
    });
}, [videoRef, composant])