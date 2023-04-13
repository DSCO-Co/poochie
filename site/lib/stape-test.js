function stapeTest() {
  var dataLayer = window.dataLayer || []
  var stapeWebhookUrl = '{{stapeWebhookUrl}}'

  dataLayer.push({
    event: 'stape.send',
    stapeData: {
      event_name: 'your_event_name',
      user_id: 'your_user_id',
      event_data: {
        key: 'value',
      },
    },
  })

  window.addEventListener('message', function (event) {
    if (event.data.event === 'stape.send') {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', stapeWebhookUrl, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(event.data.stapeData))
    }
  })
}
