class footerBar extends HTMLElement {
  constructor(){
    super();

    this.attachShadow({mode:"open"});
  }

  static get observedAttributes(){
    return ["link1", "img1", "img1Alt", "img1Title", "link2", "img2", "img2Alt",  "img2Title"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "link1") {
      this.link1 = newVal;
    }
    if (attr === "img1") {
      this.img1 = newVal;
    }
    if (attr === "img1Alt") {
      this.img1Alt = newVal;
    }
    if (attr === "img1Title") {
      this.img1Title = newVal;
    }
    if (attr === "link2") {
      this.link2 = newVal;
    }
    if (attr === "img2") {
      this.img2 = newVal;
    }
    if (attr === "img2Alt") {
      this.img2Alt = newVal;
    }
    if (attr === "img2Title") {
      this.img2Title = newVal;
    }
  }

  getTemplate(){ //*Esto será puro HTML
    const template = document.createElement('template');
    template.innerHTML = `
      <footer>
        <!-- <p>Soy un footer</p> -->
        <nav class="social">
            <a href="${this.link1}"><img src= "${this.img1}" alt="${this.getAttribute("img1Alt")}" title="${this.getAttribute("img1Title")}"></a>
            <a href="${this.link2}"><img src= "${this.img2}" alt="${this.getAttribute("img2Alt")}" title="${this.getAttribute("img2Title")}"></a>
        </nav>
      </footer>
      ${this.getStyles()} <!---Aplicamos los estilos--->
    `;
    return template;
  }


  getStyles() {
    return `
      <style>
      footer {
        text-align: left;
        background: black;
        width: 100%;
        position: fixed;
        bottom: 0;
      }

      footer .social {
        font-size: 2rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: start;
      }

      footer .social img {
        max-width: 40px;
      }

      footer .social img:hover{
        transform: scale(1.5);
      }
      </style>
    `;
  }

  render(){//hace que el contenido del template se pueda clonar para agregarlo al DOM
    //Ahora para poder renderizar nuestros templates tenemos que cambiar el contexto
    //Donde agregamos nuestro template ya que lo estabamos agregando al dom global
    //Ahora debemos agregarlo en nuestro shadow dom que es otro contexto diferente
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
  }

  //*Esto es lo que agregará cosas al DOM
  connectedCallback(){
    this.render();
  }
}

customElements.define("my-footer", footerBar)