export class StarRater extends HTMLElement{

    starComponent = null;
    arrayStar = [];
    containerStar = null;
    raterStar = -1;

    constructor(){
        super();
        this.starComponent = this.attachShadow({mode: "open"});
        this.createStarRaterComponent();
        this.createStyleComponent();
        this.createFiveStar();
        this.setComponentInHTML();
        this.setAddEventListenerToStar();
    }

    static createShadowComponent(){
        customElements.define("star-rater",StarRater);
    }

    setComponentInHTML(){
       this.arrayStar.forEach((star) => {
        this.containerStar.appendChild(star);
       });
       this.starComponent.appendChild(this.containerStar);
    }

    setAddEventListenerToStar(){
        this.arrayStar.forEach((star) => {
            star.addEventListener("mouseover", this.fillStar.bind(this));
            star.addEventListener("click", this.setRaterStar.bind(this));
            star.addEventListener("mouseout", this.resetStars.bind(this));
        });
    }

    setRaterStar({target}){
        let star = target;
        this.raterStar = star.getAttribute("data-star");
        for(let i = 0; i <
             this.raterStar; i++){
            this.arrayStar[i].style.color = "yellow";
        }
    }

    createFiveStar(){
        for(let i = 0; i < 5; i++){
            this.arrayStar.push(this.createStar(i));
        }
    }

    createStar(index){
        const star = document.createElement("span");
        star.innerHTML = "&#10030;";
        star.classList.add("star");
        star.setAttribute("data-star",index);
        return star;
    }

    createStarRaterComponent(){
        this.containerStar = document.createElement("div");
        this.containerStar.classList.add("starContainer");
        this.starComponent.appendChild(this.containerStar);
    }

    createStyleComponent(){
        const style = document.createElement("style");
        style.innerHTML = 
        `
            .starContainer{
                display: flex;
            }

            .star{
                font-size: 2.5rem;
                color: grey;
                cursor: pointer;
            }
        `;
        this.starComponent.appendChild(style);
    }
    
    fillStar({target}){
        let star = target;
        let starts = star.getAttribute("data-star");
        for(let i = 0; i < 5; i++){
            let fillStar = this.starComponent.querySelector(`[data-star="${i}"]`);  
            fillStar.style = "color:yellow;";   
            i > starts || i === this.arrayStar[this.arrayStar.length-1] ? this.arrayStar[i].style.color = "grey" : this.arrayStar[i].style.color = "yellow"; 
        }
    }

    resetStars(){
        for(let i = 0; i < 5; i++){
            i > this.raterStar ? this.arrayStar[i].style.color = "grey" : this.arrayStar[i].style.color = "yellow"; 
        }
    }


}
