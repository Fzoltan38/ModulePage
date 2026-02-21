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

        //Régi script törlése
        const oldScript = document.getElementById('component-script');
        if (oldScript) oldScript.remove();

        //Új script betöltés
        const script = document.createElement('script');
        script.src = `js/${name}.js`;
        script.id = 'component-script';

        //Ha nincs JS fájl, ne dobjon hibát
        script.onerror = () => {
            console.log(`Nincs ${name}.js fájl.`);
        }

        document.body.appendChild(script);

    }
    catch (error) {
        contentDiv.innerHTML = `<p class="text-danger">Hiba ${error.message}</p>`;
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

