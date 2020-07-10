<template>
  <q-page style="min-height: 0px; "> 
    <template>
      <div>
        <q-carousel padding autoplay swipeable animated v-model="slide" :height="slideHeight" >
          <q-carousel-slide name="first" img-src="../statics/images/innovation_.svg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h3">All Your Needs</div>
              <div class="text-subtitle1">In one-App</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="second" img-src="../statics/images/light.svg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h3">Electricity</div>
              <div class="text-subtitle1">Right at your door step</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="third" img-src="../statics/images/superman.svg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h3 q-mb-md">Be The Boss</div>
              <div class="text-subtitle1">
                <q-btn rounded push color="primary" to="auth/"> Continue </q-btn>
              </div>
            </div> 
          </q-carousel-slide>
        </q-carousel>
      </div>
    </template>
  </q-page>
</template>

<style scoped>
.custom-caption{ 
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 'first'
    }
  },
  computed: {
    slideHeight(){ 
      return window.screen.height - 100 + 'px';
    }
  },
}
</script>
