(
    function () {
        const frm = document.getElementById('loginForm');


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
                }

                let httpResponse = await httpRequest.json();
                localStorage.setItem("token", httpResponse.token)
                let convertToken = jwtDecode(httpResponse.token);
                console.log("Hello " + convertToken.name);
                console.log("Hello " + convertToken.sub);


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