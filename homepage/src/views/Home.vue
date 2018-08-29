<template>
  <div class="home">
    <p><span>
      You can see some of my code on <a href="https://github.com/jrgould/">GitHub</a>, but most of the code I've written has been for private organizations like HBO, Rémy Martin, Kohls, Girlboss, JM Smucker, Café Bustelo, and more. I didn't build their websites but I have helped my clients to build webapps and microsites for these companies and others. It's all very exciting.
    </span></p>

    <p><span>
      I have also written quite a bit of code in the <a href="https://w.org">WordPress</a> ecosystem. I have developed custom themes and plugins for clients and I also spent a few years developing and providing support for <a href="https://deliciousbrains.com/wp-migrate-db-pro/">WP Migrate DB Pro</a>, a plugin for WordPress developers.
    </span></p>

    <p><span>
      Project case-studies to come. Maybe... In the meantime, maybe I'll have written something on <a href="https://blog.jrgould.com">my blog</a>.
    </span></p>

  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>

<style scoped>
  .home {
    padding: 2em 1em 0;
  }
  p{
    font-size: 1.5em;
    margin-top: 0;
    line-height: 1.4;
  }
  p span {
    background: rgba(255,255,255,.75);
  }
  p a{
    background-color: var(--primary-color-lighter);
    color: #333;
    text-decoration: none;
    transition: background-color .3s ease-out;
  }
  p a:hover{
    background-color: var(--primary-color-light);
  }
</style>

