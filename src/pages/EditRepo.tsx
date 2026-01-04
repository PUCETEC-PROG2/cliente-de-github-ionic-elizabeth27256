import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import React, { useState } from "react";
import { updateRepository } from "../services/GithubSevice";

interface RouteParams {
  owner: string;
  name: string;
}

const EditRepo: React.FC = () => {
  const { owner, name } = useParams<RouteParams>();
  const history = useHistory();

  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    try {
      await updateRepository(owner, name, { description });
      setShowToast(true);

      // Espera un momento para mostrar el mensaje
      setTimeout(() => {
        history.push("/tab1");
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar repositorio", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Repositorio</IonLabel>
          <IonInput value={name} disabled />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonInput
            value={description}
            placeholder="Nueva descripción"
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleSave}>
          Guardar cambios
        </IonButton>

        {/* Mensaje de exito mediante un toast */}
        <IonToast
          isOpen={showToast}
          message="Repositorio actualizado correctamente"
          duration={1500}
          color="success"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditRepo;
