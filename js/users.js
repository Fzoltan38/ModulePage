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

//Adott user frissítése

async function UpdateUser(id) {
    //Adatok betöltése form-ba
    let form = document.getElementById('userForm1');

    let getByIdUrl = `https://localhost:7082/api/Users/byid?id=${id}`;
    let updateUserUrl = `https://localhost:7082/api/Users?id=${id}`;

    let httpRequestGetByID = await fetch(getByIdUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }

    })

    let httpResponseGetById = await httpRequestGetByID.json();

    form.elements["username"].value = httpResponseGetById.result.username;
    form.elements["email"].value = httpResponseGetById.result.email;
    form.elements["pass"].value = httpResponseGetById.result.password;

    //Frissítés
    document.getElementById("updateButton").onclick = async () => {
        let user = {
            username: form.elements["username"].value,
            email: form.elements["email"].value,
            password: form.elements["pass"].value,
        }

        let httpRequestUseUrl = await fetch(updateUserUrl, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })

        let httpResponseUserUrl = await httpRequestUseUrl.json();

        alert(httpResponseUserUrl.message);
        loadComponent('users');

    }

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

        card.onclick = () => {
            UpdateUser(card.dataset.id);
        }
    })


}
