The Apex OS signature — a circular readiness gauge with an iridescent ice-gradient arc. The brand's hero data element.

```jsx
<ReadinessRing value={88} label="Ready" />
<ReadinessRing value={64} score="64" label="Caution" size={120} id="r2" />
```

`value` drives the arc (0–100). Override `score` to show a different center number, `stops` for a custom three-stop gradient, and `id` when more than one ring renders on the same page.
