The glass container primitive. Near-invisible surface, hairline border, warms toward cyan when interactive.

```jsx
<GlassCard>Static content panel</GlassCard>
<GlassCard onClick={() => go('workout')} padding={24}>Tap target</GlassCard>
<GlassCard glow>Highlighted readout</GlassCard>
```

Passing `onClick` makes it a focusable button with the hover lift. `glow` adds a static cyan halo. `padding` defaults to 24px.
