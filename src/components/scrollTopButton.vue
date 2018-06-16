<template>
  <div>
    <button class='toTop' @click="scrollToTop(1000);">top</button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop(scrollDuration) {
      const cosParameter = window.scrollY / 2;
      let scrollCount = 0;
      let oldTimestamp = performance.now();
      function step(newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + (cosParameter * Math.cos(scrollCount))));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    },
  },
};
</script>

<style lang="scss">
  .toTop{
    height: 50px;
    width: 50px;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.658);
    color: white;
    border-radius: 100px;
    right: 10px;
    bottom: 100px;
    cursor: pointer;
    outline: 0;
  }
</style>
