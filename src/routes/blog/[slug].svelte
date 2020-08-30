<script context="module">
  // eslint-disable-next-line consistent-return
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`_posts/${params.slug}.md`)

    if (res.status === 200) {
      return { postMd: await res.text() }
    }
    this.error(res.status, 'Not found')
  }
</script>

<script>
  import fm from 'front-matter'
  import MarkdownIt from 'markdown-it'

  export let postMd

  const md = new MarkdownIt()

  const computeDatetime = postToFormat => {
    const formatter = new Intl.DateTimeFormat('pt-br')
    return formatter.format(postToFormat.date)
  }

  $: frontMatter = fm(postMd)
  $: post = {
    ...frontMatter.attributes,
    html: md.render(frontMatter.body),
  }
  $: datetime = computeDatetime(post)
</script>

<style>
  h1 {
    color: var(--main-color);
    padding: 0;
  }
  .datetime {
    font-size: 0.8rem;
    font-style: italic;
  }

  .content {
    padding-top: 2rem;
  }
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>
<p class="datetime">Publicado em {datetime}</p>

<div class='content'>
	{@html post.html}
</div>
