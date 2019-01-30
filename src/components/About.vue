<template>
  <div class="about">
    <h1>Hi {{their_name}}</h1>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      their_name: this.$route.params.name
    };
  }
};
</script>
