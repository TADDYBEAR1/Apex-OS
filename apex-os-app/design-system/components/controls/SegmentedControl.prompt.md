Pill segmented control for switching between 2–4 views (History / Benchmarks, 30d / 90d).

```jsx
<SegmentedControl
  value={view}
  onChange={setView}
  options={[{ key: 'history', label: 'History' }, { key: 'benchmarks', label: 'Benchmarks' }]}
/>
```

Active segment fills dim cyan; labels are uppercase Space Grotesk.
