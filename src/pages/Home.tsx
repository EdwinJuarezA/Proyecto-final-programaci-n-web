import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import axios from 'axios';
import { useIonRouter } from '@ionic/react';
import Card from '../components/Card/Card';
import { useEffect, useState } from 'react';
import React from 'react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface Category {
  id: number;
  name: string;
  url: string;
  status:string;
}

const Home: React.FC = () => {
  
  const [category, setCategory] = useState<Category[]>([]);  

  const getCategories = () => {
    axios.get('/categories')
    .then((response) => {
      console.log(response);
      setCategory(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const history = useHistory();

    const handleAddNote = () => {
        history.push('/create-note');
    };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle color={'primary'}>HOME</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {category.map((category) => (
          <Card 
            key={category.id}
            name={category.name}
            url={category.url}
            status={category.status}
          />
        ))}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleAddNote}>
              <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;