<script context="module">
  import fm from 'front-matter'
  import MarkdownIt from 'markdown-it'

  export async function preload() {
    const getContents = text => {
      const md = new MarkdownIt()
      return md.render(fm(text).body)
    }

    const addContents = async post => {
      const res = await this.fetch(`_posts/${post.slug}.md`)
      const contents = (res.status === 200) ? getContents(await res.text()) : ''
      return { ...post, contents }
    }

    const postSummaries = await this.fetch('blog.json').then(r => r.json())
    const posts = await Promise.all(postSummaries.map(addContents))
    return { posts }
  }
</script>

<script>
  export let posts
  import { onMount } from 'svelte'

  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
  })
</script>

<style>
  :root {
    --main-color: rgb(224, 224, 255, 1);
    --transparent-main-color: rgb(224, 224, 255, 0);
  }
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  a {
    align-self: flex-end;
    border: 1px solid black;
    border-radius: 10px;
    padding: .5rem;
  }

  article {
    background: var(--main-color);
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    padding: 1.5rem;
    width: 80%;
  }

  article main {
    --line-size: 1.2rem;
    --number-lines: 6;
    overflow: hidden;
    line-height: var(--line-size);
    margin-bottom: 1rem;
    max-height: calc(var(--number-lines) * var(--line-size));
    position: relative;
    text-align: justify;
  }

  article main:after {
    background: linear-gradient(to right, var(--transparent-main-color), var(--main-color) 90%);
    bottom: 0rem;
    content: "";
    height: 1.2rem;
    position: absolute;
    right: 0;
    text-align: right;
    width: 70%;
  }

</style>

<svelte:head>
  <title>Cotação Boi Gordo</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<h1>Cotação Boi Gordo</h1>

<section>
  <label for="commodity">Escolha uma commodity:</label>
  <select name="commodity">
    <option value="boigordo">Boi Gordo</option>
    <option value="arroz">Arroz</option>
  </select>
</section>

<section>
  <h2>Notícias</h2>

  {#each posts as post}
    <article>
      <h3>{post.title}</h3>
      <main>
        {@html post.contents}
      </main>
      <a rel='prefetch' href='blog/{post.slug}'>Leia mais</a>
    </article>
  {/each}
</section>
