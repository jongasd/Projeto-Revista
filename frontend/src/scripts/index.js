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
    const inputTurma = document.getElementById('turma');
    const cancelBtn  = document.querySelector('.cancel');

    // ── Troca dinâmica do campo RM / NIF ──────────────────────────
    function atualizarCampoCargo() {
        const valor = cargo.value; // "aluno" | "professor"

        if (valor === 'professor') {
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

        setTimeout(() => { msg.className = 'msg'; }, 4000);
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarSenha(senha) {
        return senha.length >= 6;
    }

    // ── Submit ────────────────────────────────────────────────────
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nome  = document.getElementById('nome').value.trim();
        const senha = document.getElementById('senha').value;
        const email = document.getElementById('email').value.trim();
        const turma = inputTurma.value.trim();
        const cargoVal = cargo.value; // já vem "aluno" ou "professor"
        // O banco hoje só tem a coluna `rm` (sem coluna separada para NIF de
        // professor) — então, para professor, reaproveitamos o valor do NIF
        // nesse mesmo campo. É um contorno, não uma modelagem ideal; o certo
        // seria adicionar uma coluna própria para isso.
        const idExtra = cargoVal === 'professor'
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

        if (!turma) {
            exibirMensagem('Por favor, informe a turma.', 'erro');
            inputTurma.focus();
            return;
        }

        if (!idExtra) {
            const campo = cargoVal === 'professor' ? 'NIF' : 'RM';
            exibirMensagem(`Por favor, informe o ${campo}.`, 'erro');
            (cargoVal === 'professor' ? inputNif : inputRm).focus();
            return;
        }

        if (!/^\d+$/.test(idExtra)) {
            exibirMensagem('O RM/NIF deve conter apenas números.', 'erro');
            return;
        }

        const botao = form.querySelector('button[type="submit"]');
        botao.disabled = true;
        botao.textContent = 'Cadastrando...';

        try {
            await CJAuth.cadastrar({
                nome,
                turma,
                email,
                rm: idExtra,
                senha,
                tipo: cargoVal,
            });

            exibirMensagem('Cadastro realizado com sucesso! Redirecionando…', 'sucesso');

            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1200);
        } catch (erro) {
            exibirMensagem(erro.message, 'erro');
            botao.disabled = false;
            botao.textContent = 'Cadastrar e ir para tela inicial';
        }
    });

    // ── Cancelar ──────────────────────────────────────────────────
    cancelBtn.addEventListener('click', function () {
        if (confirm('Deseja cancelar o cadastro?')) {
            form.reset();
            atualizarCampoCargo();

            const msg = document.querySelector('.msg');
            if (msg) msg.className = 'msg';
        }
    });

    // ── Mascara simples para RM (somente números) ─────────────────
    inputRm.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
    inputNif.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

})();
