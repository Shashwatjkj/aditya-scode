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
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
        text-align: center;
        background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
      }

      .container {
        padding: 20px;
        z-index: 2;
        animation: fadeIn 1.5s ease-in-out;
      }

      /* 🌈 Colorful text */
      h1 {
        font-size: clamp(36px, 8vw, 72px);
        font-weight: bold;
        background: linear-gradient(90deg, #00f5ff, #00ffcc, #66ff66, #ffff66, #ff66cc);
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
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
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

      /* ✨ Glitter stars */
      .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        opacity: 0.8;
        animation: twinkle linear infinite;
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1.2); }
      }

      /* Floating sparkle dots */
      .sparkle {
        position: absolute;
        color: #ffffff;
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
      <p>Shine bright like the morning sky ✨</p>
    </div>

    <script>
      // ⭐ Glitter stars
      function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");
        const size = Math.random() * 3 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDuration = (Math.random() * 2 + 1) + "s";

        document.body.appendChild(star);

        setTimeout(() => {
          star.remove();
        }, 3000);
      }

      // ✨ Floating sparkles
      function createSparkle() {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.innerHTML = "✨";
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.fontSize = (Math.random() * 10 + 10) + "px";
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 5000);
      }

      setInterval(createStar, 100);
      setInterval(createSparkle, 300);
    </script>

  </body>
  </html>
  `);
});

export default app;