fetch('https://dummyjson.com/users', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Khandelwal Doe',
  }),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    // if (res.ok) {
    //   console.log('SUCCESS');
    // } else {
    //   console.log('FAILED');
    // }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
