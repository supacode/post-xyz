import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createNotivue } from 'notivue';

import App from './App.vue';
import router from './router';
import { i18n } from './localization/i18next';
import './assets/style.scss';

import 'notivue/notification.css';
import 'notivue/animations.css';

const app = createApp(App);
const notivue = createNotivue({
  position: 'top-right',
});

app.use(notivue);
app.use(router);
app.use(VueQueryPlugin);
i18n(app);
app.mount('#app');
