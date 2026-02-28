(
    //User adatok lekérés
    async () => {
        let url = 'https://localhost:7082/api/Users';

        let httpRequest = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (httpRequest.status === 401) {
            alert('Nem azonosított felhasználó!');
            return;
        }

        if (!httpRequest.ok) {
            alert("Egyéb hiba");
            return;
        }

        let httpResponse = await httpRequest.json();
        renderUsers(httpResponse);

    }
)();

async function DeleteUser(id) {
    let url = `https://localhost:7082/api/Users?id=${id}`
    let httpRequest = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    if (httpRequest.status === 404) {
        alert("Nincs ilyen user!")
        return;
    }
    if (!httpRequest.ok) {
        alert("Egyéb hiba!")
        return;
    }

    let httpResponse = await httpRequest.json();

    alert(httpResponse.message)
    loadComponent('users');
}

//Új user felvétele
document.getElementById("userForm1").onsubmit = async (e) => {
    e.preventDefault();
    let url = "https://localhost:7082/api/Users/register";

    let user = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.pass.value,
    }

    let httpRequest = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

    if (!httpRequest.ok) {
        alert("Egyéb hiba!")
        return;
    }

    //let httpResponse = await httpRequest.json();

    alert("Sikeres hozzáadás.")
    loadComponent('users');
}

function renderUsers(users) {
    let contentText = "";

    for (const element of users) {
        contentText = contentText +
            `
            <div class="card m-2" data-id="${element.id}" style="width:200px; float:left">
                <div class="card-body">
                    ${element.id}<br>
                    ${element.username}<br>
                    ${element.email}
                </div>
            </div>
        `
    }
    document.getElementById("usersContent").innerHTML = contentText;

    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.ondblclick = () => {
            DeleteUser(card.dataset.id);
        }
    })
}
