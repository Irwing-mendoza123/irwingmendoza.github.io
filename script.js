document.addEventListener('DOMContentLoaded', function() {
  const world = document.getElementById('world');
  const gif2 = document.getElementById('gif2');
  const worldContainer = document.getElementById('world-container');
  const container = document.querySelector('.container');
  let isMouseMoving = false;
  let decisionMade = false; // Variable para verificar si se ha tomado una decisión

  // Verificar si ya se ha tomado una decisión al cargar la página
  const decision = localStorage.getItem('decision');
  if (decision) {
    handleDecision(decision);
  }

  function handleMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculamos el ángulo de rotación del mundo en función de la posición del ratón
    const rect = worldContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Aplicamos la rotación al mundo
    world.style.transform = `rotate(${angle}deg)`;
    gif2.style.transform = `rotate(${angle}deg)`; // Rotación del segundo GIF
  }

  container.addEventListener('mousedown', function(event) {
    isMouseMoving = true;
    container.addEventListener('mousemove', handleMouseMove);
  });

  container.addEventListener('mouseup', function(event) {
    isMouseMoving = false;
    container.removeEventListener('mousemove', handleMouseMove);
  });

  // Función para mostrar la frase al hacer clic en el mundo
  function mostrarFrase() {
    const message = document.getElementById('message');
    message.innerHTML = `
      <p>♡ Eres tú mi inspiración. Eres tú por lo que vivo y con lo que sueño, lo que me llena de fuerzas y de ilusión cada día al despertar. Eres tú mi felicidad.</p>
      <p>♡ Por si no lo sabías, por si nunca te lo había dicho, para que no tengas dudas: "Eres tú lo que más quiero".</p>
      <p>♡ Este mensaje es para que sepas que no dejo de pensarte, de desearte y que quisiera estar junto a ti cada minuto de mi vida.</p>
      <p>♡ Si me dieran la oportunidad de pedir tres deseos, te pediría tres veces a ti...</p>
      <p>♡ nunca olvides que te amo 😍...</p>
      <p>   Irwing ❤ Odalis  ¿ y si nos casamos ?</p>
    `;
    message.style.display = 'block';
    world.style.display = 'none'; // Ocultamos el mundo al mostrar el mensaje

    // Ocultar el mensaje de indicación
    const subPhrase = document.querySelector('.sub-phrase');
    subPhrase.style.display = 'none';

    // Mostrar los botones de decisión
    const decisionButtons = document.getElementById('decision-buttons');
    decisionButtons.style.display = 'block';
  }

  // Event listener para la imagen del mundo
  world.addEventListener('click', mostrarFrase);

  // Función para manejar la decisión
  function handleDecision(decision) {
    if (!decisionMade) { // Verifica si ya se ha tomado una decisión
      const yesButton = document.getElementById('yes-button');
      const noButton = document.getElementById('no-button');

      if (decision === 'yes') {
        yesButton.style.backgroundColor = '#4CAF50'; // Cambia el color del botón "Sí"
        alert("Te amooooooooooo. Sabía que ibas a decir que sí"); // Mensaje estilo muy profesional
      } else if (decision === 'no') {
        noButton.style.backgroundColor = '#FF5733'; // Cambia el color del botón "No"
      }

      // Deshabilita los botones después de tomar una decisión
      yesButton.disabled = true;
      noButton.disabled = true;

      decisionMade = true; // Marca que se ha tomado una decisión

      // Guardar la decisión en localStorage
      localStorage.setItem('decision', decision);
    }
  }

  // Event listener para el botón "Sí"
  document.getElementById('yes-button').addEventListener('click', function() {
    handleDecision('yes');
  });

  // Event listener para el botón "No"
  document.getElementById('no-button').addEventListener('click', function() {
    handleDecision('no');
  });

  // Función para iniciar la animación de la frase
  function iniciarAnimacion() {
    const hearts = document.querySelectorAll('.heart-emoji');
    const message = document.getElementById('message');
    const messageText = message.innerText.trim();
    const messageArray = messageText.split('');
    let currentIndex = 0;

    const timer = setInterval(function() {
      if (currentIndex >= messageArray.length) {
        clearInterval(timer);
        return;
      }

      hearts[currentIndex].innerHTML = messageArray[currentIndex];
      hearts[currentIndex].classList.add('heart-letter');
      currentIndex++;
    }, 100);

    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none'; // Ocultamos el botón de inicio
  }

  // Creación de corazones animados
  const containerHearts = document.getElementById('heart-container');
  const hearts = 1000; // Cantidad de corazones

  for (let i = 0; i < hearts; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️'; // Emoji de corazón
    heart.classList.add('heart-emoji');
    containerHearts.appendChild(heart);
  }

  const heartEmojis = document.querySelectorAll('.heart-emoji');

  heartEmojis.forEach(function(heart) {
    const size = Math.random() * 30 + 10; // Tamaño aleatorio
    const duration = Math.random() * 3 + 2; // Duración de la animación aleatoria
    const delay = Math.random() * 5; // Retardo aleatorio
    const left = Math.random() * container.offsetWidth; // Posición horizontal aleatoria
    const top = Math.random() * container.offsetHeight; // Posición vertical aleatoria

    heart.style.left = left + 'px';
    heart.style.top = top + 'px';
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';
  });
});
