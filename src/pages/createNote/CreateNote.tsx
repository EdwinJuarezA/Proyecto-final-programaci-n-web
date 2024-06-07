import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { Router, useHistory } from 'react-router-dom';
import axios from 'axios';
import './CreateNote.css'; 

const CreateNote: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ubication, setUbication] = useState('');
    const [status, setStatus] = useState(1); 
    const [category, setCategory] = useState('');
    const [images, setImages] = useState<FileList | null>(null);

    const history = useHistory();

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ubication', ubication);
        formData.append('status', status.toString());
        formData.append('category_id', category);
    
        if (images) {
            Array.from(images).forEach((image) => {
                formData.append('images[]', image);
            });
        }
    
        console.log('Datos enviados:', Array.from(formData.entries()));
    
        try {
            const response = await axios.post('/notes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token esté presente
                },
            });
            console.log('Nota creada:', response.data);
            history.push('/home'); 
        } catch (error) {
            console.error('Error creando la nota:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Crear Nota</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="note-card">
                    <IonCardHeader style={{margin:"5%"}}>
                        <IonCardTitle>Nueva Nota</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem className="note-item">
                            <IonInput
                                label="Titulo"
                                labelPlacement="floating"
                                value={title}
                                onIonChange={(e) => setTitle(e.detail.value!)}
                                placeholder="Ingrese el título"
                                fill="solid"
                            />
                        </IonItem>
                        <IonItem className="note-item">
                            <IonTextarea
                                label="Descripción"
                                labelPlacement="floating"
                                value={description}
                                onIonChange={(e) => setDescription(e.detail.value!)}
                                placeholder="Ingrese la descripción"
                                fill="solid"
                            />
                        </IonItem>
                        <IonItem className="note-item">
                            <IonInput
                                label="Ubicación"
                                labelPlacement="floating"
                                value={ubication}
                                onIonChange={(e) => setUbication(e.detail.value!)}
                                placeholder="Ingrese la ubicación"
                                fill="solid"
                            />
                        </IonItem>
                        <IonItem className="note-item">
                            <IonLabel>Status</IonLabel>
                            <IonSelect
                                value={status}
                                onIonChange={(e) => setStatus(e.detail.value!)}
                            >
                                <IonSelectOption value={1}>Activo</IonSelectOption>
                                <IonSelectOption value={0}>Inactivo</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className="note-item">
                            <IonLabel>Categoría</IonLabel>
                            <IonSelect
                                value={category}
                                onIonChange={(e) => setCategory(e.detail.value!)}
                            >
                                <IonSelectOption value="1">Incendio</IonSelectOption>
                                <IonSelectOption value="2">Derrumbe</IonSelectOption>
                                <IonSelectOption value="3">Inundacion</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem >
                            <IonLabel>Imágenes</IonLabel>
                        </IonItem>
                        <IonItem>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setImages(e.target.files)}
                            />
                        </IonItem>
                        <IonButton style={{margin:"5%"}} color="success" expand="block" onClick={handleSubmit}>
                            Crear Nota
                        </IonButton>
                        <IonButton style={{margin:"5%"}} color="tertiary" expand="block" href='/home'>
                            Cancelar
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default CreateNote;
