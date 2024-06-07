import { useState } from 'react';
import './Login.css';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonInput, IonButton, IonMenuButton, IonAlert, IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import axios from 'axios';
import React from 'react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const router = useIonRouter();

    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('/login', {email, password})
        .then((response) => {
            console.log(response);
            if (response.status === 200 && response.data.token) { 
                localStorage.setItem('token', response.data.token);
                router.push('/home');
            } else {
                throw new Error('Invalid credentials');
            }
        })
        .catch((error) => {
            console.log(error);
            setShowAlert(true); 
            setEmail('');
            setPassword('');
        })
    };    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='container'>
                <form onSubmit={handleClick} className='principal'>
                <IonCard className='card'>
                <IonCardHeader>
                </IonCardHeader>
                    <IonCardContent>
                        <IonInput label="Correo electronico" labelPlacement="floating" fill="solid" placeholder="correo electronico" type='email' value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                        <IonInput label="Contraseña" labelPlacement="floating" fill="solid" placeholder="contraseña" type='password' value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                    </IonCardContent>
                    <IonCardContent className='botones'>
                        <IonButton color={'success'} type="submit">Iniciar sesión</IonButton>
                        <IonButton color={'secondary'} href='/register'>Crear cuenta</IonButton>
                    </IonCardContent>
                </IonCard>
                </form>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="DATOS INCORRECTOS"
                    message="Verificar el usuario y/o contraseña"
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};
