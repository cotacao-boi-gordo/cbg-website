<style>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital@1&display=swap');
  a {
    align-items: center;
    display: flex;
    text-decoration: none;
  }

  a:visited {
    color: inherit;
  }

  img {
      width: 2.0rem;
      margin-right: 1rem;
  }

  h1 {
    color: #4F8892;
    font-family: 'Merriweather', serif;
    font-size: 2rem;
    padding: 0;
    transition: color 300ms;
  }

  h1:hover {
    color: black;
  }

  header {
    display: flex;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem 3rem;
  }

  main {
    padding: 2rem 3rem;
  }
</style>

<header>
  <a href="/">
    <img src="cow.svg" alt="Ícone de vaca"/>
    <h1>Cotação Boi Gordo</h1>
  </a>
</header>
<main>
  <slot></slot>
</main>
