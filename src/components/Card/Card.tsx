import React from 'react';
import { useState } from 'react';
import './Card.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonIcon, IonLabel } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import axios from 'axios';
import { heart, eye, flame } from 'ionicons/icons';
import { Router } from 'react-router';

interface CardProps {
    name: string;
    url: string;
    status: string;
}  
const Card: React.FC<CardProps> = ({ name, url, status }) => {
    const router = useIonRouter();
    const handleClick = () => {
        console.log("Nombre actual:", name); // Esto te dirá qué nombre está recibiendo
        if (name === 'Incendios') {
            console.log("Redirigiendo a incendios");
            router.push('/incendios');
        } else if(name === 'Derrumbes'){
            console.log("Redirigiendo a derrumbes");
            router.push('/derrumbes');
        } else if(name === 'Inundaciones'){
            console.log("Redirigiendo a inundaciones");
            router.push('/inundaciones');
        } else {
            console.log("No se encontró coincidencia para redirigir");
        }
    };
    return (
        <IonCard className="card">
            <img src={url} />
            <IonCardTitle className="in-card">
                {name}
                <IonButton size='large' color={'success'} className='in-button' onClick={handleClick}>
                    <IonIcon slot="icon-only" icon={eye} size='large'></IonIcon>
                </IonButton>
                <IonChip color={'danger'} className='chip'>
                <IonIcon icon={flame} color="danger" size='large'></IonIcon>
                <IonLabel className='label'>{status}</IonLabel>
            </IonChip>
            </IonCardTitle>
        </IonCard>
    );
};
export default Card;