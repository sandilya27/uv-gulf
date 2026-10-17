import { TechnicalDrawing } from "./TechnicalDrawing";
import styles from "./GearDrawing.module.css";

// Three open gear sectors echo the logo without duplicating its wordmark.
function gearSector(cx: number, cy: number, start: number, end: number) {
  const point = (radius: number, angle: number) => {
    const radians = angle * Math.PI / 180;
    return `${(cx + Math.cos(radians) * radius).toFixed(2)} ${(cy + Math.sin(radians) * radius).toFixed(2)}`;
  };
  const teeth = 8;
  const points = Array.from({ length: teeth * 4 + 1 }, (_, index) => {
    const radius = index % 4 === 1 || index % 4 === 2 ? 88 : 78;
    return point(radius, start + (end - start) * index / (teeth * 4));
  });
  return `M${points.join(" L")} L${point(57, end)} A57 57 0 0 0 ${point(57, start)} Z`;
}

export function GearDrawing() {
  return (
    <TechnicalDrawing className={styles.drawing}>
      <svg viewBox="0 0 280 280" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path data-technical-stroke d={gearSector(75, 54, 5, 125)} />
        <path data-technical-stroke d={gearSector(207, 142, 125, 245)} />
        <path data-technical-stroke d={gearSector(75, 230, 235, 355)} />
      </svg>
    </TechnicalDrawing>
  );
}
