<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeId = route.params.id;
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <!-- <ion-title class="title" size="large">{{ routeId }}</ion-title> -->
        <ion-buttons slot="end">
          <ion-menu-button color="secondary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ routeId }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong class="capitalize">{{ routeId }}</strong>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ion-color-secondary);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: var(--ion-color-secondary);
  margin: 0;
}

#container a {
  text-decoration: none;
}

.title {
  color: var(--ion-color-secondary);
}
</style>
