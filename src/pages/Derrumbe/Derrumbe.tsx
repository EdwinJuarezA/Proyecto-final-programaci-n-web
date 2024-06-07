import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonModal, IonLabel, IonItem, IonIcon, IonMenuButton } from '@ionic/react';
import axios from 'axios';
import Note from '../../components/Note/Note'; 
import { Note as NoteType } from '../../types';
import { eyeOutline } from 'ionicons/icons'; 

const Derrumbe: React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

    useEffect(() => {
        axios.get('/notesDerrumbes')
            .then(response => {
                console.log('Datos recibidos:', response.data); 
                setNotes(response.data);
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
            });
    }, []);    

    const handleViewNote = (note: NoteType) => {
        setSelectedNote(note);
        setShowModal(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle>Derrumbes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {notes.map(note => (
                    <IonCard key={note.id} className='card'>
                        <IonCardHeader>
                            <IonCardTitle style={{ fontSize: '1.5em', fontWeight: 'bold', margin:'5%' }}>{note.title}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem lines="none">
                                <IonLabel>Ubicación: {note.ubication}</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Estatus: {note.status === 1 ? 'Activo' : 'Inactivo'}</IonLabel>
                            </IonItem>
                            <IonButton expand="block" onClick={() => handleViewNote(note)}>
                                <IonIcon slot="start" icon={eyeOutline} />
                                Ver
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Detalle del Derrumbe</IonTitle>
                            <IonButton slot="end" onClick={() => setShowModal(false)}>Cerrar</IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {selectedNote && <Note note={selectedNote} />}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Derrumbe;
