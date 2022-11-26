<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
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
