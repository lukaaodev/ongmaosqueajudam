// Máscaras de entrada para CPF, telefone e CEP.
// A validação do formato continua sendo feita pelo atributo pattern.
const mascaras = {
  cpf: (v) => v.slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2'),
  telefone: (v) => {
    v = v.slice(0, 11);
    if (v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    if (v.length > 6) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    if (v.length > 2) return v.replace(/(\d{2})(\d+)/, '($1) $2');
    return v;
  },
  cep: (v) => v.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2')
};

document.querySelectorAll('[data-mascara]').forEach((campo) => {
  campo.addEventListener('input', () => {
    const digitos = campo.value.replace(/\D/g, '');
    campo.value = mascaras[campo.dataset.mascara](digitos);
  });
});
