// Toggle menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Inicializa o visualizador NGL
const stage = new NGL.Stage("ngl-viewer", {
    backgroundColor: "white"
});
let component;

// Ajusta o tamanho ao redimensionar
window.addEventListener("resize", function() {
    stage.handleResize();
});

// Carrega a estrutura PDB da proteína MYC
stage.loadFile("https://files.rcsb.org/download/1NKP.pdb").then(function(loadedComponent) {
    component = loadedComponent;
    // Adiciona representação inicial
    component.addRepresentation("cartoon", {
        color: "chainname"
    });
    component.autoView();
});

// Adiciona funcionalidade aos botões de controle
document.getElementById("cartoon-view").addEventListener("click", function() {
    if (component) {
        component.removeAllRepresentations();
        component.addRepresentation("cartoon", {
            color: "chainname"
        });
    }
});

document.getElementById("surface-view").addEventListener("click", function() {
    if (component) {
        component.removeAllRepresentations();
        component.addRepresentation("surface", {
            opacity: 0.7,
            colorScheme: "electrostatic"
        });
    }
});

document.getElementById("ball-stick-view").addEventListener("click", function() {
    if (component) {
        component.removeAllRepresentations();
        component.addRepresentation("ball+stick", {
            color: "element"
        });
    }
});

document.getElementById("reset-view").addEventListener("click", function() {
    if (component) {
        component.autoView();
    }
});