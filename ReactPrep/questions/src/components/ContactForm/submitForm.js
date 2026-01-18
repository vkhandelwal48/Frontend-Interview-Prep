const SUBMIT_URL =
  'https://questions.greatfrontend.com/api/questions/contact-form';

export default async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  try {
    if(form.action !== SUBMIT_URL) {
      alert('Invalid form action URL');
      return;
    }
    if(form.method.toLowerCase() !== 'post') {
      alert('Form method must be POST');
      return;
    }
    const formData = new FormData(form);
    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });
    const text = await response.text();
    alert(text);
  } catch (error) {
    console.log('Error submitting form:', error);
  }
};
