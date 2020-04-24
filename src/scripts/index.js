import '../styles/index.scss';

class Starter {
    constructor(text) {
        this.text = text;
    }

    log = () => console.log(this.text);
}

(new Starter("Webpack starter")).log();
