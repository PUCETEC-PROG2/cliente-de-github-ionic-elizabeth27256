import './RepoItem.css'
import React from 'react';
import { IonAvatar, IonItem, IonLabel, IonList, IonIcon } from '@ionic/react';
import { airplane, bluetooth, call, wifi } from 'ionicons/icons';

interface RepoProps {
    name: string;
}

const RepoItem: React.FC<RepoProps> = ({ name }) => {
    return (
        <IonItem>
            <IonAvatar aria-hidden="true" slot="start">
                <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
            <IonLabel>Huey</IonLabel>
        </IonItem>
    );
};
{}