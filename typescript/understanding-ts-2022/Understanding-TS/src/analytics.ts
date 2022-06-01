let logged

function sendAnalytics(data: string) {
  console.log('Sending data...', data)
  logged = true
  console.log(logged)
}

sendAnalytics('The data')
