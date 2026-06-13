const routeLabel = document.getElementById('routeLabel');
const statePreview = document.getElementById('statePreview');
const buttons = document.querySelectorAll('button[data-route]');
const backBtn = document.getElementById('backBtn');

function render(path, state) {
  routeLabel.textContent = `Current route: ${path}`;
  statePreview.textContent = JSON.stringify(state ?? {}, null, 2);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const route = button.dataset.route;
    const state = { route, timestamp: new Date().toISOString() };

    if (route === '/settings') {
      history.replaceState(state, '', route);
    } else {
      history.pushState(state, '', route);
    }

    render(route, state);
  });
});

backBtn.addEventListener('click', () => {
  history.back();
});

window.addEventListener('popstate', (event) => {
  render(location.pathname, event.state);
});

render(location.pathname, history.state);
