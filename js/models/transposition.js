import { alphabet } from './alphabet.js';

export class Transposition{
    constructor(key, text, filler){
        this.key = key;
        this.alphabet = alphabet();
        this.rows = 0;
        this.filler = filler ? filler : "☺";
        this.disorderlyMatrix = [...this.fillMatrix(key, text)];
        this.orderlyMatrix = this.order();
    }

    fillMatrix(key, text){
        let matrix = [];
        // matrix.push(Array.from(key));
        const klen = key.length;
        /** The text has space in matrix */
        if( klen*klen >= text.length ){
            const diference = klen*klen - text.length;
            /** Fill spaces with ? */
            const content = Array.from(this.fillText(diference, text));
            this.rows = klen;
            for (let i = 0; i < this.rows; i++) {
                matrix.push(this.setRow(content, i*klen, (i+1)*klen));
            }
        }else{
            /** The text needs more space */
            const diference = (text.length-klen*klen);
            /** Missing characters in last row */
            const row = diference % klen;
            let missingRows = Math.floor(diference/klen);
            let content = Array.from(text);
            if( row != 0){
                missingRows++;
                content = Array.from(this.fillText(klen-row, text));
            }
            this.rows = klen+missingRows;
            for (let i = 0; i < this.rows; i++) {
                matrix.push(this.setRow(content, i*klen, (i+1)*klen));
            }
        }
        return matrix;
    }

    setRow(array, start, end){
        return array.slice(start, end);
    }

    fillText(diference, text){
        const rest = this.filler.repeat(diference);
        return text.concat(rest);
    }

    order(){
        let orderlyMatrix = [];
        const array = Array.from(this.key);
        const orderlyKey = array.sort((a, b) => this.alphabet.indexOf(a)-this.alphabet.indexOf(b));
        for(let character of orderlyKey){
            let index = this.key.indexOf(character);
            let row = [];
            for(let i = 0; i<this.rows; i++){
                row.push(this.disorderlyMatrix[i][index]);
            }
            orderlyMatrix.push(row);
        }
        return orderlyMatrix;
    }

    encrypt(){
        let encryptText = "";
        for(let row of this.orderlyMatrix){
            encryptText += row.join('');
        }
        return encryptText;
    }
    
    decrypt(){
        let decryptText = "";
        for(let row of this.disorderlyMatrix){
            decryptText += row.join('');
        }
        return  decryptText.replaceAll(this.filler, "");
    }
}
