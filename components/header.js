class headerBar extends HTMLElement {
  constructor(){
    super();

    this.attachShadow({mode:"open"});
  }

  static get observedAttributes(){
    return [
      "logo", "logoAlt", "logoTitle", "link1", 
      "link2", "link2Text", 
      "link3", "link3Text", 
      "link4", "link4Text"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "logo") {
      this.logo = newVal;
    }
    if (attr === "logoAlt") {
      this.logoAlt = newVal;
    }
    if (attr === "logoTitle") {
      this.logoTitle = newVal;
    }
    if (attr === "link1") {
      this.link1 = newVal;
    }
    if (attr === "link2") {
      this.link2 = newVal;
    }
    if (attr === "link2Text") {
      this.link2 = newVal;
    }
    if (attr === "link3Text") {
      this.link3 = newVal;
    }
  }

  getTemplate(){ //*Esto será puro HTML
    const template = document.createElement('template');
    template.innerHTML = `
      <header class="header">
        <a href="${this.getAttribute("link1")}" class="iconography-link" >
          <div class="iconography">
            <div class="logo">
              <img src= "${this.logo}" alt="${this.getAttribute("logoAlt")}" title="${this.getAttribute("logoTitle")}"/>
            </div>
            <div class="name">
              Matices&nbsp;Narrativos
            </div>
          </div>
        </a>
        <nav>
          <ul class="nav">
              <li><a href="${this.getAttribute("link2")}" title="${this.getAttribute("link2Text")}">${this.getAttribute("link2Text")}</a></li>
              <li><a href="${this.getAttribute("link3")}" title="${this.getAttribute("link3Text")}">${this.getAttribute("link3Text")}</a></li>
              <li><a href="${this.getAttribute("link4")}" title="${this.getAttribute("link4Text")}">${this.getAttribute("link4Text")}</a></li>
          </ul>
        </nav>
      </header>
      ${this.getStyles()} <!---Aplicamos los estilos--->
    `;
    return template;
  }


  getStyles() {
    return `
      <style>
      * {
        font-family: Roboto, Helvetica, sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      /* All the color must be defined here */
      @media (prefers-color-scheme: dark) {
        header.header{
          background-color: var(--primary-background-color-dark);
          color: var(--primary-text-color-dark);
        }
        a{
          color: var(--primary-text-color-dark);
        }
      }
      @media (prefers-color-scheme: light) {
        header.header{
          background-color: var(--primary-background-color-light);
          color: var(--primary-text-color-light);
        }
        a{
          color: var(--primary-text-color-light);
        }
      }
      /* Start header styles */
      header.header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 1em 5%;
        min-height: 80px;
        max-height: var(--header-height);
      }

      header.header .iconography {
        display: flex;
        align-items: center;
      }
      header.header .iconography-link{
        text-decoration: none;
      }

      header.header .iconography div:first-child {
        margin-right: 5%;
      }

      header.header .iconography .logo,
      header.header .iconography .name{
        height: 100%;
        width: auto;
        text-decoration: none;
      }
      header.header .iconography .name{
        color: var(--primary-green);
      }
      header.header .iconography .logo img{
        max-height: calc(var(--header-height) - 20px);
      }

      header.header nav{
        /* margin-right: 5%; */
      }

      header.header nav .nav {
        display: flex;
        list-style: none;
      }

      header.header nav .nav li a{
        font-size: 1rem;
        text-decoration: none;
        padding: 8px 19px;
      }

      header.header nav .nav li a:hover{
        background-color: var(--primary-green);
        border-radius: 30px;
        box-shadow: -5px 5px 3px var(--secondary-green);
        transition: all .2s linear;
      }
      /* End header styles */

      @media (min-width: 768px){
      /* Start header styles */
        header.header nav .nav {
          flex-direction: row;
        }
        header.header nav .nav li a{
          font-size: 1.5rem;
          text-decoration: none;
          padding: 8px 29px;
        }
        /* End header styles */
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

customElements.define("my-header", headerBar)