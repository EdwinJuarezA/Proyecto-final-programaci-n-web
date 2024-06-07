  import { Redirect, Route } from 'react-router-dom';
  import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
  import { IonReactRouter } from '@ionic/react-router';
  import Home from './pages/Home.js';
  import { useIonRouter } from '@ionic/react';
  /* Core CSS required for Ionic components to work properly */
  import '@ionic/react/css/core.css';

  /* Basic CSS for apps built with Ionic */
  import '@ionic/react/css/normalize.css';
  import '@ionic/react/css/structure.css';
  import '@ionic/react/css/typography.css';

  /* Optional CSS utils that can be commented out */
  import '@ionic/react/css/padding.css';
  import '@ionic/react/css/float-elements.css';
  import '@ionic/react/css/text-alignment.css';
  import '@ionic/react/css/text-transformation.css';
  import '@ionic/react/css/flex-utils.css';
  import '@ionic/react/css/display.css';

  /**
   * Ionic Dark Mode
   * -----------------------------------------------------
   * For more info, please see:
   * https://ionicframework.com/docs/theming/dark-mode
   */

  /* import '@ionic/react/css/palettes/dark.always.css'; */
  /* import '@ionic/react/css/palettes/dark.class.css'; */
  import '@ionic/react/css/palettes/dark.system.css';

  /* Theme variables */
  import './theme/variables.css';
  import Incendio from './pages/Incendio/Incendio.js';
  import Sidebar from './components/Sidebar/Sidebar.js';
  import { Login } from './pages/Login/Login.js';
  import Register from './pages/Register/Register.js'
  import React from 'react';
import Derrumbe from './pages/Derrumbe/Derrumbe.js';
import Inundacion from './pages/Inundacion/Inundacion.js';
import CreateNote from './pages/createNote/CreateNote.js';
import MyNotes from './pages/MyNotes/MyNotes.js';
import EditUsuario from './pages/EditUsuario.js';
import Apoya from './pages/Apoya/Apoya.js';
  //import CreateNote from './pages/createNote/CreateNote.js';

  setupIonicReact();

  const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main-content">
          <Sidebar />
          <IonRouterOutlet id="main-content">
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/incendios">
              <Incendio />
            </Route>
            <Route exact path="/inundaciones">
              <Inundacion />
            </Route>
            <Route exact path="/create-note">
              <CreateNote/>
            </Route>
            <Route exact path="/editUser">
              <EditUsuario/>
            </Route>
            <Route exact path="/mynotes">
              <MyNotes/>
            </Route>
            <Route exact path="/derrumbes">
              <Derrumbe />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/apoya">
              <Apoya />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );

  export default App;
