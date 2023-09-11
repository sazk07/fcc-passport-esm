$(document).ready(() => {
  // Form submission with new message in field with id 'm'
  $('form').submit(() => {
    var messageToSend = $('#m').val()
    $('#m').val('')
    return false
  })
})
