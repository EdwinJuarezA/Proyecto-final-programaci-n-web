import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonAlert, IonMenuButton } from '@ionic/react';
import axios from 'axios';
import './EditUsuario.css';
import { Router } from 'react-router';

const EditUsuario: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        axios.get('/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            const { id, name, email } = response.data;
            setUserId(id);
            setName(name);
            setEmail(email);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    const handleUpdate = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (userId !== null) {
            try {
                const response = await axios.put(`/users/${userId}`, {
                    name,
                    email,
                    password
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('User updated:', response.data);
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const confirmUpdate = () => {
        setShowAlert(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start" />
                    <IonTitle>Editar Usuario</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="user-card">
                    <IonCardHeader style={{margin:"5%"}}>
                        <IonCardTitle>Editar Usuario</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem className="user-item">
                            <IonInput
                                label="Nombre"
                                labelPlacement="floating"
                                value={name}
                                onIonChange={(e) => setName(e.detail.value!)}
                                placeholder="Ingrese su nombre"
                                fill="solid"
                            />
                        </IonItem>
                        <IonItem className="user-item">
                            <IonInput
                                label="Email"
                                labelPlacement="floating"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                placeholder="Ingrese su email"
                                fill="solid"
                            />
                        </IonItem>
                        <IonItem className="user-item">
                            <IonInput
                                type="password"
                                label="Contraseña"
                                labelPlacement="floating"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                placeholder="Ingrese su contraseña"
                                fill="solid"
                            />
                        </IonItem>
                        <IonItem className="user-item">
                            <IonInput
                                type="password"
                                label="Confirmar Contraseña"
                                labelPlacement="floating"
                                value={confirmPassword}
                                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                                placeholder="Confirme su contraseña"
                                fill="solid"
                            />
                        </IonItem>
                        <IonButton style={{margin:"5%"}} color="success" expand="block" onClick={confirmUpdate}>
                            Guardar Cambios
                        </IonButton>
                    </IonCardContent>
                </IonCard>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Confirmar cambios'}
                    message={'¿Estás seguro de que deseas actualizar tus datos?'}
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            handler: () => {
                                setShowAlert(false);
                            }
                        },
                        {
                            text: 'Confirmar',
                            handler: () => {
                                handleUpdate();
                                setShowAlert(false);
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default EditUsuario;
