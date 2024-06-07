import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonImg } from '@ionic/react';
import { Note as NoteType } from '../../types'; 
import './Note.css'; 

interface NoteProps {
    note: NoteType;
}

const Note: React.FC<NoteProps> = ({ note }) => {
    console.log('Note images:', note.images); 

    return (
        <IonCard className="note-card">
            <IonCardHeader className="note-card-header">
                <IonCardTitle className="note-card-title">{note.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem lines="none" className="note-item">
                    <IonLabel>Descripción: {note.description}</IonLabel>
                </IonItem>
                <IonItem lines="none" className="note-item">
                    <IonLabel>Ubicación: {note.ubication}</IonLabel>
                </IonItem>
                <IonItem lines="none" className="note-item">
                    <IonLabel>Status: {note.status === 1 ? 'Activo' : 'Inactivo'}</IonLabel>
                </IonItem>
                <IonItem lines="none" className="note-item">
                    <IonLabel>Publicado por: {note.user_name}</IonLabel>
                </IonItem>
                {note.images && Array.isArray(note.images) && note.images.map((imageUrl, index) => (
                    <IonImg key={index} src={imageUrl} alt={`Image ${index}`} />
                ))}
            </IonCardContent>
        </IonCard>
    );
};

export default Note;
