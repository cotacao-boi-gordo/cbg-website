<script>
  import { fetchPrice } from '../services/fetchCommodities'
  import commodities from '../services/commodities'
  import Currency from './Currency.svelte'

  let unitPrice = 0
  let rawQuantity = 1
  let status = 'success'
  let currentCommodity = commodities[0]

  const updatePrice = async commodity => {
    rawQuantity = 1
    const result = await fetchPrice(commodity)
    status = result.status
    unitPrice = result.price
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
  input {
    padding: .5rem;
    width: 5rem;
  }

  select {
    background: transparent;
    border: 1px solid black;
    padding: .5rem;
  }

  .contents {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .commodity-selection {
    align-self: start;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    max-width: 50%;
  }

  .equals {
    font-size: 1.5rem;
    padding: 0 1rem;
  }

  .mid-text {
    align-items: center;
    display: flex;
  }

  .price-widget {
    align-items: center;
    background: var(--main-color);
    border-radius: 25px;
    box-shadow: 2px 6px 14px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 30rem;
  }

  .unit-name {
    padding-left: .5rem;
  }
</style>

<div class="contents">
  <section class="commodity-selection">
    <label for="commodity">Escolha uma commodity:</label>
    <select name="commodity" bind:value={currentCommodity}>
      {#each commodities as commodity}
        <option value={commodity}>{commodity.name}</option>
      {/each}
    </select>
  </section>

  <section class="price-widget">
    <h3>Cotação para {currentCommodity.name}</h3>
    {#if status === 'success'}
      <div class="mid-text">
        <input type=number step="any" bind:value={rawQuantity}>
        <span class="unit-name">{currentCommodity.unit}</span>
        <span class="equals">=</span>
        <Currency amount={currentPrice} on:currencyInput={handleCurrencyInput}/>
      </div>
    {:else}
      <span>Não foi possível encontrar a cotação!</span>
    {/if}
  </section>
</div>
