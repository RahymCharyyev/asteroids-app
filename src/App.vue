<template>
  <nav>
    <router-link to="/">About project</router-link> |
    <router-link to="/asteroids">Asteroids Near Earth</router-link> |
    <router-link to="/picture">Astronomy Picture of the Day</router-link>
  </nav>
  <router-view />
</template>

<style>
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--secondary);
  text-decoration: none;
}
</style>
