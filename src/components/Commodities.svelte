<script>
  const commodities = [
    {
      name: 'Açúcar - AL',
      unit: 'sc de 50kg',
      code: 50,
    },
    {
      name: 'Açúcar - PB',
      unit: 'sc de 50kg',
      code: 149,
    },
    {
      name: 'Açúcar - PE',
      unit: 'sc de 50kg',
      code: 35,
    },
    {
      name: 'Açúcar - Santos',
      unit: 'sc de 50kg',
      code: 143,
    },
    {
      name: 'Açúcar - SP',
      unit: 'sc de 50kg',
      code: 53,
    },
    {
      name: 'Algodão',
      unit: 'lp',
      code: 54,
    },
    {
      name: 'Arroz',
      unit: 'sc de 50kg',
      code: 91,
    },
    {
      name: 'Bezerro - MS',
      unit: 'cabeça',
      code: 8,
    },
    {
      name: 'Bezerro - SP',
      unit: 'cabeça',
      code: 3,
    },
    {
      name: 'Boi Gordo',
      unit: 'arroba',
      code: 2,
    },
    {
      name: 'Café Arábica',
      unit: 'sc de 60kg',
      code: 23,
    },
    {
      name: 'Café Robusta',
      unit: 'sc de 60kg',
      code: 24,
    },
    {
      name: 'Citros',
      unit: 'cx de 40,8kg',
      code: 162,
    },
    {
      name: 'Etanol Anidro - PE',
      unit: 'litro',
      code: 101,
    },
    {
      name: 'Etanol Anidro - AL',
      unit: 'litro',
      code: 208,
    },
    {
      name: 'Etanol Anidro - MT',
      unit: 'm3',
      code: 76,
    },
    {
      name: 'Etanol Anidro - SP',
      unit: 'litro',
      code: 104,
    },
    {
      name: 'Etanol Hidratado - SP',
      unit: 'litro',
      code: 209,
    },
    {
      name: 'Etanol Hidratado - GO',
      unit: 'litro',
      code: 119,
    },
    {
      name: 'Etanol Hidratado - MT',
      unit: 'm3',
      code: 75,
    },
    {
      name: 'Etanol Hidratado - PE',
      unit: 'litro',
      code: 100,
    },
    {
      name: 'Etanol Hidratado - SP',
      unit: 'litro',
      code: 103,
    },
    {
      name: 'Frango Congelado',
      unit: 'kg',
      code: 181,
    },
    {
      name: 'Frango Congelado',
      unit: 'kg',
      code: 130,
    },
    {
      name: 'Leite',
      unit: 'litro',
      code: 'leite',
    },
    {
      name: 'Mandioca',
      unit: 't',
      code: 72,
    },
    {
      name: 'Milho',
      unit: 'sc de 60kg',
      code: 77,
    },
    {
      name: 'Ovino - BA',
      unit: 'kg',
      code: '305-BA',
    },
    {
      name: 'Ovino - CE',
      unit: 'kg',
      code: '305-CE',
    },
    {
      name: 'Ovino - MS',
      unit: 'kg',
      code: '305-MS',
    },
    {
      name: 'Ovino - MT',
      unit: 'kg',
      code: '305-MT',
    },
    {
      name: 'Ovino - PR',
      unit: 'kg',
      code: '305-PR',
    },
    {
      name: 'Ovino - SP',
      unit: 'kg',
      code: '305-SP',
    },
    {
      name: 'Ovos',
      unit: 'cx 30 dúzias',
      code: 159,
    },
    {
      name: 'Soja - PR',
      unit: 'sc de 60kg',
      code: 12,
    },
    {
      name: 'Soja Paranaguá',
      unit: 'sc de 60kg',
      code: 92,
    },
    {
      name: 'Suíno - MG',
      unit: 'kg',
      code: '129-10',
    },
    {
      name: 'Suíno - PR',
      unit: 'kg',
      code: '129-6',
    },
    {
      name: 'Suíno - RS',
      unit: 'kg',
      code: '129-4',
    },
    {
      name: 'Suíno - SC',
      unit: 'kg',
      code: '129-5',
    },
    {
      name: 'Suíno - SP',
      unit: 'kg',
      code: '129-1',
    },
    {
      name: 'Suíno - carcaça especial',
      unit: 'kg',
      code: '124',
    },
    {
      name: 'Trigo - PR',
      unit: 't',
      code: 178,
    },
    {
      name: 'Trigo - RS',
      unit: 't',
      code: 179,
    },
  ]

  let currentPrice = 0
  let currentCommodity = commodities[0]
  let quantity = 1

  const getHTMLContents = text => {
    const pos = text.indexOf('<table')

    // -2 to remove the trailing ) coming from the surrounding document.write(...)
    return text.slice(pos, text.length - 2)
  }

  const parseHTML = html => {
    const domParser = new DOMParser()
    return domParser.parseFromString(html, 'text/html')
  }

  const getPrice = doc => {
    const priceElement = doc.querySelector('tbody > tr > td:nth-of-type(3)')
    return priceElement && priceElement.innerText
  }

  const computePrice = async commodity => {
    if (!commodity) {
      currentPrice = 0
      return
    }
    const baseUrl = 'https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?id_indicador%5B%5D='
    const url = `${baseUrl}${commodity.code}`
    const res = await fetch(url).then(body => body.text())
    const price = getPrice(parseHTML(getHTMLContents(res)))
    currentPrice = price || 0
  }

  $: computePrice(currentCommodity)

  $: console.log(currentPrice)
</script>

<style>
  select {
    background: transparent;
    border: 1px solid black;
    padding: .5rem;
  }

  .commodity-selection {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    max-width: 50%;
  }

</style>

<section class="commodity-selection">
  <label for="commodity">Escolha uma commodity:</label>
  <select name="commodity" bind:value={currentCommodity}>
    {#each commodities as commodity}
      <option value={commodity}>{commodity.name}</option>
    {/each}
  </select>
</section>

<section>
  <h2>Cotação do {currentCommodity.name}</h2>
  <input type=number bind:value={quantity}> {currentCommodity.unit} = {currentPrice}
</section>

