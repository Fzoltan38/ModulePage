(
    function () {
        const frm = document.getElementById('loginForm');
        const logLink = document.getElementById('login');
        const usersMenu = document.getElementById('users');

        //Menü szöveg frissítése
        upDateMenuText();

        if (logLink) {
            logLink.addEventListener("click", (e) => {
                const token = localStorage.getItem("token");
                //Ha van token, akkor kijelentkezik vagyis törli a tokent localstorage-ból
                if (token) {
                    e.preventDefault();
                    localStorage.removeItem("token");
                    upDateMenuText();
                }
            })
        }

        //Bejelentkezés kezelés
        if (frm) {
            frm.onsubmit = async (e) => {
                e.preventDefault();
                let uname = e.target.username.value;
                let password = e.target.password.value;
                let url = `https://localhost:7082/api/Users/login?userName=${uname}&password=${password}`;

                let httpRequest = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                })

                if (!httpRequest.ok) {
                    alert("Nem regisztrált még.")
                    return
                }

                let httpResponse = await httpRequest.json();
                localStorage.setItem("token", httpResponse.token)

                upDateMenuText();

                /*let convertToken = jwtDecode(httpResponse.token);
                console.log("Hello " + convertToken.name);
                console.log("Hello " + convertToken.sub);*/
            }
        }

        //Segédfüggvény menü szöveg frissítéséhez
        function upDateMenuText() {
            const token = localStorage.getItem("token");

            if (logLink) {
                logLink.textContent = token ? "Kijelentkezés" : "Bejelentkezés";
            }

            if (usersMenu) {
                usersMenu.style.display = token ? "block" : "none";
            }
        }
    }


)();

function jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayLoad = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayLoad);
}