// Equal tooth pitch, fixed axles and inverse tooth-count speeds form a gear train.
const GEARS = [
  { x: 90, y: 180, teeth: 16, phase: 0, duration: 72000, color: "#ffffff" },
  { x: 202, y: 180, teeth: 12, phase: 15, duration: -54000, color: "#249bd0" },
  { x: 202, y: 92, teeth: 10, phase: 18, duration: -45000, color: "#ffffff" },
];

function gearOutline(teeth: number) {
  const pitch = teeth * 4;
  const points: string[] = [];
  for (let tooth = 0; tooth < teeth; tooth++) {
    // Narrow tooth tips and flared roots leave clearance for the mating gear.
    for (const [offset, radius] of [[-0.5, pitch - 5], [-0.34, pitch - 5], [-0.18, pitch + 4], [0.18, pitch + 4], [0.34, pitch - 5], [0.5, pitch - 5]]) {
      const angle = (tooth + offset) * Math.PI * 2 / teeth;
      points.push(`${(Math.cos(angle) * radius).toFixed(3)},${(Math.sin(angle) * radius).toFixed(3)}`);
    }
  }
  const bore = pitch * 0.69;
  return `M${points.join(" L")} Z M${bore},0 A${bore},${bore} 0 1,0 ${-bore},0 A${bore},${bore} 0 1,0 ${bore},0 Z`;
}

export function HeroGears() {
  return <>
    {(["bottom-left"] as const).map((corner) => (
      <div key={corner} className={`hero-gears hero-gears--${corner}`} aria-hidden="true">
        <svg viewBox={corner === "bottom-left" ? "0 0 270 255" : "-68 -68 136 136"} fill="none">
          {(corner === "bottom-left" ? GEARS : [{ ...GEARS[0], x: 0, y: 0 }]).map(({ x, y, teeth, phase, duration, color }) => (
            <g key={teeth} transform={`translate(${x} ${y})`}>
              <g transform={`rotate(${phase})`}>
                <g className="hero-gear-rotor" data-spin={duration}>
                  {/* Broad open rings and white/cyan fills follow the UV Gulf logo. */}
                  <path d={gearOutline(teeth)} fill={color} fillRule="evenodd" />
                </g>
              </g>
            </g>
          ))}
        </svg>
      </div>
    ))}
  </>;
}
