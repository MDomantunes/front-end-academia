function addDigit(digit) {
    const input = document.getElementById('cpf');
    input.value += digit;
  }
  
  function backspace() {
    const input = document.getElementById('cpf');
    input.value = input.value.slice(0, -1);
  }
  
  function clearInput() {
    document.getElementById('cpf').value = '';
    document.getElementById('resultado').textContent = '';
  }
  
  function verificarCPF() {
    const cpf = document.getElementById('cpf').value;
    const resultado = document.getElementById('resultado');
  
    if (cpf.length < 11) {
      resultado.textContent = 'CPF incompleto!';
      resultado.style.color = 'yellow';
      return;
    }
  
    fetch(`http://localhost:5000/verificar/${cpf}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('CPF não encontrado');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'ativo') {
          resultado.textContent = 'Acesso liberado!';
          resultado.style.color = 'lightgreen';
        } else {
          resultado.textContent = 'Acesso negado! Aluno inativo.';
          resultado.style.color = 'red';
        }
      })
      .catch(error => {
        resultado.textContent = error.message;
        resultado.style.color = 'orange';
      });
  }
  
  