import React, { useState, useRef } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonAlert, IonMenuToggle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const history = useHistory();
    const menuRef = useRef<HTMLIonMenuElement>(null);

    const handleLogout = async () => {
        try {

            // Elimina el token del almacenamiento local
            localStorage.removeItem('token');

            // Oculta la sidebar
            if (menuRef.current) {
                menuRef.current.close();
            }

            // Redirige al usuario a la página de login
            history.push('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
            <IonMenu ref={menuRef} contentId="main-content" side="start">
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Menú</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem routerLink="/home" routerDirection="none">
                            <IonLabel>Home</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/incendios" routerDirection="none">
                            <IonLabel>Incendios</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/derrumbes" routerDirection="none">
                            <IonLabel>Derrumbes</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/inundaciones" routerDirection="none">
                            <IonLabel>Inundaciones</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/mynotes" routerDirection="none">
                            <IonLabel>Mis notas</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/editUser" routerDirection="none">
                            <IonLabel>Editar Usuario</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/apoya" routerDirection="none">
                            <IonLabel>Apoya</IonLabel>
                        </IonItem>
                        <IonMenuToggle>
                            <IonItem button onClick={() => setShowLogoutAlert(true)}>
                                <IonLabel>Cerrar Sesión</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonAlert
                isOpen={showLogoutAlert}
                onDidDismiss={() => setShowLogoutAlert(false)}
                header={'Cerrar Sesión'}
                message={'¿Estás seguro de que deseas cerrar sesión?'}
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => {
                            setShowLogoutAlert(false);
                        }
                    },
                    {
                        text: 'Confirmar',
                        handler: () => {
                            handleLogout();
                        }
                    }
                ]}
            />
        </>
    );
};

export default Sidebar;
