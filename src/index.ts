import type { App } from 'vue';
import { VirtualCarousel } from './components';

function install(app: App) {
  app.component('VirtualCarousel', VirtualCarousel);
}

export default { install };
