import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { NUTRITION_DATA } from '../data/sampleData';

export default function FuelScreen() {
  const [viewMode, setViewMode] = useState('macros'); // 'macros' | 'grocery'
  const [nutrition, setNutrition] = useState(NUTRITION_DATA);
  const [showAddFood, setShowAddFood] = useState(false);
  const [addMealType, setAddMealType] = useState('breakfast');

  const remaining = nutrition.calorieGoal - nutrition.calorieConsumed;
  const calPercent = Math.round((nutrition.calorieConsumed / nutrition.calorieGoal) * 100);

  const toggleGroceryItem = (id) => {
    setNutrition(prev => ({
      ...prev,
      groceryList: prev.groceryList.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  const mealSections = [
    { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { key: 'lunch', label: 'Lunch', icon: '☀️' },
    { key: 'dinner', label: 'Dinner', icon: '🌙' },
    { key: 'snacks', label: 'Snacks', icon: '🥜' },
  ];

  const macros = [
    { label: 'Protein', current: nutrition.protein.current, target: nutrition.protein.target, color: 'var(--cyan)' },
    { label: 'Carbs', current: nutrition.carbs.current, target: nutrition.carbs.target, color: '#4FC3F7' },
    { label: 'Fats', current: nutrition.fats.current, target: nutrition.fats.target, color: '#FFD54F' },
  ];

  return (
    <div className="screen" style={{ paddingTop: '16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px', animation: 'fadeInUp 0.4s ease-out' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>Fuel</h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Daily Macro Tracking & Provisioning</p>
      </div>

      {/* View Toggle */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', padding: '4px', background: 'var(--surface)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--surface-border)', animation: 'fadeInUp 0.5s ease-out' }}>
        {[{ key: 'macros', label: 'Macros' }, { key: 'grocery', label: 'Grocery List' }].map(v => (
          <button key={v.key} onClick={() => setViewMode(v.key)} style={{
            flex: 1, padding: '10px', borderRadius: 'var(--radius-pill)', border: 'none',
            background: viewMode === v.key ? 'var(--cyan-dim)' : 'transparent',
            color: viewMode === v.key ? 'var(--cyan)' : 'var(--muted)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.25s ease', letterSpacing: '0.04em',
          }}>{v.label}</button>
        ))}
      </div>

      {viewMode === 'macros' ? (
        <>
          {/* Calorie Card */}
          <GlassCard style={{ padding: '24px', marginBottom: '20px', animation: 'fadeInUp 0.6s ease-out' }}>
            <span className="label-sm" style={{ marginBottom: '8px', display: 'block' }}>DAILY TARGET</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', lineHeight: 1 }}>{nutrition.calorieGoal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--cyan)' }}>KCAL</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', color: remaining > 0 ? 'var(--cyan)' : 'var(--orange)' }}>{remaining > 0 ? `${remaining} REMAINING` : 'IN SURPLUS'}</span>
            </div>

            {/* Macro Bars */}
            {macros.map((macro, i) => (
              <div key={i} style={{ marginBottom: i < macros.length - 1 ? '12px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{macro.label}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{macro.current}g / {macro.target}g</span>
                </div>
                <div className="progress-track" style={{ height: '8px' }}>
                  <div className="progress-fill" style={{
                    width: `${Math.min((macro.current / macro.target) * 100, 100)}%`,
                    background: macro.color === 'var(--cyan)' ? 'linear-gradient(90deg, var(--cyan), #00DDAA)' : macro.color,
                    boxShadow: `0 0 8px ${macro.color === 'var(--cyan)' ? 'rgba(0,255,204,0.3)' : 'rgba(0,0,0,0.1)'}`,
                  }} />
                </div>
              </div>
            ))}
          </GlassCard>

          {/* Meal Sections */}
          {mealSections.map((meal, mi) => (
            <div key={meal.key} style={{ marginBottom: '20px', animation: `fadeInUp ${0.7 + mi * 0.1}s ease-out` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{meal.icon}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{meal.label}</h3>
                </div>
                <button onClick={() => { setAddMealType(meal.key); setShowAddFood(true); }} style={{
                  width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(0,255,204,0.2)',
                  background: 'transparent', color: 'var(--cyan)', fontSize: '18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              </div>
              {(nutrition.meals[meal.key] || []).map((food) => (
                <GlassCard key={food.id} style={{ padding: '14px 16px', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px' }}>{food.name}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{food.calories} kcal</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>P: {food.protein}g</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>C: {food.carbs}g</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>F: {food.fat}g</span>
                  </div>
                </GlassCard>
              ))}
              {(!nutrition.meals[meal.key] || nutrition.meals[meal.key].length === 0) && (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)' }}>
                  No items logged
                </div>
              )}
            </div>
          ))}
        </>
      ) : (
        /* Grocery List */
        <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>Provisioning Queue</h2>
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(0,255,204,0.2)', background: 'transparent', color: 'var(--cyan)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
          {nutrition.groceryList.map((item) => (
            <GlassCard key={item.id} onClick={() => toggleGroceryItem(item.id)} style={{ padding: '16px', marginBottom: '8px', opacity: item.checked ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '6px',
                  border: item.checked ? 'none' : '2px solid var(--surface-border)',
                  background: item.checked ? 'var(--cyan)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all 0.25s ease',
                }}>
                  {item.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: item.checked ? 'line-through' : 'none', color: item.checked ? 'var(--muted)' : 'var(--text)' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>{item.qty} · {item.category}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Add Food Modal */}
      {showAddFood && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAddFood(false)}>
          <div className="modal-sheet" style={{ maxHeight: '60vh' }}>
            <div className="modal-handle" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Add Food</h2>
            <input placeholder="Search food..." style={{
              width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)',
              color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none',
              marginBottom: '16px',
            }} />
            {['Chicken Breast (200g)', 'Brown Rice (150g)', 'Banana', 'Whey Protein Shake', 'Mixed Nuts (30g)'].map((food, i) => (
              <button key={i} onClick={() => {
                const newFood = { id: `mf-${Date.now()}-${i}`, name: food, calories: [165, 195, 105, 130, 175][i], protein: [31, 4, 1, 25, 5][i], carbs: [0, 43, 27, 3, 6][i], fat: [4, 1, 0, 2, 15][i] };
                setNutrition(prev => ({ ...prev, meals: { ...prev.meals, [addMealType]: [...(prev.meals[addMealType]||[]), newFood] }, calorieConsumed: prev.calorieConsumed + newFood.calories }));
                setShowAddFood(false);
              }} style={{
                width: '100%', padding: '14px 16px', border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)',
                color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: '14px',
                fontWeight: 500, cursor: 'pointer', marginBottom: '6px', textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,204,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--surface-border)'; }}
              >{food}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
