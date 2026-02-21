const navLinks = document.querySelectorAll('.nav-link');
const contentDiv = document.getElementById('content');
const navbarCollapse = document.getElementById('navbarNav');

async function loadComponent(name) {
    try {
        //HML betöltése
        const response = await fetch(`components/${name}.html`);
        if (!response.ok) throw new Error('Nem sikerült a komponenst betölteni.');

        const html = await response.text();
        contentDiv.innerHTML = html;



    }
    catch {

    }
}

//ALapértelmezett betöltés
loadComponent('home');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        //Aktív link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        //Komponens betöltése
        loadComponent(link.dataset.target);

        // Mobil menü bezárása
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }


    })
})

