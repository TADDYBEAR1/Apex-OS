Floating glass pill tab bar — the app's primary navigation. Active tab lights cyan with a radial glow.

```jsx
<BottomNav activeTab={tab} onTabChange={setTab} />
```

Defaults to four tabs: HUB / WORKOUT / STATS / FUEL. Pass `tabs` to customize, or `fixed={false}` to dock it inline (e.g. inside a phone mock). Built-in icons: home, workout, stats, fuel.
