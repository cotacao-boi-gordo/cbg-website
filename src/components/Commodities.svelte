<script>
  import { computePrice } from '../services/fetchCommodities'
  import commodities from '../services/commodities'
  import Currency from './Currency.svelte'

  let unitPrice = 0
  let rawQuantity = 1
  let currentCommodity = commodities[0]

  const updatePrice = async commodity => {
    unitPrice = await computePrice(commodity)
  }

  const handleCurrencyInput = ev => {
    const targetPrice = ev.detail
    rawQuantity = targetPrice / unitPrice
  }

  $: currentPrice = quantity * unitPrice
  $: priceFound = currentPrice > 0
  $: quantity = rawQuantity || 0
  $: updatePrice(currentCommodity)

</script>

<style>
  input[type="number"] {
    padding: .5rem;
  }

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
  <h2>Cotação para {currentCommodity.name}</h2>
  {#if priceFound}
    <input type=number step="any" bind:value={rawQuantity}> {currentCommodity.unit}
    =
    <Currency amount={currentPrice} on:currencyInput={handleCurrencyInput}/>
  {:else}
    <span>Não foi possível encontrar a cotação para {currentCommodity.name}</span>
  {/if}
</section>
