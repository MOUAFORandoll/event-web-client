<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center text-center">
        <div class="col-lg-6">
          <h1 class="display-3 text-white">404</h1>
          <p class="lead text-white-50">La page demandée est introuvable.</p>
          <router-link class="btn btn-primary mt-4" :to="{ name: 'home' }">
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: "NotFound" };
</script>

<style scoped>
.display-3 {
  font-weight: 700;
}
</style>
