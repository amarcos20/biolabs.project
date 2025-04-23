from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import PyPDF2  # Importa a biblioteca PyPDF2

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("Erro: A variável de ambiente GOOGLE_API_KEY não está definida.")
    exit()

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# Instruções de sistema
SYSTEM_INSTRUCTIONS = """
Tu és um especialista no gene MYC e no correspondente PDF que te vou enviar.
Deves estar apto para responder a toda e qualquer pergunta acerca dos temas correspondentes, corretamente.
Usa a informação contida no PDF para responder às perguntas.
"""

# Função para extrair texto de um ficheiro PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()
        return text
    except FileNotFoundError:
        return "Erro: Ficheiro PDF não encontrado."
    except Exception as e:
        return f"Erro ao extrair texto do PDF: {e}"

# Caminho para o ficheiro PDF (ALTERA ISTO PARA O CAMINHO DO TEU FICHEIRO)
PDF_FILE_PATH = "MYC.pdf"

# Extrai o texto do PDF
pdf_text = extract_text_from_pdf(PDF_FILE_PATH)

# Inicializa o chat globalmente
chat = model.start_chat(history=[])

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    global chat

    try:
        data = request.get_json()
        message = data['message']

        # Incorpora as instruções de sistema, o texto do PDF e a mensagem do utilizador no prompt
        prompt_com_instrucoes = SYSTEM_INSTRUCTIONS + "\n\nCONTEÚDO DO PDF:\n" + + pdf_text + "\n\nPERGUNTA:\n" + message

        response = chat.send_message(prompt_com_instrucoes)
        return jsonify({'response': response.text})
    except Exception as e:
        print(f"Erro no servidor: {e}")
        return jsonify({'response': "Ocorreu um erro ao processar a sua mensagem."}), 500

if __name__ == '__main__':
    app.run(debug=True)
