init(document.querySelector('#search'), document.querySelector('#results'));

const endpoint = 'https://registry.npmjs.org/-/v1/search';

function init(input, results) {
  let inProgress = false;
  input.addEventListener('keydown', async (ev) => {
    if (ev.key !== 'Enter' || inProgress) {
      return;
    }

    const text = input.value;
    let result = null;
    inProgress = true;
    try {
      result = await window.fetch(`${endpoint}?text=${text}&size=25`).
        then(res => res.json());
    } catch (error) {
      inProgress = false;
      throw error;
    }
    inProgress = false;

    render(result.objects.map(v => v.package));
  });

  function render(packages) {
    results.innerHTML = packages.
      map(pkg => `
        <li>
          <a href="http://www.npmjs.com/package/${pkg.name}">
            ${pkg.name}
          </a>
        </li>
      `).
      join('\n');
  }
}
