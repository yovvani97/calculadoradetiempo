function preloadSignos() {
  const total = 20;
  let loaded = 0;

  return new Promise((resolve) => {
    for (let i = 1; i <= total; i++) {
      const img = new Image();
      img.src = `/signos/${i}.png`;

      img.onload = () => {
        loaded++;
        if (loaded === total) resolve();
      };

      img.onerror = () => {
        loaded++;
        if (loaded === total) resolve();
      };
    }
  });
}

window.preloadSignos = preloadSignos;
