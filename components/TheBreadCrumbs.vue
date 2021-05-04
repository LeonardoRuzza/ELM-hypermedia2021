<template>
    <div>
        Prova
    </div>
</template>

<script>
export default {
  props: {
    // Parameter to set correctly the links for the breadcrumbs
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    description: { type: String, default: () => '' },
    link: { type: String, default: () => '' },
  },
  
} 
</script>

<style>
nuxt-link{
    text-decoration: none;
}
</style>
