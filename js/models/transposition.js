import { alphabet } from './alphabet.js';

export class Transposition{
    constructor(key, text, filler){
        this.key = key;
        this.alphabet = alphabet();
        this.rows = 0;
        this.filler = filler ? filler : "•";
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
            /** If last row is not complete */
            if( row != 0){
                missingRows++;
                content = Array.from(this.fillText(klen-row, text));
            }
            /** then there are more rows */
            this.rows = klen+missingRows;
            /** Making matrix data */
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
        /** Sort to key */
        const orderlyKey = array.sort((a, b) => this.alphabet.indexOf(a)-this.alphabet.indexOf(b));
        /** Sort matrix with text to order key */    
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
    
    /** Have the orderly matrix (encrypt), now it is back to originally matrix */
    disorder(rebuild){
        const disorderlyMatrix = []
        const array = Array.from(this.key);
        const orderlyKey = array.sort((a, b) => this.alphabet.indexOf(a)-this.alphabet.indexOf(b));
        for(let character of this.key){
            let index = orderlyKey.indexOf(character);
            let row = rebuild[index];
            disorderlyMatrix.push(row);
        }
        return disorderlyMatrix;
    }

    rebuild(){
        let rebuild = [];
        let rows = [];
        /** Making only array with all elements in matrix */
        for (const row of this.disorderlyMatrix) {
            let str = row.join('');
            rows.push(str);
        }
        const all = Array.from(rows.join(''));
        const sizeRow = this.disorderlyMatrix.length;
        /** Take n elements to make a row */
        for(let i = 0; i < this.key.length; i++){
            rebuild.push(this.setRow(all, i*sizeRow, (i+1)*sizeRow))
        }
        return rebuild;
    }
    
    encrypt(){
        let encryptText = "";
        for(let row of this.orderlyMatrix){
            encryptText += row.join('');
        }
        return encryptText;
    }
    
    decrypt(){
        /** Make a matrix with rows and cols */
        const rebuild = this.rebuild();
        /** Disorder matrix -> original matrix*/
        const desorderlyMatrix = this.disorder(rebuild);
        let decryptText = "";
        const rows = desorderlyMatrix.length;
        const cols = desorderlyMatrix[0].length;
        /** Recorring matrix for cols */
        for (let j = 0; j < cols; j++) {
            let row = [];
            for (let i = 0; i < rows; i++) {
                row.push(desorderlyMatrix[i][j]);
            }
            decryptText += row.join('');
        }
        return  decryptText.replaceAll(this.filler, "");
    }
}
