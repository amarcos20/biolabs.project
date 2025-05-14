document.addEventListener('DOMContentLoaded', () => {
    // --- Elements from *NEW* HTML ---
    const userInput = document.getElementById('user-input');
    const chatLog = document.getElementById('chat-log'); // Mudou de chat-window para chat-log
    const sendButton = document.getElementById('send-button');
    const quickActionButtons = document.querySelectorAll('.quick-action-button-myc'); // Nova classe para botões

    // --- State variable ---
    let currentState = null;

    // --- Function to Add Messages to Chat Window ---
    function addMessage(text, sender, id = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message'); // Classe genérica para estilo (opcional)

        if (sender === 'user') {
            messageDiv.classList.add('user-message'); // Usa a classe do CSS existente
        } else {
            messageDiv.classList.add('bot-message'); // Usa a classe do CSS existente
        }

        if (id) {
            messageDiv.id = id;
            if (id === 'typing-indicator') {
                 // Simple text indicator for typing - pode usar classes do CSS se definidas
                messageDiv.innerHTML = `<p><i>${text}</i></p>`; // Itálico para indicar pensamento
                chatLog.appendChild(messageDiv); // Append typing indicator
                chatLog.scrollTop = chatLog.scrollHeight; // Scroll
                return; // Don't add icon etc for typing indicator
            }
        }

        // Regular message formatting
        const messageParagraph = document.createElement('p');
        // Icons podem ser removidos se o CSS já tratar disso ou se não forem desejados
        // const icon = sender === 'user' ? '👤' : '🤖';
        // Replace newline characters with <br> for HTML display and linkify URLs
        const formattedText = text.replace(/\n/g, '<br>')
                                 .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: var(--secondary); text-decoration: underline;">$1</a>'); // Link estilo
        messageParagraph.innerHTML = /*`${icon} ` +*/ formattedText; // Ícone comentado
        messageDiv.appendChild(messageParagraph);
        chatLog.appendChild(messageDiv); // Append the actual message
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll after adding
    }

    // --- Function to reset conversation state ---
    function resetState() {
        currentState = null;
    }

    // --- Process User Input and Generate Bot Response ---
    function processUserMessage(messageText) {
        const trimmedMessage = messageText.trim();
        if (!trimmedMessage) return;

        addMessage(trimmedMessage, 'user'); // Add user's message

        // Clear input field and disable button (maybe re-enable later?)
        userInput.value = '';
        // sendButton.disabled = true; // Desabilitar pode ser chato se o bot demorar

        // Remove any existing typing indicator
        document.getElementById('typing-indicator')?.remove();

        // Show "thinking" message
        addMessage("MYC2YOU está a pensar...", 'bot', 'typing-indicator');

        // Simulate bot response after a delay
        setTimeout(() => {
            document.getElementById('typing-indicator')?.remove();
            handleConversationState(trimmedMessage.toLowerCase());
        }, 800 + Math.random() * 700); // Delay um pouco mais curto
    }

    // --- Handle Conversation State (A TUA LÓGICA PRINCIPAL - sem alterações internas) ---
    function handleConversationState(userMessage) {

        // 1. Check if we are in a specific multi-step conversation state first
        if (currentState === 'SEQUENCE_TYPE') {
            if (userMessage === 'proteína' || userMessage === 'proteina') {
                currentState = 'PROTEIN_ISOFORM';
                addMessage(`Qual isoforma da proteína MYC deseja? As principais são a 1 (RefSeq NP_002458.2, 454 aa) e a 2 (RefSeq NP_001341799.1, 453 aa). Responda com "1" ou "2".`, 'bot');
            } else if (userMessage === 'mrna') {
                currentState = 'MRNA_ISOFORM';
                addMessage(`Qual variante de transcrito (mRNA) do MYC deseja? As principais são a 1 (RefSeq NM_002467.6) e a 2 (RefSeq NM_001354870.1). Responda com "1" ou "2".`, 'bot');
            } else {
                addMessage(`Desculpe, não entendi. Por favor, responda com "proteína" ou "mRNA".`, 'bot');
            }
            return;

        } else if (currentState === 'PROTEIN_ISOFORM') {
             if (userMessage === '1') {
                 addMessage(`**Proteína MYC (isoforma 1 - RefSeq NP_002458.2):**\nMDFFRVVENQQPPATMPLNVSFTNRNYDLDYDSVQPYFYCDEEENFYQQQQQSELQPPAPSEDIWKKFELLPTPPLSPSRRSGLCSPSYVAVTPFSLRGDNDGGGGSFSTADQLEMVTELLGGDMVNQSFICDPDDETFIKNIIIQDCMWSGFSAAAKLVSEKLASYQAARKDSGSPNPARGHSVCSTSSLYLQDLSAAASECIDPSVVFPYPLNDSSSPKSCASQDSSAFSPSSDSLLSSTESSPQGSPEPLVLHEETPPTTSSDSEEEQEDEEEIDVVSVEKRQAPGKRSESGSPSAGGHSKPPHSPLVLKRCHVSTHQHNYAAPPSTRKDYPAAKRVKLDSVRVLRQISNNRKCTSPRSSDTEENVKRRTHNVLERQRRNELKRSFFALRDQIPELENNEKAPKVVILKKATAYILSVQAEEQKLISEEDLLRKRREQLKHKLEQLRNSCA`, 'bot');
                 resetState();
            } else if (userMessage === '2') {
                 addMessage(`**Proteína MYC (isoforma 2 - RefSeq NP_001341799.1):**\nMDFFRVVENQPPATMPLNVSFTNRNYDLDYDSVQPYFYCDEEENFYQQQQQSELQPPAPSEDIWKKFELLPTPPLSPSRRSGLCSPSYVAVTPFSLRGDNDGGGGSFSTADQLEMVTELLGGDMVNQSFICDPDDETFIKNIIIQDCMWSGFSAAAKLVSEKLASYQAARKDSGSPNPARGHSVCSTSSLYLQDLSAAASECIDPSVVFPYPLNDSSSPKSCASQDSSAFSPSSDSLLSSTESSPQGSPEPLVLHEETPPTTSSDSEEEQEDEEEIDVVSVEKRQAPGKRSESGSPSAGGHSKPPHSPLVLKRCHVSTHQHNYAAPPSTRKDYPAAKRVKLDSVRVLRQISNNRKCTSPRSSDTEENVKRRTHNVLERQRRNELKRSFFALRDQIPELENNEKAPKVVILKKATAYILSVQAEEQKLISEEDLLRKRREQLKHKLEQLRNSCA`, 'bot');
                 resetState();
            } else {
                addMessage(`Escolha inválida. Por favor, responda com "1" ou "2" para a isoforma da proteína.`, 'bot');
            }
            return;

        } else if (currentState === 'MRNA_ISOFORM') {
             if (userMessage === '1') {
                addMessage(`A sequência completa do mRNA do MYC (variante 1 - RefSeq NM_002467.6) é bastante longa. Pode encontrá-la no NCBI:\nhttps://www.ncbi.nlm.nih.gov/nuccore/NM_002467.6`, 'bot');
                resetState();
            } else if (userMessage === '2') {
                addMessage(`A sequência completa do mRNA do MYC (variante 2 - RefSeq NM_001354870.1) também é longa. Pode encontrá-la no NCBI:\nhttps://www.ncbi.nlm.nih.gov/nuccore/NM_001354870.1`, 'bot');
                resetState();
            } else {
                addMessage(`Escolha inválida. Por favor, responda com "1" ou "2" para a variante de mRNA.`, 'bot');
            }
            return;
        }

        // 2. If not in a specific state, handle keywords
        switch (userMessage) {
            case 'olá':
            case 'oi':
            case 'bom dia':
            case 'boa tarde':
            case 'boa noite':
                addMessage(`Olá! Sou o MYC2YOU, o seu assistente sobre o gene MYC. Como posso ajudar? Use os botões ou escreva a sua pergunta sobre: tamanho, localização, sequência, função, câncer, exões, descoberta, importância, estrutura 3D, domínios, regulação ou terapia.`, 'bot');
                break;

            // ... (TODOS OS TEUS OUTROS CASES: tamanho, localização, sequencia, função, etc. FICAM AQUI IGUAIS) ...
             case 'tamanho':
            case 'tamanho do gene':
                addMessage(`Informações sobre o tamanho do gene MYC (Humano):\n` +
                           `- **Localização:** Cromossoma 8q24.21\n` +
                           `- **Número de Exões:** 3 exões codificantes principais.\n` +
                           `- **Transcritos (mRNA):** Pelo menos 2 variantes principais de splicing (RefSeq NM_002467.6, NM_001354870.1).\n` +
                           `- **Tamanho Genómico (DNA):** ~5-7 kb (região do gene).\n` +
                           `- **Tamanho do mRNA (variante 1):** ~2.4 kb.\n` +
                           `- **Proteína (isoforma 1):** 454 aa (NP_002458.2)\n` +
                           `- **Proteína (isoforma 2):** 453 aa (NP_001341799.1)`, 'bot');
                break;

            case 'localização':
            case 'localizacao':
                addMessage(`O gene MYC está localizado no cromossoma humano 8, no braço longo (q), banda 24, sub-banda 21 (**8q24.21**).\nExplore no UCSC Genome Browser:\nhttps://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&position=chr8%3A127735434-127742951`, 'bot');
                break;

            case 'sequência':
            case 'sequencia':
                currentState = 'SEQUENCE_TYPE';
                addMessage(`Deseja a sequência da **proteína** MYC ou do seu **mRNA**? Responda com "proteína" ou "mRNA".`, 'bot');
                break;

            case 'função':
            case 'funcao':
                 addMessage(`A proteína MYC é um **fator de transcrição** bHLH-Zip que regula (~15% do genoma) genes envolvidos em:\n`+
                            `- Proliferação Celular (Ciclo Celular)\n` +
                            `- Crescimento Celular (Biossíntese)\n` +
                            `- Metabolismo (Glicólise, síntese nucleótidos)\n` +
                            `- Apoptose (dependente do contexto)\n` +
                            `- Inibição da Diferenciação\n` +
                            `Liga-se ao DNA (E-box) com o parceiro MAX.\n`+
                            `Fontes: Gene Ontology, PubMed`, 'bot');
                break;

            case 'cancro':
            case 'cancro':
            case 'doenças':
            case 'doencas':
                addMessage(`MYC é um potente **oncogene**, desregulado em muitos cancros (amplificação, translocação, sobre-expressão).\n` +
                           `- **Exemplos:** Linfoma de Burkitt (translocação t(8;14)), neuroblastoma (N-MYC), mama, pulmão, cólon, próstata.\n` +
                           `- **Papel:** Promove proliferação descontrolada, instabilidade genómica, angiogénese, metástase, alterações metabólicas (Warburg).\n` +
                           `Veja mutações no COSMIC: https://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=MYC`, 'bot');
                break;

            case 'exões':
            case 'exons':
                addMessage(`O gene MYC humano tem **3 exões**. Os exões 2 e 3 contêm a principal região codificante. O exão 1 é maioritariamente não-codificante mas importante para regulação.`, 'bot');
                break;

            case 'descoberta':
            case 'quando foi descoberto':
                 addMessage(`O oncogene viral **v-Myc** foi identificado no final dos anos 70 (vírus MC29 em galinhas).\n`+
                            `O proto-oncogene celular **c-Myc** foi descoberto no início dos anos 80.\n`+
                            `A **translocação t(8;14) no Linfoma de Burkitt** (1982-83) foi um marco crucial na ligação ao cancro humano.`, 'bot');
                break;

            case 'importância':
            case 'por que é estudado':
                 addMessage(`MYC é crucial porque:\n` +
                            `- É um **regulador mestre** do crescimento e metabolismo celular.\n` +
                            `- É um dos **oncogenes mais frequentemente desregulados** em cancro humano.\n` +
                            `- Compreendê-lo ajuda a perceber a biologia do cancro.\n` +
                            `- É um **alvo terapêutico** de grande interesse, apesar de difícil de inibir diretamente.`, 'bot');
                break;

            case 'estrutura':
            case 'estrutura 3d':
            case '3d':
                addMessage(`A estrutura 3D resolvida (ex: PDB **1NKP**) foca-se no domínio C-terminal **bHLH-Zip** de MYC dimerizado com **MAX** e ligado ao DNA (E-box).\n` +
                           `- O domínio **bHLH-Zip** permite a dimerização e ligação ao DNA.\n` +
                           `- A região N-terminal (TAD), importante para a função, é largamente desordenada.\n` +
                           `Vê na secção abaixo`, 'bot');
                break;

            case 'dominios':
            case 'domínios':
            case 'motifs':
                addMessage(`Domínios/Motifs principais de MYC:\n`+
                           `- **TAD (N-terminal):** Domínio de Transativação, contém as **MYC Boxes (MBI-IV)**, interage com co-fatores.\n` +
                           `- **NLS:** Sinal de Localização Nuclear.\n` +
                           `- **bHLH-Zip (C-terminal):** Basic Helix-Loop-Helix Leucine Zipper, para dimerização com MAX e ligação ao DNA.\n` +
                           `Explore no InterPro/Pfam: https://www.ebi.ac.uk/interpro/protein/UniProt/P01106/`, 'bot');
                break;

            case 'regulação':
            case 'regulacao':
            case 'elementos regulatórios':
            case 'elementos regulatorios':
                 addMessage(`A expressão de MYC é rigorosamente controlada a múltiplos níveis:\n` +
                            `- **Transcrição:** Por sinais de crescimento via promotores/enhancers (incl. super-enhancers).\n` +
                            `- **Estabilidade do mRNA:** Semi-vida curta, regulada por UTRs e microRNAs.\n` +
                            `- **Tradução:** Controlada.\n` +
                            `- **Estabilidade da Proteína:** Semi-vida muito curta (~20min), degradada via fosforilação/ubiquitinação (FBXW7).\n` +
                            `Explore no UCSC/Ensembl Genome Browser na região 8q24.21.`, 'bot');
                break;

            case 'terapia':
            case 'tratamento':
            case 'inibidores':
                 addMessage(`MYC é um alvo terapêutico chave mas **"undruggable"** por métodos clássicos.\n` +
                            `- **Desafio:** Fator de transcrição, sem bolso óbvio para ligação de fármacos.\n` +
                            `- **Estratégias:**\n` +
                            `  1. Inibição Indireta (ex: vias a montante/jusante).\n` +
                            `  2. Inibição da Transcrição (ex: **Inibidores de BET** como JQ1, Pelabresib - bloqueiam BRD4 em super-enhancers).\n` +
                            `  3. Inibição da interação MYC-MAX (difícil).\n` +
                            `  4. Degradadores de Proteínas (PROTACs) (em desenvolvimento).\n` +
                            `Pesquisa intensa continua.`, 'bot');
                 break;
                 
            // --- Adiciona resposta sobre 1NKP e a ligação ---
            case '1nkp':
                 addMessage(`**1NKP** é o código no **PDB (Protein Data Bank)** para a estrutura 3D do complexo formado pelos domínios bHLH-Zip das proteínas humanas **c-Myc** e **Max**, ligados a um fragmento de DNA contendo a sequência **E-box (CACGTG)**.\n` +
                            `Esta estrutura mostra como Myc/Max reconhecem e se ligam ao DNA.\n` +
                            `Podes encontrar na secção abaixo !`, 'bot');
                 break;

            case 'ligação 1nkp':
            case 'função da ligação':
            case 'o que faz a ligação':
                 addMessage(`A ligação do dímero **Myc-Max ao DNA (E-box)**, como vista na estrutura 1NKP, é essencial para:\n` +
                            `1.  **Ancorar** o complexo Myc-Max em regiões regulatórias de genes alvo.\n` +
                            `2.  Permitir que o domínio de transativação (TAD) do Myc **recrute co-ativadores** (HATs como p300/SAGA, remodeladores de cromatina, Mediador).\n` +
                            `3.  **Ativar a transcrição** desses genes pela RNA Polimerase II.\n` +
                            `Em suma, esta ligação "liga" os genes controlados por Myc, promovendo processos como proliferação e crescimento celular.`, 'bot');
                 break;


            default:
                addMessage(`Foca-te num dos botões ou pergunte sobre: tamanho, localização, sequência, função, cancro, exões, descoberta, importância, estrutura 3D, domínios/motifs, regulação, terapia, 1NKP e desta maneira eu posso ajudar-te`, 'bot');
                break;
        }
    }

    // --- Event Listeners ---

    // Listener para o botão Enviar
    sendButton.addEventListener('click', () => {
        processUserMessage(userInput.value);
    });

    // Listener para a tecla Enter no input
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede nova linha no input (se fosse textarea)
            processUserMessage(userInput.value);
        }
    });

    // Enable/disable send button based on input (opcional, pode remover se preferir sempre ativo)
    /* userInput.addEventListener('input', () => {
        sendButton.disabled = userInput.value.trim() === '';
    }); */

    // Handle quick action button clicks
    quickActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            if (action) {
                userInput.value = action; // Coloca a ação no input (visual)
                processUserMessage(action); // Processa a ação diretamente
                userInput.value = ''; // Limpa o input depois
            }
        });
    });

    // Initial greeting message from the bot
    addMessage("Olá! Sou o MYC2YOU. Pergunte-me sobre o gene MYC usando os botões ou escrevendo a sua questão.", 'bot');

}); // End of DOMContentLoaded
