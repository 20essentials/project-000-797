import { createRoot } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import { Layout, Button } from "antd";

const { Content } = Layout;

const App = () => {
  const canvasRef = useRef(null);
  const [starsCount, setStarsCount] = useState(750);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    let stars = [];
    const MAX_SPEED = 6;
    const COLORS = ["#444", "#888", "#FFF"];

    const expandCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < starsCount; i++) {
        stars.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          speed: Math.floor(1 + Math.random() * MAX_SPEED),
          color: Math.floor(Math.random() * COLORS.length),
        });
      }
    };

    const clearScreen = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const update = () => {
      for (let i = 0; i < stars.length; i++) {
        stars[i].x -= stars[i].speed;
        if (stars[i].x < 0) stars[i].x = canvas.width;
      }
    };

    const render = () => {
      clearScreen();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        ctx.lineWidth = 1;
        ctx.strokeStyle = COLORS[s.color];
        ctx.strokeRect(s.x, s.y, 1, 1);
      }
    };

    const loop = () => {
      requestAnimationFrame(loop);
      update();
      render();
    };

    window.addEventListener("resize", expandCanvas);
    expandCanvas();
    createStars();
    loop();

    return () => {
      window.removeEventListener("resize", expandCanvas);
    };
  }, [starsCount]);

  const canvasStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
  };

  const layoutStyles = {
    position: "relative",
    zIndex: 10,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "30px",
  };

  return (
    <Layout>
      <Content style={layoutStyles}>
        <Button type="primary" onClick={() => setStarsCount((c) => c + 100)}>
          Add Stars
        </Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => setStarsCount(750)}
        >
          Reset Stars
        </Button>
      </Content>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
    </Layout>
  );
};

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
const root = createRoot(rootEl);
root.render(<App />);

export default App;
