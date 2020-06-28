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
    return 0
  }
  const baseUrl = 'https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?id_indicador%5B%5D='
  const url = `${baseUrl}${commodity.code}`
  const res = await fetch(url).then(body => body.text())
  const priceAsText = getPrice(parseHTML(getHTMLContents(res)))
  const priceAsNumber = +priceAsText.replace(/(.)*R\$\s/, '').replace(/,/, '.')
  return (100 * priceAsNumber) || 0
}

/* eslint-disable-next-line import/prefer-default-export */
export { computePrice }
