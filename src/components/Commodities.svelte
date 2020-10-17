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
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: white;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    border: 1px solid black;
    border-radius: 1rem;
    padding: .5rem 2rem .5rem .5rem;
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
    max-width: 30rem;
    padding: 2rem;
    width: 90%;
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
