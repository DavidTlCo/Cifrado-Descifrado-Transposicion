import { Transposition } from './models/transposition.js';

const reset = () => {
    document.getElementById("encrypt_text").value = '';
    document.getElementById('encrypt_encrypt').value = '';
    document.getElementById("decrypt_encrypt").value = '';
    document.getElementById('decrypt_text').value = '';
    document.getElementById("shift_decrypt").value = '';
    document.getElementById("shift_encrypt").value = '';
    document.getElementById("filler_encrypt").value = '';
    document.getElementById("filler_decrypt").value = '';
}

const encrypt = (e) =>{
    const encrypt_text = document.getElementById("encrypt_text").value;
    const key_encrypt = document.getElementById("shift_encrypt").value;
    const filler_encrypt = document.getElementById("filler_encrypt").value;
    const transposition = new Transposition(key_encrypt, encrypt_text, filler_encrypt);
    if( encrypt_text && shift_encrypt ){
        const result = transposition.encrypt();
        document.getElementById('encrypt_encrypt').value = result;
        document.getElementById("shift_decrypt").value = key_encrypt;
        document.getElementById("decrypt_encrypt").value = result;
        document.getElementById("filler_decrypt").value = filler_encrypt;
    }else{
        Swal.fire({
            title: 'Atención',
            text: 'Hay campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}

const decrypt = (e) =>{
    const encrypt_text = document.getElementById("decrypt_encrypt").value;
    const key_encrypt = document.getElementById("shift_decrypt").value;
    const filler_encrypt = document.getElementById("filler_decrypt").value;
    const transposition = new Transposition(key_encrypt, encrypt_text, filler_encrypt);
    const decrypt_text = document.getElementById("decrypt_encrypt").value;
    const shift_decrypt = document.getElementById("shift_decrypt").value;
    if( decrypt_text && shift_decrypt ){
        const result = transposition.decrypt();
        document.getElementById('decrypt_text').value = result;
    }else{
        Swal.fire({
            title: 'Atención',
            text: 'Hay campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

const init = () => {
    document.getElementById('encrypt').addEventListener('click', encrypt);
    document.getElementById('decrypt').addEventListener('click', decrypt);
    document.getElementById('reset').addEventListener('click', reset);
}

init();
