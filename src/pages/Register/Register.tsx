import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConpassword] = useState('');
    const router = useIonRouter();

    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== conpassword) {
            console.error("Las contraseñas no coinciden");
            return;
        }
        axios.post('/users',{name,email,password})
        .then(
            (response)=>{
                console.log(response);
                router.push('/login')
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CREAR CUENTA</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className='card'>
                <IonCardHeader>
                </IonCardHeader>
                <form onSubmit={handleClick} >
                    <IonCardContent>
                        <IonInput label="Nombre" labelPlacement="floating" fill="solid" placeholder="Nombre" value={name} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
                        <IonInput label="Correo electronico" labelPlacement="floating" fill="solid" placeholder="correo electronico" type='email' value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                        <IonInput label="Contraseña" labelPlacement="floating" fill="solid" placeholder="contraseña" type='password' value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                        <IonInput label="Confirmar Contraseña" labelPlacement="floating" fill="solid" placeholder="repetir contraseña" type='password' value={conpassword} onIonChange={(e) => setConpassword(e.detail.value!)}></IonInput>
                    </IonCardContent>
                    <IonCardContent className='botones'>
                        <IonButton color={'success'} type="submit">Crear cuenta</IonButton>
                        <IonButton color={'danger'} href='/login'>Cancelar</IonButton>
                    </IonCardContent>
                </form>
                </IonCard>
            </IonContent>
        </IonPage>
    );
    }
export default Register;