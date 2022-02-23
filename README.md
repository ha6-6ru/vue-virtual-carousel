# vue-virtual-carousel

original

* https://qiita.com/wintyo/items/52a1438feedec979672a
* https://codepen.io/wintyo1024/pen/VwzGodw

## Project Setup

```sh
npm install
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Usage

### install from github

```sh
npm install git+https://github.com/ha6-6ru/vue-virtual-carousel.git
```

### import css

```javascript
import 'vue-virtual-carousel/dist/style.css';
```

### local component

```javascript
import { VirtualCarousel } from 'vue-virtual-carousel';
```

### global component

```javascript
import VirtualCarousel from 'vue-virtual-carousel';
const app = createApp(App);
app.use(VirtualCarousel);
```

### example

```html
<Carousel :items="items" class="item">
  <template #default="{ item }">
    <img :src="item.url" class="image" />
    <p class="description">{{ item.description }}</p>
  </template>
</Carousel>
```

```css
.item {
  height: 400px;
}

.image {
  height: 100%;
  margin: auto;
  pointer-events: none;
}

.description {
  position: absolute;
  bottom: 20px;
  left: 50%;
}
```
