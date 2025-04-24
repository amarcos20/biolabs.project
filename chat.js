document.addEventListener('DOMContentLoaded', () => {
    // --- Elements from HTML ---
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-log');
    const sendButton = document.getElementById('send-button');
    const quickActionButtons = document.querySelectorAll('.quick-action-button');

    // --- Dados do Gene MYC (substitua isto pelo teu conteúdo) ---
    const mycInfo = `Sequence DNA(FASTA) isomorf 1:
>NM_002467.6 Homo sapiens MYC proto-oncogene, bHLH transcription factor (MYC),
transcript variant 1, mRNA
AACTCGCTGTAGTAATTCCAGCGAGAGGCAGAGGGAGCGAGCGGGCGGCCGGCTAGGGTGGAAGAGCCGG
GCGAGCAGAGCTGCGCTGCGGGCGTCCTGGGAAGGGAGATCCGGAGCGAATAGGGGGCTTCGCCTCTGGC
CCAGCCCTCCCGCTGATCCCCCAGCCAGCGGTCCGCAACCCTTGCCGCATCCACGAAACTTTGCCCATAG
CAGCGGGCGGGCACTTTGCACTGGAACTTACAACACCCGAGCAAGGACGCGACTCTCCCGACGCGGGGAG
GCTATTCTGCCCATTTGGGGACACTTCCCCGCCGCTGCCAGGACCCGCTTCTCTGAAAGGCTCTCCTTGC
AGCTGCTTAGACGCTGGATTTTTTTCGGGTAGTGGAAAACCAGCAGCCTCCCGCGACGATGCCCCTCAAC
GTTAGCTTCACCAACAGGAACTATGACCTCGACTACGACTCGGTGCAGCCGTATTTCTACTGCGACGAGG
AGGAGAACTTCTACCAGCAGCAGCAGCAGAGCGAGCTGCAGCCCCCGGCGCCCAGCGAGGATATCTGGAA
GAAATTCGAGCTGCTGCCCACCCCGCCCCTGTCCCCTAGCCGCCGCTCCGGGCTCTGCTCGCCCTCCTAC
GTTGCGGTCACACCCTTCTCCCTTCGGGGAGACAACGACGGCGGTGGCGGGAGCTTCTCCACGGCCGACC
AGCTGGAGATGGTGACCGAGCTGCTGGGAGGAGACATGGTGAACCAGAGTTTCATCTGCGACCCGGACGA
CGAGACCTTCATCAAAAACATCATCATCCAGGACTGTATGTGGAGCGGCTTCTCGGCCGCCGCCAAGCTC
GTCTCAGAGAAGCTGGCCTCCTACCAGGCTGCGCGCAAAGACAGCGGCAGCCCGAACCCCGCCCGCGGCC
ACAGCGTCTGCTCCACCTCCAGCTTGTACCTGCAGGATCTGAGCGCCGCCGCCTCAGAGTGCATCGACCC
CTCGGTGGTCTTCCCCTACCCTCTCAACGACAGCAGCTCGCCCAAGTCCTGCGCCTCGCAAGACTCCAGC
GCCTTCTCTCCGTCCTCGGATTCTCTGCTCTCCTCGACGGAGTCCTCCCCGCAGGGCAGCCCCGAGCCCC
TGGTGCTCCATGAGGAGACACCGCCCACCACCAGCAGCGACTCTGAGGAGGAACAAGAAGATGAGGAAGA
AATCGATGTTGTTTCTGTGGAAAAGAGGCAGGCTCCTGGCAAAAGGTCAGAGTCTGGATCACCTTCTGCT
GGAGGCCACAGCAAACCTCCTCACAGCCCACTGGTCCTCAAGAGGTGCCACGTCTCCACACATCAGCACA
ACTACGCAGCGCCTCCCTCCACTCGGAAGGACTATCCTGCTGCCAAGAGGGTCAAGTTGGACAGTGTCAG
AGTCCTGAGACAGATCAGCAACAACCGAAAATGCACCAGCCCCAGGTCCTCGGACACCGAGGAGAATGTC
AAGAGGCGAACACACAACGTCTTGGAGCGCCAGAGGAGGAACGAGCTAAAACGGAGCTTTTTTGCCCTGC
GTGACCAGATCCCGGAGTTGGAAAACAATGAAAAGGCCCCCAAGGTAGTTATCCTTAAAAAAGCCACAGC
ATACATCCTGTCCGTCCAAGCAGAGGAGCAAAAGCTCATTTCTGAAGAGGACTTGTTGCGGAAACGACGA
GAACAGTTGAAACACAAACTTGAACAGCTACGGAACTCTTGTGCGTAAGGAAAAGTAAGGAAAACGATTC
CTTCTAACAGAAATGTCCTGAGCAATCACCTATGAACTTGTTTCAAATGCATGATCAAATGCAACCTCAC
AACCTTGGCTGAGTCTTGAGACTGAAAGATTTAGCCATAATGTAAACTGCCTCAAATTGGACTTTGGGCA
TAAAAGAACTTTTTTATGCTTACCATCTTTTTTTTTTCTTTAACAGATTTGTATTTAAGAATTGTTTTTA
AAAAATTTTAAGATTTACACAATGTTTCTCTGTAAATATTGCCATTAAATGTAAATAACTTTAATAAAAC
GTTTATAGCAGTTACACAGAATTTCAATCCTAGTATATAGTACCTAGTATTATAGGTACTATAAACCCTA
ATTTTTTTTATTTAAGTACATTTTGCTTTTTAAAGTTGATTTTTTTCTATTGTTTTTAGAAAAAATAAAA
TAACTGGCAAATATATCATTGAGCCAAATCTTAAGTTGTGAATGTTTTGTTTCGTTTCTTCCCCCTCCCA
ACCACCACCATCCCTGTTTGTTTTCATCAATTGCCCCTTCAGAGGGTGGTCTTAAGAAAGGCAAGAGTTT
TCCTCTGTTGAAATGGGTCTGGGGGCCTTAAGGTCTTTAAGTTCTTGGAGGTTCTAAGATGCTTCCTGGA
GACTATGATAACAGCCAGAGTTGACAGTTAGAAGGAATGGCAGAAGGCAGGTGAGAAGGTGAGAGGTAGG
CAAAGGAGATACAAGAGGTCAAAGGTAGCAGTTAAGTACACAAAGAGGCATAAGGACTGGGGAGTTGGGA
GGAAGGTGAGGAAGAAACTCCTGTTACTTTAGTTAACCAGTGCCAGTCCCCTGCTCACTCCAAACCCAGG
AATTCTGCCCAGTTGATGGGGACACGGTGGGAACCAGCTTCTGCTGCCTTCACAACCAGGCGCCAGTCCT
GTCCATGGGTTATCTCGCAAACCCCAGAGGATCTCTGGGAGGAATGCTACTATTAACCCTATTTCACAAA
CAAGGAAATAGAAGAGCTCAAAGAGGTTATGTAACTTATCTGTAGCCACGCAGATAATACAAAGCAGCAA
TCTGGACCCATTCTGTTCAAAACACTTAACCCTTCGCTATCATGCCTTGGTTCATCTGGGTCTAATGTG
CTGAGATCAAGAAGGTTTAGGACCTAATGGACAGACTCAAGTCATAACAATGCTAAGCTCTATTTGTGTCC
CAAGCACTCCTAAGCATTTTATCCCTAACTCTACATCAACCCCATGAAGGAGATACTGTTGATTTCCCCA
TATTAGAAGTAGAGAGGGAAGCTGAGGCACACAAAGACTCATCCACATGCCCAAGATTCACTGATAGGGA
AAAGTGGAAGCGAGATTTGAACCCAGGCTGTTTACTCCTAACCTGTCCAAGCCACCTCTCAGACGACGGTAGGAATCAGCTGGCTGCTTGTGAGTACAGGAGTTACAGTCCAGTGGGTTATGTTTTTTAAGTCTCAACAT
CTAAGCCTGGTCAGGCATCAGTTCCCCTTTTTTTGTGATTTATTTTGTTTTTATTTTGTTGTTCATTGTT
TAATTTTTCCTTTTACAATGAGAAGGTCACCATCTTGACTCCTACCTTAGCCATTTGTTGAATCAGACTC
ATGACGGCTCCTGGGAAGAAGCCAGTTCAGATCATAAAATAAAACATATTTATTCTTTGTCATGGGAGTC
ATTATTTTAGAAACTACAAACTCTCCTTGCTTCCATCCTTTTTTACATACTCATGACACATGCTCATCCT
GAGTCCTTGAAAAGGTATTTTTGAACATGTGTATTAATTATAAGCCTCTGAAAACCTATGGCCCAAACCA
GAAATGATGTTGATTATATAGGTAAATGAAGGATGCTATTGCTGTTCTAATTACCTCATTGTCTCAGTCT
CAAAGTAGGTCTTCAGCTCCCTGTACTTTGGGATTTTAATCTACCACCACCCATAAATCAATAAATAATT
ACTTTCTTTGA
Sequence protein (fasta) isomorf 2:
>NP_001341799.1 myc proto-oncogene protein isoform 2 [Homo sapiens]
MDFFRVVENQPPATMPLNVSFTNRNYDLDYDSVQPYFYCDEEENFYQQQQQSELQPPAPSEDIWKKFELL
PTPPLSPSRRSGLCSPSYVAVTPFSLRGDNDGGGGSFSTADQLEMVTELLGGDMVNQSFICDPDDETFIK
NIIIQDCMWSGFSAAAKLVSEKLASYQAARKDSGSPNPARGHSVCSTSSLYLQDLSAAASECIDPSVVF
PYPLNDSSSPKSCASQDSSAFSPSSDSLLSSTESSPQGSPEPLVLHEETPPTTSSDSEEEQEDEEEIDVVS
SVEKRQAPGKRSESGSPSAGGHSKPPHSPLVLKRCHVSTHQHNYAAPPSTRKDYPAAKRVKLDSVRVLRQ
ISNNRKCTSPRSSDTEENVKRRTHNVLERQRRNELKRSFFALRDQIPELENNEKAPKVVILKKATAYILS
VQAEEQKLISEEDLLRKRREQLKHKLEQLRNSCATamanho: DNA isomorf 1 - 3721 bp
DNA isomorf 2 - 4515 bp
Protein isomorf 1 - 454 aa
Protein isomorf 1 - 453 aa
Proteína que forma: NP_002458 - myc proto-oncogene protein isoform 1 [Homo sapiens]
NP_001341799 - myc proto-oncogene protein isoform 2 [Homo sapiens]
Quando foi descoberto: 1979.->
https://pmc.ncbi.nlm.nih.gov/articles/PMC3345192/? [The road to MYC’s discovery was
paved by early studies of fulminant chicken tumors caused by oncogenic retroviruses,
leading to the identification of the v-myc oncogene that causes myelocytomatosis
(leukemia and sarcoma) (Duesberg and Vogt, 1979; Hu et al., 1979; Sheiness and Bishop,
1979)]
Importância do gene e porque é estudado: A large body of evidence shows that Myc genes and
proteins are highly relevant for treating tumors.Except for early response genes, Myc
universally upregulates gene expression. Furthermore, the upregulation is nonlinear.
Genes for which expression is already significantly upregulated in the absence of Myc
are strongly boosted in the presence of Myc, whereas genes for which expression is low
in the absence Myc get only a small boost when Myc is present.
Inactivation of SUMO-activating enzyme (SAE1 / SAE2) in the presence of Myc
hyperactivation results in mitotic catastrophe and cell death in cancer cells. Hence
inhibitors of SUMOylation may be a possible treatment for cancer.
Amplification of the MYC gene was found in a significant number of epithelial ovarian
cases. In TCGA datasets, the amplification of Myc occurs in several cancer types,
including breast, colorectal, pancreatic, gastric, and uterine cancers.
In the experimental transformation process of normal cells into cancer cells, the MYC
gene can cooperate with the RAS gene.
Expression of Myc is highly dependent on BRD4 function in some cancers.BET inhibitors
have been used to successfully block Myc function in pre-clinical cancer models and are
currently being evaluated in clinical trials.
MYC expression is controlled by a wide variety of noncoding RNAs, including miRNA,
lncRNA, and circRNA. Some of these RNAs have been shown to be specific for certain
types of human tissues and tumors. Changes in the expression of such RNAs can
potentially be used to develop targeted tumor therapy.
Bónus: Localização - 8q24.21
Nº de Exões - 3`;

    // --- Elements from HTML ---
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-log');
    const sendButton = document.getElementById('send-button');
    const quickActionButtons = document.querySelectorAll('.quick-action-button');

    // --- Function to Add Messages to Chat Window ---
    function addMessage(text, sender, id = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        const senderClass = sender === 'user' ? 'user-message' : 'bot-message';
        messageDiv.classList.add(senderClass);

        if (id) {
            messageDiv.id = id;
            if (id === 'typing-indicator') {
                messageDiv.classList.add('typing-indicator');
            }
        }

        const messageParagraph = document.createElement('p');
        const icon = sender === 'user' ? '👤' : '🤖';
        messageParagraph.innerHTML = `${icon} ${text.replace(/\n/g, '<br>')}`;
        messageDiv.appendChild(messageParagraph);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    }

    // --- Process User Input and Generate Bot Response ---
    function processUserMessage(messageText) {
        if (!messageText || messageText.trim() === '') return;

        // Add user's message to chat window
        addMessage(messageText, 'user');

        // Clear input field
        userInput.value = '';
        sendButton.disabled = true;

        // Remove any existing typing indicator
        document.getElementById('typing-indicator')?.remove();

        // Show "thinking" message
        addMessage("MYC2YOU está a pensar...", 'bot', 'typing-indicator');

        // Simulate bot response after a delay
        setTimeout(() => {
            document.getElementById('typing-indicator')?.remove();
            const botReply = generateResponse(messageText); // Passa a mensagem para a função
            addMessage(botReply, 'bot'); // Add bot's reply to chat window
        }, 1000 + Math.random() * 800); // Random delay for realism
    }

   // --- Response Generation Logic ---
function generateResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase().trim();

    // Deteção da intenção com base em palavras-chave
    if (lowerMsg.includes("sequência do gene myc")) {
        const sequenceIsomorf1Start = mycInfo.indexOf("AACTCGCTGTAGTAATTCCAGCG"); // Encontra o início da sequência
        const sequenceIsomorf1End = mycInfo.indexOf("Sequence protein (fasta) isomorf 1:"); // Encontra o fim da sequência
        if (sequenceIsomorf1Start !== -1 && sequenceIsomorf1End !== -1) {
            const sequence = mycInfo.substring(sequenceIsomorf1Start, sequenceIsomorf1End).trim();
            return `A sequência do gene MYC (isomorf 1) é: ${sequence}`;
        } else {
            return "Não foi possível encontrar a sequência do gene MYC.";
        }
    }
       else if (lowerMsg.includes("proteína que forma isomorf 1")) {
        const Protein1Start = mycInfo.indexOf("MDFFRVVENQ");
        const Protein1End = mycInfo.indexOf("Sequence DNA (fasta) isomorf 2:");
        if (Protein1Start !== -1 && Protein1End !== -1) {
            const proteina = mycInfo.substring(Protein1Start, Protein1End).trim();
            return `Proteína que forma o isomorf 1:\n ${proteina}`;
        } else {
            return "Não foi possível encontrar as informações da proteína.";
        }
    }
    else if (lowerMsg.includes("DNA (fasta) isomorf 2")) {
        const isom2start = mycInfo.indexOf("GGAGTTTATTCATAACGCGCTCTCCA");
        const isom2end = mycInfo.indexOf("Tamanho: DNA isomorf 1");
        if (isom2start !== -1 && isom2end !== -1) {
            const Isomorf2 = mycInfo.substring(isom2start, isom2end).trim();
            return `A sequência Isomorf 2:\n ${Isomorf2}`;
        } else {
            return "Não foi possível encontrar as informações da proteína.";
        }
    }
    else if (lowerMsg.includes("como usar o visualizador")) {
        const visualizadorStart = mycInfo.indexOf("Use os controles para alternar entre diferentes representações");
        if (visualizadorStart !== -1 ) {
            const Visualizador = mycInfo.substring(visualizadorStart).trim();
            return `Informações:\n ${Visualizador}`;
        } else {
            return "Não foi possível encontrar as informações do visualizador.";
        }
    }

    else if (lowerMsg.includes("onde e o gene localizado")) {
        const geneStart = mycInfo.indexOf("Localização -");
        const geneEnd = mycInfo.indexOf("Nº de Exões -");
        if (geneStart !== -1 && geneEnd !== -1) {
            const geneInfo = mycInfo.substring(geneStart,geneEnd).trim();
            return `${geneInfo}`;
        } else {
            return "Não foi possível encontrar a localização do gene.";
        }
    }

    else if (lowerMsg.includes("Nº de Exões ")) {
        const exõesStart = mycInfo.indexOf("Nº de Exões -");
        const exõesEnd = mycInfo.indexOf("Sequence DNA");
        if (exõesStart !== -1 && exõesEnd !== -1) {
            const exõesInfo = mycInfo.substring(exõesStart).trim();
            return `${exõesInfo}`;
        } else {
            return "Não foi possível encontrar o Nº de Exões .";
        }
    }

    else if (lowerMsg.includes("quando foi descoberto")) {
        const descobertoStart = mycInfo.indexOf("Quando foi descoberto");
        const descobertoEnd = mycInfo.indexOf("https://pmc.ncbi.nlm.nih.gov/articles/PMC3345192/?");
        if (descobertoStart !== -1 && descobertoEnd !== -1) {
            const descobertoInfo = mycInfo.substring(descobertoStart,descobertoEnd).trim();
            return `${descobertoInfo}`;
        } else {
            return "Não foi possível encontrar as informações do descobrimento.";
        }
    }
      else if (lowerMsg.includes("quais os tipos de canceres amplifica")) {
        const cancerStart = mycInfo.indexOf("including breast");
        const cancerEnd = mycInfo.indexOf("In the experimental");
        if (cancerStart !== -1 && cancerEnd !== -1) {
            const cancerInfo = mycInfo.substring(cancerStart,cancerEnd).trim();
            return `Os tipos de cancro que amplifica:\n ${cancerInfo}`;
        } else {
            return "Não foi possível encontrar as informações do Cancer.";
        }
    }
         else if (lowerMsg.includes("Abreviaturas")) {

        return `
            - Abreviaturas:
                 * SUMO: small ubiquitin-related modifier.
                 * RAS: Abreviatura de "rat sarcoma" 
                 * BET: Abreviatura de Bromodomain and Extra-Terminal Domain.
                 * circRNA: Abreviatura de circular RNA.
                 * IncRNA: Abreviatura de long non-coding RNA.
                 * miRNA: Abreviatura de microRNA.
            `;
        }
     else if (lowerMsg.includes("quais os sintomas")) {

        return `
            Os sintomas em relação ao gene são:
                 * Dores de cabeça.
                 * Cansaço.
                 * Irritabilidade.
            `;
        }

    else if (lowerMsg.includes("ola") || lowerMsg.includes("oi") || lowerMsg.includes("hey") || lowerMsg.includes("bom dia") || lowerMsg.includes("boa tarde")) {
        return 'Olá! 👋 Como posso ajudar você hoje?';
    }
    else if (lowerMsg.includes("obrigado") || lowerMsg.includes("ok") || lowerMsg.includes("certo")) {
        return 'Entendido! 😊 Precisa de mais alguma coisa?';
    }

    else if (lowerMsg.includes("adeus") || lowerMsg.includes("xau") || lowerMsg.includes("ate logo")) {
        return 'Até breve! 🌟 Se precisar, estou aqui.';
    }
    
    
    else {
        return `Desculpe, não entendi muito bem "${userMessage}". Tente perguntar algo como: 
                "Qual a sequência do gene MYC?" ou "Que proteínas formam os isomorfos?".`;
    }
}

    // --- Event Listeners ---
    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userText = userInput.value.trim();
        processUserMessage(userText);
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && userInput.value.trim() !== '') {
            event.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    quickActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const query = button.dataset.query;
            if (query) {
                processUserMessage(query);
            }
        });
    });

    userInput.addEventListener('input', () => {
        sendButton.disabled = userInput.value.trim() === '';
    });

    sendButton.disabled = userInput.value.trim() === '';
});
