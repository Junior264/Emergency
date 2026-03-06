import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const personalImage = ({ label, name, onImageProcessed, icon }) => {
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setImage(reader.result);
                setIsEditing(true);
            };
        }
    };

    const onCropComplete = useCallback((_, pixels) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const showCroppedImage = async () => {
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = image;
        
        await new Promise(res => img.onload = res);

        canvas.width = 320;
        canvas.height = 320;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height,
            0, 0, 320, 320
        );

        canvas.toBlob((blob) => {
            const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
            setPreview(URL.createObjectURL(file));
            onImageProcessed(name, file);
            setIsEditing(false);
        }, 'image/jpeg');
    };

    return (
        <div className="flex flex-col w-full">
            <label className="mb-2 ml-1 text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
            
            <div className="relative flex items-center group bg-gray-50/50 border border-gray-200 rounded-2xl p-3">
                <input type="file" accept="image/*" onChange={onFileChange} className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                
                <div className="w-50 h-50 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex-shrink-0">
                    {preview ? <img src={preview} className="w-full h-full object-cover" /> : <img src={icon} className="w-5 h-5 opacity-20 m-auto mt-4" />}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-bold text-gray-700">{preview ? "Bild angepasst" : "Wähle dein gewünschtes Profilbild."}</p>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-5">
                    <div className="relative w-full max-w-[400px] h-[400px] bg-gray-800 rounded-3xl overflow-hidden">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="mt-8 flex gap-4 w-full max-w-[400px]">
                        <button onClick={() => setIsEditing(false)} className="flex-1 py-3 text-white font-bold opacity-50">Abbrechen</button>
                        <button onClick={showCroppedImage} className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg">Übernehmen</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default personalImage;