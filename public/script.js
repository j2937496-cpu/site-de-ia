/* =========================================================
   UNIVERSO ARTIFICIAL
   JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTOS DO CABEÇALHO
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("mainNavigation");

const themeButton =
    document.getElementById("themeButton");


/* =========================================================
   MENU MOBILE
========================================================= */

if (menuButton && navigation) {

    menuButton.addEventListener("click", (event) => {

        /*
         * Impede que o clique se propague para outros
         * elementos da página.
         */

        event.stopPropagation();

        const isOpen =
            navigation.classList.toggle(
                "mobile-visible"
            );


        /*
         * Transforma as três barrinhas em X.
         */

        menuButton.classList.toggle(
            "active",
            isOpen
        );


        /*
         * Atualiza acessibilidade.
         */

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* =====================================================
       FECHAR MENU AO CLICAR EM UMA OPÇÃO
    ===================================================== */

    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "mobile-visible"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    /* =====================================================
       FECHAR CLICANDO FORA
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideMenu =
                navigation.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                navigation.classList.remove(
                    "mobile-visible"
                );

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       FECHAR AO AUMENTAR A TELA
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 800) {

                navigation.classList.remove(
                    "mobile-visible"
                );

                menuButton.classList.remove(
                    "active"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   MODO CLARO / ESCURO
========================================================= */

function updateThemeIcon() {

    if (!themeButton) {
        return;
    }

    if (
        document.body.classList.contains(
            "light-mode"
        )
    ) {

        themeButton.textContent = "🌙";

        themeButton.setAttribute(
            "aria-label",
            "Ativar modo escuro"
        );

        themeButton.setAttribute(
            "title",
            "Ativar modo escuro"
        );

    } else {

        themeButton.textContent = "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Ativar modo claro"
        );

        themeButton.setAttribute(
            "title",
            "Ativar modo claro"
        );

    }

}


/* =========================================================
   CARREGAR TEMA SALVO
========================================================= */

const savedTheme =
    localStorage.getItem(
        "universoArtificialTheme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

}


updateThemeIcon();


/* =========================================================
   ALTERAR TEMA
========================================================= */

if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );


            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            /*
             * Salva a preferência do usuário.
             */

            localStorage.setItem(
                "universoArtificialTheme",
                isLight
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =========================================================
   ROBÔ — OLHOS ACOMPANHAM O MOUSE
========================================================= */

const robotButton =
    document.getElementById("robotButton");

const pupils =
    document.querySelectorAll(".pupil");


document.addEventListener(
    "mousemove",
    (event) => {

        pupils.forEach(
            (pupil) => {

                const eye =
                    pupil.parentElement;

                const rect =
                    eye.getBoundingClientRect();


                const eyeCenterX =
                    rect.left +
                    rect.width / 2;

                const eyeCenterY =
                    rect.top +
                    rect.height / 2;


                const mouseX =
                    event.clientX;

                const mouseY =
                    event.clientY;


                const angle =
                    Math.atan2(
                        mouseY - eyeCenterY,
                        mouseX - eyeCenterX
                    );


                const maxDistance = 8;


                const distance =
                    Math.min(
                        maxDistance,

                        Math.hypot(
                            mouseX - eyeCenterX,
                            mouseY - eyeCenterY
                        ) / 20
                    );


                const pupilX =
                    Math.cos(angle) *
                    distance;

                const pupilY =
                    Math.sin(angle) *
                    distance;


                pupil.style.transform =
                    `translate(
                        calc(-50% + ${pupilX}px),
                        calc(-50% + ${pupilY}px)
                    )`;

            }
        );

    }
);


/* =========================================================
   CHAT
========================================================= */

const chatSidebar =
    document.getElementById(
        "chatSidebar"
    );

const closeChat =
    document.getElementById(
        "closeChat"
    );

const heroChatButton =
    document.getElementById(
        "heroChatButton"
    );


function openChat() {

    if (!chatSidebar) {
        return;
    }

    chatSidebar.classList.add(
        "active"
    );


    setTimeout(
        () => {

            const input =
                document.getElementById(
                    "chatInput"
                );

            if (input) {
                input.focus();
            }

        },
        400
    );

}


function closeChatWindow() {

    if (!chatSidebar) {
        return;
    }

    chatSidebar.classList.remove(
        "active"
    );

}


if (robotButton) {

    robotButton.addEventListener(
        "click",
        openChat
    );

}


if (heroChatButton) {

    heroChatButton.addEventListener(
        "click",
        openChat
    );

}


if (closeChat) {

    closeChat.addEventListener(
        "click",
        closeChatWindow
    );

}


/* =========================================================
   ESC FECHA O CHAT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            chatSidebar &&
            chatSidebar.classList.contains(
                "active"
            )
        ) {

            closeChatWindow();

        }

    }
);


/* =========================================================
   CHATBOT
========================================================= */

const chatForm =
    document.getElementById(
        "chatForm"
    );

const chatInput =
    document.getElementById(
        "chatInput"
    );

const chatMessages =
    document.getElementById(
        "chatMessages"
    );


const responses = [

    {
        keywords: [
            "o que é ia",
            "o que e ia",
            "inteligência artificial",
            "inteligencia artificial"
        ],

        response:
            "Inteligência Artificial é uma área da computação que desenvolve sistemas capazes de executar tarefas que normalmente exigiriam capacidades humanas, como reconhecer padrões, compreender linguagem, analisar dados e gerar conteúdos."
    },

    {
        keywords: [
            "machine learning",
            "aprendizado de máquina"
        ],

        response:
            "Machine Learning, ou aprendizado de máquina, é uma área da IA em que modelos aprendem padrões a partir de dados para fazer previsões, classificações ou outras tarefas."
    },

    {
        keywords: [
            "deep learning",
            "aprendizado profundo"
        ],

        response:
            "Deep Learning utiliza redes neurais com várias camadas. É muito usado em reconhecimento de imagens, linguagem, áudio e sistemas generativos."
    },

    {
        keywords: [
            "como a ia aprende",
            "como a inteligencia artificial aprende",
            "como a ia funciona"
        ],

        response:
            "Durante o treinamento, um modelo recebe exemplos e ajusta seus parâmetros para encontrar padrões nos dados. Depois, utiliza esses padrões para produzir resultados em novos dados."
    },

    {
        keywords: [
            "chatgpt",
            "chat gpt"
        ],

        response:
            "ChatGPT é um assistente de IA desenvolvido pela OpenAI. Ele pode ajudar em explicações, escrita, programação, análise e geração de ideias."
    },

    {
        keywords: [
            "gemini"
        ],

        response:
            "Gemini é uma família de modelos e ferramentas de IA do Google utilizada em conversação, geração de conteúdo e processamento de diferentes tipos de informação."
    },

    {
        keywords: [
            "claude"
        ],

        response:
            "Claude é uma família de modelos de IA desenvolvida pela Anthropic, utilizada para conversação, análise, escrita e tarefas de raciocínio."
    },

    {
        keywords: [
            "ia generativa",
            "inteligencia artificial generativa"
        ],

        response:
            "IA generativa é capaz de criar novos conteúdos a partir de padrões aprendidos, incluindo textos, imagens, áudio, vídeo e código."
    },

    {
        keywords: [
            "redes neurais",
            "rede neural"
        ],

        response:
            "Redes neurais artificiais são modelos computacionais formados por camadas de unidades matemáticas que transformam dados e ajustam parâmetros durante o treinamento."
    },

    {
        keywords: [
            "prompt",
            "prompts"
        ],

        response:
            "Um prompt é a instrução fornecida a um sistema de IA. Um bom prompt normalmente apresenta objetivo, contexto, formato esperado e restrições."
    },

    {
        keywords: [
            "alucinação",
            "alucinacao",
            "erro da ia"
        ],

        response:
            "Uma IA pode produzir informações incorretas ou inventadas com aparência de certeza. Por isso, informações importantes devem ser verificadas em fontes confiáveis."
    },

    {
        keywords: [
            "futuro da ia",
            "futuro da inteligencia artificial"
        ],

        response:
            "Entre as tendências estão modelos multimodais, agentes de IA, robótica avançada, ferramentas personalizadas e novas aplicações em ciência, educação e indústria."
    },

    {
        keywords: [
            "robotica",
            "robótica",
            "robo",
            "robô"
        ],

        response:
            "A combinação entre IA e robótica permite que máquinas percebam ambientes, interpretem informações e executem ações."
    }

];


const defaultResponse =
    "Posso explicar temas como Inteligência Artificial, Machine Learning, Deep Learning, IA generativa, redes neurais, prompts e robótica. Faça uma pergunta mais específica.";


function getAIResponse(question) {

    const normalized =
        question
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();


    for (
        const item of responses
    ) {

        for (
            const keyword of item.keywords
        ) {

            const normalizedKeyword =
                keyword
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    );


            if (
                normalized.includes(
                    normalizedKeyword
                )
            ) {

                return item.response;

            }

        }

    }


    return defaultResponse;

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   ADICIONAR MENSAGEM
========================================================= */

function addMessage(
    text,
    sender = "bot"
) {

    if (!chatMessages) {
        return;
    }


    const message =
        document.createElement(
            "div"
        );


    message.classList.add(
        "message"
    );


    if (sender === "user") {

        message.classList.add(
            "user-message"
        );


        message.innerHTML = `
            <div class="message-content">
                ${escapeHTML(text)}
            </div>
        `;

    } else {

        message.classList.add(
            "bot-message"
        );


        message.innerHTML = `
            <div class="message-avatar">
                AI
            </div>

            <div class="message-content">
                ${text}
            </div>
        `;

    }


    chatMessages.appendChild(
        message
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   DIGITAÇÃO
========================================================= */

function showTyping() {

    if (!chatMessages) {
        return;
    }


    const typing =
        document.createElement(
            "div"
        );


    typing.className =
        "message bot-message";

    typing.id =
        "typingMessage";


    typing.innerHTML = `

        <div class="message-avatar">
            AI
        </div>

        <div class="message-content">
            <span>●</span>
            <span>●</span>
            <span>●</span>
        </div>

    `;


    chatMessages.appendChild(
        typing
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function removeTyping() {

    const typing =
        document.getElementById(
            "typingMessage"
        );


    if (typing) {
        typing.remove();
    }

}


/* =========================================================
   ENVIO DO CHAT
========================================================= */

if (chatForm) {

    chatForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!chatInput) {
                return;
            }


            const question =
                chatInput.value.trim();


            if (!question) {
                return;
            }


            addMessage(
                question,
                "user"
            );


            chatInput.value = "";

            chatInput.disabled = true;


            showTyping();


            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        600
                    )
            );


            removeTyping();


            try {

    const result = await fetch(
        "/.netlify/functions/chat",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })
        }
    );

    const data = await result.json();

    if (!result.ok) {
        throw new Error(
            data.error || "Erro ao conversar com a IA."
        );
    }

    addMessage(
        escapeHTML(data.response)
    );

} catch (error) {

    console.error(error);

    addMessage(
        "Não consegui me conectar à IA. Verifique a configuração da API."
    );

}


            chatInput.disabled =
                false;

            chatInput.focus();

        }
    );

}


/* =========================================================
   SUGESTÕES DO CHAT
========================================================= */

document
    .querySelectorAll(
        ".suggestions button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    if (!chatInput) {
                        return;
                    }


                    chatInput.value =
                        button.dataset.question;


                    chatForm.dispatchEvent(
                        new Event(
                            "submit",
                            {
                                bubbles: true,
                                cancelable: true
                            }
                        )
                    );

                }
            );

        }
    );


/* =========================================================
   ANIMAÇÃO DAS SEÇÕES
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .08
        }
    );


document
    .querySelectorAll(
        ".content-section, .future-section"
    )
    .forEach(
        section => {

            section.style.opacity =
                "0";

            section.style.transform =
                "translateY(25px)";

            section.style.transition =
                "opacity .7s ease, transform .7s ease";

            observer.observe(
                section
            );

        }
    );


/* =========================================================
   LOG
========================================================= */

console.log(
    "Universo Artificial carregado com sucesso."
);