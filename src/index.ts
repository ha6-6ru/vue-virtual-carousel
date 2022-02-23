import type { App } from 'vue';
import VirtualCarousel from './components/VirtualCarousel.vue';

function install(app: App) {
  app.component('VirtualCarousel', VirtualCarousel);
}

export default { install };
export { VirtualCarousel };
