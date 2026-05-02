import express from "express";

const app = express();

// Home route
app.get("/", (req, res) => {
  res.status(200).send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>I Love You Akriti ❤️</title>
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
        background: radial-gradient(circle at top, #ff758c, #ff7eb3, #1a1a2e);
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
        color: white;
      }

      .container {
        text-align: center;
        animation: fadeIn 2s ease-in-out;
      }

      h1 {
        font-size: 60px;
        letter-spacing: 3px;
        animation: glow 2s infinite alternate;
      }

      p {
        margin-top: 15px;
        font-size: 22px;
        opacity: 0.9;
      }

      /* Glow effect */
      @keyframes glow {
        from {
          text-shadow: 0 0 10px #fff, 0 0 20px #ff4da6;
        }
        to {
          text-shadow: 0 0 20px #fff, 0 0 40px #ff1a75;
        }
      }

      /* Fade */
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

      /* Floating hearts */
      .heart {
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
      <h1>I Love You Akriti ❤️</h1>
      <p>You are my everything ✨</p>
    </div>

    <script>
      function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 10) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 5000);
      }

      setInterval(createHeart, 300);
    </script>

  </body>
  </html>
  `);
});

export default app;