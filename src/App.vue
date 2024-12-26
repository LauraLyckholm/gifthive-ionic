<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';
import honeyImage from './assets/honey.svg';
import { useGetDashboard } from '../composables/get-dashbord';
import { useRegisterUser } from '../composables/register-user';
import { useLoginUser } from '../composables/login-user';
import { useLogoutUser } from '../composables/logout-user';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Dashboard',
    url: '/folder/Dashboard',
  },
  {
    title: 'All hives',
    url: '/folder/Hives',
  },
  {
    title: 'Shared hives',
    url: '/folder/Shared',
  },
  {
    title: 'FAQ',
    url: '/folder/Faq',
  },
  {
    title: 'Account',
    url: '/folder/Account',
  },
];

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}

// const dashboard = await useGetDashboard();
// console.log(dashboard.value);

// const register = await useRegisterUser('Paura', 'Paura123', 'laura.paura@gmail.com');

// const register = await useLoginUser('Paura', 'Paura123', '676d5de2a0670f8b701bac3c');

// const logout = useLogoutUser();
// console.log(register);

</script>

<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" side="end">
        <ion-content>
          <img class="honey-image" :src="honeyImage" alt="Image of honey dripping down the menu">
          <ion-list class="menu-list">
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="menu-list__item hydrated" :class="{ selected: selectedIndex === i }">
                <ion-label slot="end" class="menu-list__item-label">{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<style scoped lang="scss">
.menu-list {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 0.75rem;
  background: white;
  &__item {
    &-label {
      color: var(--ion-color-secondary);
      font-size: 18px;
      font-weight: 500;
    }
  }
}
.honey-image {
  position: relative;
  top: -7px;
  left: 156px;
}

ion-menu ion-content {
  --background: white;
}

ion-item {
  --background: white;
  --background-hover: none;
}


/* 
ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;
  margin-bottom: 18px;
  color: var(--ion-color-secondary);
  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}


ion-item.selected {
  --color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: var(--ion-color-secondary);
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: var(--ion-color-secondary);
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-secondary);
}
 */


</style>
