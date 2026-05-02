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
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #f6d365, #fda085);
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
        text-align: center;
      }

      .container {
        padding: 20px;
        animation: fadeIn 1.5s ease-in-out;
      }

      /* 🌈 Colorful gradient text */
      h1 {
        font-size: clamp(36px, 8vw, 72px);
        font-weight: bold;
        background: linear-gradient(90deg, #ff4d4d, #ffcc00, #33cc33, #3399ff, #cc33ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: glow 2s infinite alternate;
      }

      p {
        margin-top: 12px;
        font-size: clamp(16px, 4vw, 22px);
        color: #ffffff;
        opacity: 0.9;
      }

      @keyframes glow {
        from {
          text-shadow: 0 0 10px rgba(255,255,255,0.6);
        }
        to {
          text-shadow: 0 0 25px rgba(255,255,255,1);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(25px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ☀️ Floating suns */
      .sun {
        position: absolute;
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
      <p>Have a bright and beautiful day ✨</p>
    </div>

    <script>
      function createSun() {
        const sun = document.createElement("div");
        sun.classList.add("sun");
        sun.innerHTML = "☀️";
        sun.style.left = Math.random() * 100 + "vw";
        sun.style.fontSize = (Math.random() * 20 + 12) + "px";
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