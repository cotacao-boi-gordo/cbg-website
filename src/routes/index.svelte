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
  import Commodities from '../components/Commodities.svelte'

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
  a {
    align-self: flex-end;
    border: 1px solid black;
    border-radius: 10px;
    padding: .5rem;
  }

  article {
    background: var(--main-color);
    border-radius: 25px;
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    max-width: calc(var(--base-font-size) * 40);
    padding: 1.5rem;
  }

  article section {
    --line-size: 1.2rem;
    --number-lines: 6;
    overflow: hidden;
    line-height: var(--line-size);
    margin-bottom: 1rem;
    max-height: calc(var(--number-lines) * var(--line-size));
    position: relative;
    text-align: justify;
  }

  article section:after {
    background: linear-gradient(to right, var(--transparent-main-color), var(--main-color) 90%);
    bottom: 0rem;
    content: "";
    height: 1.2rem;
    position: absolute;
    right: 0;
    text-align: right;
    width: 70%;
  }

  .region {
    background-color: #07B8C5;
    padding: 2.5rem;
    border-radius: 1rem;
    }

  .content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .news {
      max-width: calc(var(--base-font-size) * 45);
  }
</style>

<svelte:head>
  <title>Cotação Boi Gordo</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>

<div class="content">
  <div class="region">
    <Commodities/>
  </div>

  <section class="region news">
    <h2>Notícias</h2>

    {#each posts as post}
      <article>
        <h3>{post.title}</h3>
        <section>
          {@html post.contents}
        </section>
        <a rel='prefetch' href='blog/{post.slug}'>Leia mais</a>
      </article>
    {/each}
  </section>
</div>
