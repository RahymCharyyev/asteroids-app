<template>
  <nav>
    <router-link to="/">About project</router-link> |
    <router-link to="/asteroids">Asteroids Near Earth</router-link> |
    <router-link to="/picture">Astronomy Picture of the Day</router-link>
  </nav>
  <router-view />
</template>

<style>
:root {
  --primary: #fff;
  --secondary: #d6a505;
  --hr: #838485;
  --background: #000;
  --red: red;
}

html {
  background-image: url(./assets/bg.jpg);
  background-repeat: repeat, no-repeat;
  background-size: auto, cover;
  background-position: center, center;
  background-color: var(--background);
}

body {
  position: relative;
  max-width: 42em;
  margin: 0 auto;
  padding: 12px 20px 0 20px;
  font-family: Ubuntu Mono;
  font-size: 18px;
  color: var(--primary);
}

a {
  color: var(--secondary);
}

hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin: 2.5em 0;
  position: relative;
}

hr:before,
hr:after {
  content: "";
  position: absolute;
  bottom: 0px;
  height: 5em;
  width: 100%;
  background: radial-gradient(
    ellipse at bottom,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 0;
}

hr:after {
  top: 0px;
  bottom: auto;
  height: 1.5em;
  background: radial-gradient(
    ellipse at top,
    rgba(0, 0, 0, 0.06) 0%,
    rgba(0, 0, 0, 0) 70%
  );
}

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

@media (max-width: 600px) {
  body {
    font-size: 16px;
  }
}
</style>
