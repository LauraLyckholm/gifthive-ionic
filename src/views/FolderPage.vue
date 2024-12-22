<script setup lang="ts">
import { IonButtons, IonContent, IonPage, IonToolbar } from '@ionic/vue';
import { useRoute } from 'vue-router';
import beeImage from '../assets/bee.svg';
import hamburgerIcon from "../assets/hamburger.svg";

const route = useRoute();
const routeId = route.params.id;


</script>

<template class="folder-page">
  <ion-page>
      <ion-toolbar>
        <img class="folder-page__logo" :src="beeImage" alt="Gifthive logo" width="33">
        <ion-buttons slot="end">
          <ion-menu-toggle>
            <img :src="hamburgerIcon" alt="Hamburger menu icon">
          </ion-menu-toggle>
        </ion-buttons>
      </ion-toolbar>

    <ion-content :fullscreen="true">
      <div class="folder-page__container">
        <strong class="capitalize">{{ routeId }}</strong>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
ion-toolbar {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
  --padding-start: 1rem;
  --padding-end: 1rem;
  --background: var(--ion-color-tertiary);
}

.folder-page {
  &__container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ion-color-secondary);
  }
}
</style>
