<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from 'vue';

const MOVE_THRESHOLD = 30;
const NUM_DISPLAY_ITEM = 5;
const OFFSET_INDEXES = [...Array(NUM_DISPLAY_ITEM).keys()].map(
  (index) => index - Math.floor(NUM_DISPLAY_ITEM / 2),
);

const props = defineProps<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}>();

const state = reactive({
  currentIndex: 0,
  isSwiping: false,
  moveIndex: 0,
  startX: null as number | null,
  diffX: 0,
  interval: 0,
});

const onTouchMove = (event: MouseEvent | TouchEvent) => {
  if (state.startX == null) {
    return;
  }
  const currentX =
    'touches' in event ? event.touches[0].clientX : event.clientX;
  state.diffX = currentX - state.startX;
};

const onTouchEnd = () => {
  if (state.startX == null) {
    return;
  }
  if (state.diffX > MOVE_THRESHOLD) {
    state.moveIndex = -1;
  } else if (state.diffX < -MOVE_THRESHOLD) {
    state.moveIndex = 1;
  }
  state.isSwiping = false;
  state.startX = null;
  state.diffX = 0;
};

const onTouchStart = (event: MouseEvent | TouchEvent) => {
  state.isSwiping = true;
  state.startX = 'touches' in event ? event.touches[0].clientX : event.clientX;

  // 既に移動中の場合はcurrentIndexを更新する
  if (state.moveIndex !== 0) {
    state.currentIndex =
      (state.currentIndex + state.moveIndex + props.items.length) %
      props.items.length;
    state.moveIndex = 0;
  }
};

const onTransitionEnd = () => {
  if (state.moveIndex !== 0) {
    state.currentIndex =
      (state.currentIndex + state.moveIndex + props.items.length) %
      props.items.length;
    state.moveIndex = 0;
  }
};

const getItem = (index: number) => {
  return props.items[(index + props.items.length) % props.items.length];
};

onMounted(() => {
  window.addEventListener('mousemove', onTouchMove);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('mouseup', onTouchEnd);
  window.addEventListener('touchend', onTouchEnd);
  state.interval = setInterval(() => {
    state.moveIndex = 1;
  }, 5000);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onTouchMove);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('mouseup', onTouchEnd);
  window.removeEventListener('touchend', onTouchEnd);
  clearInterval(state.interval);
});
</script>

<template>
  <div
    class="carousel"
    @touchstart="onTouchStart"
    @mousedown="onTouchStart"
    @transitionend="onTransitionEnd"
  >
    <template v-for="offsetIndex in OFFSET_INDEXES">
      <template v-if="getItem(state.currentIndex + offsetIndex) != null">
        <div
          :key="getItem(state.currentIndex + offsetIndex)"
          class="carousel-item"
          :style="{
            transition: state.isSwiping ? 'none' : undefined,
            transform: `translate3d(${
              -50 + (offsetIndex - state.moveIndex) * 100
            }%, -50%, 0) translate3d(${state.diffX}px, 0, 0)`,
          }"
        >
          <slot
            v-bind="{ item: getItem(state.currentIndex + offsetIndex) }"
          ></slot>
        </div>
      </template>
    </template>
  </div>
</template>

<style>
.carousel {
  position: relative;
  overflow: hidden;
  user-select: none;
}

.carousel-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}
</style>
