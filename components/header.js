class headerBar extends HTMLElement {
  constructor(){
    super();

    this.attachShadow({mode:"open"});
  }

  static get observedAttributes(){
    return ["text", "link1", "link2", "link3"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "text") {
      this.text = newVal;
    }
    if (attr === "link1") {
      this.link1 = newVal;
    }
    if (attr === "link2") {
      this.link2 = newVal;
    }
    if (attr === "link3") {
      this.link3 = newVal;
    }
  }

  getTemplate(){ //*Esto será puro HTML
    const template = document.createElement('template');
    template.innerHTML = `
    <header>
      <h1>${this.text}</h1>
      <nav>
        <div class="big__index__container">
          <ol class="index">
            <li><a href="${this.link1}" title="Back to home page">Home</a></li>
            <li><a href="${this.link2}" title="List of the different certificates and diplomas obtained">Certificates</a></li>
            <li><a href="${this.link3}" title="Contact data">Contact</a></li>
          </ol>
        </div>


        <!-- trying hamburger menu -->
        <div id="menuToggle">
          <!--
          A fake / hidden checkbox is used as click reciever,
          so you can use the :checked selector on it.
          -->
          <input type="checkbox" />
          
          <!--
          Some spans to act as a hamburger.
          
          They are acting like a real hamburger,
          not that McDonalds stuff.
          -->
          <span></span>
          <span></span>
          <span></span>
          
          <!--
          Too bad the menu has to be inside of the button
          but hey, it's pure CSS magic.
          -->
          <ul id="menu">
            <li><a href="${this.link1}" title="Back to home page">Home</a></li>
            <li><a href="${this.link2}" title="List of the different certificates and diplomas obtained">Certificates</a></li>
            <li><a href="${this.link3}" title="Contact data">Contact</a></li>
          </ul>
        </div>

      </nav>
    </header>
      ${this.getStyles()} <!---Aplicamos los estilos--->
    `;
    return template;
  }


  getStyles() {
    return `
      <style>
      :root {
        --listFontColor: rgb(169, 221, 185);
        --textFontSize: 2.0rem;
        --littleTextFontSize: 1.5rem;
      }

      * {
        font-family: Arial, Helvetica, sans-serif;
        box-sizing: border-box; /* important responsive feature (padding and border) */
        margin: 0;
        padding: 0;
      }

      header {
        border: 5px ridge rgb(70, 68, 107);
        background: linear-gradient(90deg, rgba(15,137,162,1) 25%, rgba(6,44,94,1) 50%, rgba(11,6,98,1) 75%);
        position: sticky;
        top: 0; /* Position the navbar at the top of the page */
        width: 100%; /* Full width */
        padding: 0 10px;
        min-height: 1vh;
        z-index: 999; /*le da prioridad para que este siempre al frente*/
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      a, a:hover, a:focus, a:active {
        text-decoration: none;
        color: inherit;
      }

      .big__index__container {
        display: none;
      }

      /* hamburger menu styles */
      #menuToggle
      {
        display: block;
        position: relative;
        
        z-index: 1;
        
        -webkit-user-select: none;
        user-select: none;
      }

      #menuToggle a
      {
        text-decoration: none;
        list-style: none;
        cursor: pointer;
        font-size: 2rem;
        color: white;
        
        transition: color 0.3s ease;
      }

      #menuToggle a:hover
      {
        color: tomato;
      }


      #menuToggle input
      {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        top: -7px;
        left: -5px;
        
        cursor: pointer;
        
        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger */
        
        -webkit-touch-callout: none;
      }

      /*
      * Just a quick hamburger
      */
      #menuToggle span
      {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        
        background: #cdcdcd;
        border-radius: 3px;
        
        z-index: 1;
        
        transform-origin: 4px 0px;
        
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;
      }

      #menuToggle span:first-child
      {
        transform-origin: 0% 0%;
      }

      #menuToggle span:nth-last-child(2)
      {
        transform-origin: 0% 100%;
      }

      /* 
      * Transform all the slices of hamburger
      * into a crossmark.
      */
      #menuToggle input:checked ~ span
      {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: #232323;
      }

      /*
      * But let's hide the middle one.
      */
      #menuToggle input:checked ~ span:nth-last-child(3)
      {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }

      /*
      * Ohyeah and the last one should go the other direction
      */
      #menuToggle input:checked ~ span:nth-last-child(2)
      {
        transform: rotate(-45deg) translate(0, -1px);
      }

      /*
      * Make this absolute positioned
      * at the top right of the screen
      */
      #menu
      {
        position: absolute;
        /* margin: -100px 0 0 -50px; */
        width: 150px;
        margin: 8px 0 0 -100px; /* position of the menu container */
        padding: 15px;
        display: none;
        
        background: #ededed6b;
        list-style-type: none;
        -webkit-font-smoothing: antialiased;
        /* to stop flickering of text in safari */
        
        transform-origin: 0% 0%;
        transform: translate(100%, 0);
        
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
      }

      #menu li
      {
        padding: 5px 0;
        font-size: 22px;

      }

      /*
      * And let's slide it in from the left
      */
      #menuToggle input:checked ~ ul
      {
        transform: none;
        display: block;
      }

      h1 {
        text-align: center;
        font-size: 2.0rem;
        color: #afcfb1;
      }

      @media screen and (min-width: 600px){
        h1 {
          text-align: left;
          font-size: 3.0rem;
        }
      }

      @media screen and (min-width: 1024px){
        h1 {
          font-size: 4.0rem;
          text-align: left;
        }

        .big__index__container {
          display: flex;
        }

        #menuToggle{
          display: none;
        }

        .index {
          right: 10px;
          font-size: 20px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
          color: white;
        } 

        .index li {
          padding: 10px;
          list-style: none;
          text-decoration: none;
        }

        .index li:hover {
          color: rebeccapurple;
          transform: scale(1.2);
        }

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