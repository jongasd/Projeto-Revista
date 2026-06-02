/* ── index.js – Conecta Jovem | Cadastro ── */

(function () {
    'use strict';

    // ── Elementos ──────────────────────────────────────────────────
    const form       = document.getElementById('cadastroForm');
    const cargo      = document.getElementById('cargo');
    const grupoRm    = document.getElementById('grupo-rm');
    const grupoNif   = document.getElementById('grupo-nif');
    const inputRm    = document.getElementById('rm');
    const inputNif   = document.getElementById('nif');
    const cancelBtn  = document.querySelector('.cancel');

    // ── Troca dinâmica do campo RM / NIF ──────────────────────────
    function atualizarCampoCargo() {
        const valor = cargo.value;

        if (valor === 'Professor') {
            grupoNif.classList.remove('hidden');
            grupoRm.classList.add('hidden');
            inputNif.required = true;
            inputRm.required  = false;
            inputRm.value     = '';
        } else {
            // Aluno (padrão)
            grupoRm.classList.remove('hidden');
            grupoNif.classList.add('hidden');
            inputRm.required  = true;
            inputNif.required = false;
            inputNif.value    = '';
        }
    }

    // Aplica imediatamente ao carregar e a cada mudança
    atualizarCampoCargo();
    cargo.addEventListener('change', atualizarCampoCargo);

    // ── Validação ─────────────────────────────────────────────────
    function exibirMensagem(texto, tipo) {
        let msg = document.querySelector('.msg');

        if (!msg) {
            msg = document.createElement('p');
            msg.className = 'msg';
            form.after(msg);
        }

        msg.textContent = texto;
        msg.className   = `msg ${tipo}`;

        // Remove automaticamente após 4 s
        setTimeout(() => { msg.className = 'msg'; }, 4000);
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarSenha(senha) {
        return senha.length >= 6;
    }

    // ── Submit ────────────────────────────────────────────────────
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome  = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value;
        const email = document.getElementById('email').value.trim();
        const cargoVal = cargo.value;
        const idExtra = cargoVal === 'Professor'
            ? inputNif.value.trim()
            : inputRm.value.trim();

        // Validações básicas
        if (!nome) {
            exibirMensagem('Por favor, informe seu nome completo.', 'erro');
            document.getElementById('nome').focus();
            return;
        }

        if (!validarSenha(senha)) {
            exibirMensagem('A senha deve ter pelo menos 6 caracteres.', 'erro');
            document.getElementById('senha').focus();
            return;
        }

        if (!validarEmail(email)) {
            exibirMensagem('Informe um e-mail válido.', 'erro');
            document.getElementById('email').focus();
            return;
        }

        if (!idExtra) {
            const campo = cargoVal === 'Professor' ? 'NIF' : 'RM';
            exibirMensagem(`Por favor, informe o ${campo}.`, 'erro');
            (cargoVal === 'Professor' ? inputNif : inputRm).focus();
            return;
        }

        // Simula cadastro (substitua pela chamada real à API)
        const usuario = { nome, email, cargo: cargoVal, id: idExtra };
        console.log('Usuário cadastrado:', usuario);

        // Salva no sessionStorage para uso na tela inicial
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        exibirMensagem('Cadastro realizado com sucesso! Redirecionando…', 'sucesso');

        setTimeout(() => {
            // Redireciona para a tela inicial
            window.location.href = 'index.html'; // ajuste conforme a rota real
        }, 1500);
    });

    // ── Cancelar ──────────────────────────────────────────────────
    cancelBtn.addEventListener('click', function () {
        if (confirm('Deseja cancelar o cadastro?')) {
            form.reset();
            atualizarCampoCargo();

            // Remove mensagem se houver
            const msg = document.querySelector('.msg');
            if (msg) msg.className = 'msg';
        }
    });

    // ── Mascara simples para RM (somente números) ─────────────────
    inputRm.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

})();