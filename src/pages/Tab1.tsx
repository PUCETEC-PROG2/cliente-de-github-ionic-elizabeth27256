import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAlert,
  IonIcon,
  IonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import React from "react";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import {
  fetchRepositories,
  deleteRepository,
} from "../services/GithubSevice";
import { useHistory } from "react-router";
import { createOutline, trashOutline } from "ionicons/icons";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [repoToDelete, setRepoToDelete] = React.useState<{
    owner: string;
    name: string;
  } | null>(null);

  const history = useHistory();

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  // Elimina repo
  const handleDelete = async () => {
    if (!repoToDelete) return;

    try {
      await deleteRepository(
        repoToDelete.owner,
        repoToDelete.name
      );
      setShowAlert(false);
      setRepoToDelete(null);
      setShowToast(true); //  alerta para confirmar la eliminacion del repo
      loadRepos();
    } catch (error) {
      console.error("Error al eliminar repositorio", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map((repo, index) => (
            <IonItemSliding key={index}>
              <RepoItem
                name={repo.name}
                description={repo.description}
                imageUrl={repo.imageUrl}
                owner={repo.owner}
                language={repo.language}
              />

              <IonItemOptions side="end">
                {/* Boton editar */}
                <IonItemOption
                  color="secondary"
                  onClick={(e) => {
                    e.currentTarget
                      .closest("ion-item-sliding")
                      ?.close();
                    history.push(`/edit/${repo.owner}/${repo.name}`);
                  }}
                >
                  <IonIcon icon={createOutline} slot="icon-only" />
                </IonItemOption>

                {/* Boton eliminar */}
                <IonItemOption
                  color="danger"
                  onClick={(e) => {
                    e.currentTarget
                      .closest("ion-item-sliding")
                      ?.close();

                    if (!repo.owner) return;
                    setRepoToDelete({
                      owner: repo.owner,
                      name: repo.name,
                    });
                    setShowAlert(true);
                  }}
                >
                  <IonIcon icon={trashOutline} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        {/* Alerta para eliminar un repo*/}
        <IonAlert
          isOpen={showAlert}
          header="Confirmar eliminación"
          message={`¿Estás seguro de eliminar el repositorio "${repoToDelete?.name}"?`}
          onDidDismiss={() => {
            setShowAlert(false);
            setRepoToDelete(null);
          }}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
            },
            {
              text: "Eliminar",
              role: "destructive",
              handler: handleDelete,
            },
          ]}
        />

        {/* Mensaje de eliminacion de un repo usando toast*/}
        <IonToast
          isOpen={showToast}
          message="Repositorio eliminado correctamente"
          duration={2000}
          color="success"
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
