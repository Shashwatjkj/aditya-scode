import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Good Morning ☀️</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #f6d365, #fda085);
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
        color: #fff;
      }

      .container {
        text-align: center;
        animation: fadeIn 2s ease-in-out;
      }

      h1 {
        font-size: 65px;
        letter-spacing: 3px;
        text-shadow: 0 0 20px rgba(255,255,255,0.9);
        animation: glow 2s infinite alternate;
      }

      p {
        font-size: 22px;
        margin-top: 15px;
        opacity: 0.9;
      }

      @keyframes glow {
        from {
          text-shadow: 0 0 10px #fff, 0 0 20px #ffd700;
        }
        to {
          text-shadow: 0 0 25px #fff, 0 0 50px #ffae00;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Floating sun particles */
      .sun {
        position: absolute;
        font-size: 20px;
        animation: floatUp linear infinite;
      }

      @keyframes floatUp {
        from {
          transform: translateY(100vh);
          opacity: 1;
        }
        to {
          transform: translateY(-10vh);
          opacity: 0;
        }
      }
    </style>
  </head>

  <body>

    <div class="container">
      <h1>Good Morning ☀️</h1>
      <p>Wishing you a day full of happiness and sunshine ✨</p>
    </div>

    <script>
      function createSun() {
        const sun = document.createElement("div");
        sun.classList.add("sun");
        sun.innerHTML = "☀️";
        sun.style.left = Math.random() * 100 + "vw";
        sun.style.fontSize = (Math.random() * 20 + 10) + "px";
        sun.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(sun);

        setTimeout(() => {
          sun.remove();
        }, 5000);
      }

      setInterval(createSun, 400);
    </script>

  </body>
  </html>
  `);
});

export default app;