import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonModal, IonLabel, IonItem, IonIcon, IonMenuButton } from '@ionic/react';
import axios from 'axios';
import { locationOutline } from 'ionicons/icons';
import Map from '../../components/Map/Map';
import { Ubication as UbicationType } from '../../types';

const Apoya: React.FC = () => {
    const [ubications, setUbications] = useState<UbicationType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUbication, setSelectedUbication] = useState<UbicationType | null>(null);

    useEffect(() => {
        axios.get('/ubications')
            .then(response => {
                console.log('Datos recibidos:', response.data);
                setUbications(response.data);
            })
            .catch(error => {
                console.error('Error fetching ubications:', error);
            });
    }, []);

    const handleViewUbication = (ubication: UbicationType) => {
        setSelectedUbication(ubication);
        setShowModal(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle>Apoya</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {ubications.map(ubication => (
                    <IonCard key={ubication.id} className='card'>
                        <IonCardHeader>
                            <IonCardTitle style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '5%' }}>{ubication.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem lines="none">
                                <IonLabel>Estado: {ubication.state}</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Ciudad: {ubication.city}</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Dirección: {ubication.address}</IonLabel>
                            </IonItem>
                            <IonButton expand="block" onClick={() => handleViewUbication(ubication)}>
                                <IonIcon slot="start" icon={locationOutline} />
                                Ver
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                ))}

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Detalle de Ubicación</IonTitle>
                            <IonButton slot="end" onClick={() => setShowModal(false)}>Cerrar</IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {selectedUbication && (
                            <div>
                                <IonItem>
                                    <IonLabel>Nombre: {selectedUbication.name}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Estado: {selectedUbication.state}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Ciudad: {selectedUbication.city}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Dirección: {selectedUbication.address}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Descripción: {selectedUbication.description}</IonLabel>
                                </IonItem>
                                <Map latitude={selectedUbication.latitude} longitude={selectedUbication.longitude} />
                            </div>
                        )}
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Apoya;
