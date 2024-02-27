// Array para guardar os e-mails dos clientes
let emails = [];

// Verificar o dia da semana atual
function getWeekday() {
  let weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  let today = new Date();
  let weekDay = weekdays[today.getDay()];
  return weekDay;
}

// Criar o corpo do e-mail
const buildEmailBody = () => {
  const emailBody = `
    Olá,

    Esperamos que esteja bem!

    Aqui estão as novidades da CarStore desta semana:
    - Novos veículos em estoque: temos uma variedade de novos modelos que acabaram de chegar. Carros compactos ou SUVs espaçosos, temos para todos os gostos e necessidades.
    - Veículos mais vendidos: descubra quais os modelos mais vendidos de nossas concessionárias. Quem sabe um deles possa ser o carro dos seus sonhos!
    - Condições especiais de financiamento: planos de pagamento flexíveis para a aquisição do seu próximo veículo.
    - Eventos especiais: fique de olho em nossos próximos eventos e promoções. De descontos especiais a dias de test drive, sempre há algo emocionante acontecendo na CarStore.

    Visite nossas lojas para conferir!

    Atenciosamente,
    Equipe CarStore
  `;
  return emailBody;
};

// Enviar e-mails
function sendEmails() {
  if (getWeekday() === 'Segunda-feira') {
    emails.forEach((email) => {
      if (email.marketing === 'yes') {
        const emailBody = buildEmailBody();
        const result = sendEmail(email.email, 'Marketing', emailBody);
        if (result.status === 'Error') {
          console.log(result.message);
        }
      }
    });
  }
}

const sendEmail = (addressee, subject, body) => {
  if (!addressee) {
    return {
      status: "Error",
      message: "Insira um destinatário",
    };
  }

  if (!subject) {
    return {
      status: "Error",
      message: "Insira um assunto",
    };
  }

  if (!body) {
    return {
      status: "Error",
      message: "Insira uma mensagem no corpo do e-mail",
    };
  }

  console.log(
    `
        De: newsletter@carstore.com
        Para: ${addressee}
        Assunto: ${subject}
        
        ${body}
        
        CarStore - Sua jornada para o carro dos sonhos começa aqui!
      `
  );

  return { status: "Success", message: "E-mail enviado com sucesso!" };
};

// Função para lidar com o envio do formulário
function formSubmit(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const marketing = document.querySelector('input[name="marketing"]:checked').value;

  if (email === '' || marketing === '') {
    alert('Por favor, preencha todos os campos.');
    console.log('O envio falhou: preencha todos os campos.')
    return;
  }

  // Adiciona os dados do formulário ao array de e-mails
  emails.push({ email: email, marketing: marketing });

  // Exibe a mensagem de sucesso
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';

  // Limpa os campos do formulário
  document.getElementById('email').value = '';
  document.querySelector('input[name="marketing"]:checked').checked = false;

  console.log('Formulário enviado!');
}

// Submit do formulário
document.addEventListener('DOMContentLoaded', function () {
  const emailForm = document.getElementById('emailForm');
  emailForm.addEventListener('submit', formSubmit);
});
