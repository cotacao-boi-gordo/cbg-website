<script>
  import { createEventDispatcher } from 'svelte'

  export let amount

  const dispatch = createEventDispatcher()
  let position = 0
  const maxPosition = 12

  const handleKeydown = ev => {
    ev.preventDefault()

    const inputKey = ev.key
    const inputNumber = +inputKey
    if (Number.isInteger(inputNumber) && position < maxPosition) {
      amount = amount * 10 + inputNumber
      position += 1
    }

    if (inputKey === 'Backspace') {
      amount = Math.floor(amount / 10)
      position = (position > 0) ? (position - 1) : 0
    }

    dispatch('currencyInput', amount)
  }

  $: amountAsText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(amount / 100)
</script>

<style>
  input {
    padding: .5rem;
  }
</style>

<input type=tel value={amountAsText} on:keydown={handleKeydown}>
