import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonModal, IonLabel, IonItem, IonIcon, IonMenuButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import { Note as NoteType } from '../../types';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import EditNote from '../../components/EditNote/EditNote'; // Componente para editar la nota

const MyNotes: React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const [noteToDelete, setNoteToDelete] = useState<number | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('/mynotes', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Datos recibidos:', response.data);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleEditNote = (note: NoteType) => {
        setSelectedNote(note);
        setShowModal(true);
    };

    const confirmDeleteNote = (noteId: number) => {
        setNoteToDelete(noteId);
        setShowAlert(true);
    };

    const handleDeleteNote = async () => {
        if (noteToDelete !== null) {
            try {
                await axios.delete(`/notes/${noteToDelete}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotes(notes.filter(note => note.id !== noteToDelete));
                setNoteToDelete(null);
            } catch (error) {
                console.error('Error eliminando la nota:', error);
            }
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle>Mis Notas</IonTitle>
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
                            <IonButton expand="block" onClick={() => handleEditNote(note)}>
                                <IonIcon slot="start" icon={pencilOutline} />
                                Editar
                            </IonButton>
                            <IonButton color="danger" expand="block" onClick={() => confirmDeleteNote(note.id)}>
                                <IonIcon slot="start" icon={trashOutline} />
                                Eliminar
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Editar Nota</IonTitle>
                            <IonButton slot="end" onClick={() => setShowModal(false)}>Cerrar</IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {selectedNote && <EditNote note={selectedNote} />}
                    </IonContent>
                </IonModal>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Confirmar eliminación'}
                    message={'¿Estás seguro de que deseas eliminar esta nota?'}
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: () => {
                                setNoteToDelete(null);
                            }
                        },
                        {
                            text: 'Eliminar',
                            handler: () => {
                                handleDeleteNote();
                                setShowAlert(false);
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default MyNotes;
