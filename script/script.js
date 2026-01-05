let menu = document.querySelector('#menu-bars');
let header = document.querySelector
('header');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
     header.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
     header.classList.remove('active');
}



// Validação do Formulário
document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Função Toast
    function showToast(text, color) {
        Toastify({
            text: text,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: color,
            close: true
        }).showToast();
    }

    // Validação
    if (!name || !email || !message) {
        showToast("Preencha todos os campos.", "#e74c3c");
        return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("E-mail inválido.", "#f39c12");
        return;
    }
 
    // Envio para Formspree
    try {
        const response = await fetch("https://formspree.io/f/xojvbqdn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                Nome: name,
                Email: email,
                Mensagem: message
            })
        });

        if (response.ok) {
            showToast("Mensagem enviada com sucesso!", "#2ecc71");
            document.getElementById("form").reset();
        } else {
            showToast("Erro ao enviar. Tente novamente.", "#e74c3c");
        }
    } catch (error) {
        showToast("Erro de conexão.", "#e67e22");
    }
});


const reveals = document.querySelectorAll(".reveal-left");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.2
    }
);

reveals.forEach(el => observer.observe(el));

