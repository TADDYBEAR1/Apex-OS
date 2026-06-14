Big thumb-target numeric stepper for logging weights, reps and times in-session.

```jsx
<Stepper label="New Record (KG)" value={kg} onChange={setKg} min={0} max={300} step={2.5} unit="kg" />
```

Two 72px round ±buttons flank a 48px cyan readout that pulses on change. `step` is the increment; `unit` renders beside the value.
