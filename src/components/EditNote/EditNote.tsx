import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import axios from 'axios';
import { Note as NoteType } from '../../types';
import './EditNote.css';

interface EditNoteProps {
    note: NoteType;
}

const EditNote: React.FC<EditNoteProps> = ({ note }) => {
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);
    const [ubication, setUbication] = useState(note.ubication);
    const [status, setStatus] = useState(note.status);
    const [category, setCategory] = useState(note.category_id);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/notes/${note.id}`, {
                title,
                description,
                ubication,
                status,
                category_id: category,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Nota actualizada:', response.data);
            // Manejar la respuesta o redirigir a otra página
        } catch (error) {
            console.error('Error actualizando la nota:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Editar Nota</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="note-card">
                    <IonCardHeader style={{margin:"5%"}}>
                        <IonCardTitle>Editar Nota</IonCardTitle>
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
                        <IonButton style={{margin:"5%"}} color="success" expand="block" onClick={handleUpdate}>
                            Guardar Cambios
                        </IonButton>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EditNote;
