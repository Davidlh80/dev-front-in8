document.addEventListener('DOMContentLoaded', function () {

    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.display = 'none';
    document.body.insertBefore(overlay, document.body.firstChild);

    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.navbar .menu');
    const hamburgerImg = hamburger.querySelector('img');

    hamburger.addEventListener('click', function () {
        menu.classList.toggle('active');

        if (menu.classList.contains('active')) {
            hamburgerImg.src = './icones/hamburguer-aberto0.svg';
            overlay.style.display = 'block';
        } else {
            hamburgerImg.src = './icones/hamburguer.svg';
            overlay.style.display = 'none';
        }
    });

    overlay.addEventListener('click', function () {
        menu.classList.remove('active');
        hamburgerImg.src = './icones/hamburguer.svg';
        overlay.style.display = 'none';
    });

    const form = document.querySelector('.cadastro-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const nascimento = document.getElementById('nascimento').value;
        const telefone = document.getElementById('telefone').value;

        const novoIndice = preencherLinhaVazia(nome, email, nascimento, telefone) + 1;

        form.reset();

        atualizarLinksNumeracao();
        destacarNumero(novoIndice);

        mostrarDadosCadastro(novoIndice);
    });

    function preencherLinhaVazia(nome, email, nascimento, telefone) {
        const tabela = document.getElementById('tabela-cadastros');
        let linhaDisponivel = null;
        let indice = -1;
        for (let i = 0; i < tabela.rows.length; i++) {
            if (tabela.rows[i].cells[1].textContent === '') {
                linhaDisponivel = tabela.rows[i];
                indice = i;
                break;
            }
        }

        if (linhaDisponivel) {
            linhaDisponivel.cells[1].textContent = nome;
            linhaDisponivel.cells[2].textContent = email;
            linhaDisponivel.cells[3].textContent = nascimento;
            linhaDisponivel.cells[4].textContent = telefone;
        }
        return indice;
    }

    function atualizarLinksNumeracao() {
        document.querySelectorAll('.formulario-numeracao a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const index = this.getAttribute('data-index');
                mostrarDadosCadastro(index);
                destacarNumero(index);
            });
        });
    }

    function destacarNumero(index) {
        document.querySelectorAll('.formulario-numeracao a').forEach(link => {
            link.classList.remove('selecionado');
        });
        document.querySelector(`.formulario-numeracao a[data-index="${index}"]`).classList.add('selecionado');
    }
    function mostrarDadosCadastro(index) {
        const tabela = document.getElementById('tabela-cadastros');
        if (index <= tabela.rows.length) {
            const linha = tabela.rows[index - 1];
            const campos = document.querySelectorAll('.entrada-campo');
            if (campos.length >= 4 && linha.cells.length > 1) {
                campos[0].textContent = linha.cells[1].textContent;
                campos[1].textContent = linha.cells[2].textContent;
                campos[2].textContent = linha.cells[3].textContent;
                campos[3].textContent = linha.cells[4].textContent;
            }
        }
    }

    if (window.innerWidth <= 768) {
        document.querySelectorAll('.num-tabela').forEach(function (tab) {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.num-tabela, .cadastro-content').forEach(function (item) {
                    item.classList.remove('active');
                });

                tab.classList.add('active');
                document.querySelector(tab.getAttribute('data-target')).classList.add('active');
            });
        });
    }

    function openCadastro(evt, cadastroName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cadastroName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    atualizarLinksNumeracao();

    document.querySelectorAll('.navbar .menu a').forEach(link => {
        link.addEventListener('click', function () {
            overlay.style.display = 'none';
            menu.classList.remove('active');
            hamburgerImg.src = './icones/hamburguer.svg';
        });
    });

    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    let lastMatches = mediaQuery.matches;

    function rearrangeMenuItems() {
        const menu = document.querySelector('.navbar .menu');
        const desktopOrder = ['#cadastro-section', '#tabela-section', '#sobre-mim-section'];
        const tabletOrder = ['#tabela-section', '#sobre-mim-section', '#cadastro-section'];

        const order = mediaQuery.matches ? tabletOrder : desktopOrder;
        order.forEach(id => {
            const menuItem = menu.querySelector(`a[href="${id}"]`).parentElement;
            menu.appendChild(menuItem);
        });

        lastMatches = mediaQuery.matches;
    }

    rearrangeMenuItems();
    window.addEventListener('resize', function () {
        if (mediaQuery.matches !== lastMatches) {
            rearrangeMenuItems();
        }
    });
});