import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import ProfileButton from './ProfileButton';
import Stepper from './Stepper';
import { calculateFuelTotals } from '../utils/stats';

export default function FuelScreen({ nutrition, setNutrition, profile, onOpenProfile }) {
  const [viewMode, setViewMode] = useState('macros'); // 'macros' | 'grocery'
  const [showAddFood, setShowAddFood] = useState(false);
  const [addMealType, setAddMealType] = useState('breakfast');
  const [showAddGrocery, setShowAddGrocery] = useState(false);
  const [newGroceryName, setNewGroceryName] = useState('');
  const [newGroceryQty, setNewGroceryQty] = useState('');
  const [showEditTargets, setShowEditTargets] = useState(false);

  // Custom Food Form State
  const [customFoodName, setCustomFoodName] = useState('');
  const [customCals, setCustomCals] = useState('');
  const [customPro, setCustomPro] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');

  // Target editing state
  const [editCalGoal, setEditCalGoal] = useState(nutrition.calorieGoal);
  const [editProtein, setEditProtein] = useState(nutrition.protein.target);
  const [editCarbs, setEditCarbs] = useState(nutrition.carbs.target);
  const [editFats, setEditFats] = useState(nutrition.fats.target);

  useEffect(() => {
    if (!showAddFood && !showAddGrocery && !showEditTargets) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowAddFood(false);
        setShowAddGrocery(false);
        setShowEditTargets(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddFood, showAddGrocery, showEditTargets]);

  const totals = calculateFuelTotals(nutrition);
  const remaining = nutrition.calorieGoal - totals.calories;
  const calPercent = Math.round((totals.calories / nutrition.calorieGoal) * 100);

  const toggleMealItem = (mealKey, id) => {
    setNutrition(prev => {
      const newMeals = { ...prev.meals };
      newMeals[mealKey] = newMeals[mealKey].map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      return { ...prev, meals: newMeals };
    });
  };

  const handleResetMeals = () => {
    setNutrition(prev => {
      const newMeals = {};
      Object.keys(prev.meals).forEach(key => {
        newMeals[key] = prev.meals[key].map(m => ({ ...m, checked: false }));
      });
      return { ...prev, meals: newMeals };
    });
  };

  const toggleGroceryItem = (id) => {
    setNutrition(prev => ({
      ...prev,
      groceryList: prev.groceryList.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  const deleteGroceryItem = (id) => {
    setNutrition(prev => ({
      ...prev,
      groceryList: prev.groceryList.filter(item => item.id !== id),
    }));
  };

  const clearCheckedGroceries = () => {
    setNutrition(prev => ({
      ...prev,
      groceryList: prev.groceryList.filter(item => !item.checked),
    }));
  };

  const saveTargets = () => {
    setNutrition(prev => ({
      ...prev,
      calorieGoal: editCalGoal,
      protein: { ...prev.protein, target: editProtein },
      carbs: { ...prev.carbs, target: editCarbs },
      fats: { ...prev.fats, target: editFats },
    }));
    setShowEditTargets(false);
  };

  const checkedGroceryCount = nutrition.groceryList.filter(i => i.checked).length;

  const mealSections = [
    { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { key: 'lunch', label: 'Lunch', icon: '☀️' },
    { key: 'dinner', label: 'Dinner', icon: '🌙' },
    { key: 'snacks', label: 'Snacks', icon: '🥜' },
  ];

  const macros = [
    { label: 'Protein', current: totals.protein, target: nutrition.protein.target, color: 'var(--cyan)' },
    { label: 'Carbs', current: totals.carbs, target: nutrition.carbs.target, color: '#4FC3F7' },
    { label: 'Fats', current: totals.fats, target: nutrition.fats.target, color: '#FFD54F' },
  ];

  return (
    <div className="screen" style={{ paddingTop: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', animation: 'fadeInUp 0.4s ease-out' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>Fuel</h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Daily Macro Tracking & Provisioning</p>
        </div>
        <ProfileButton profile={profile} onClick={onOpenProfile} />
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px', gap: '8px' }}>
            <button onClick={() => {
              setEditCalGoal(nutrition.calorieGoal);
              setEditProtein(nutrition.protein.target);
              setEditCarbs(nutrition.carbs.target);
              setEditFats(nutrition.fats.target);
              setShowEditTargets(true);
            }} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,204,0.2)', borderRadius: 'var(--radius-pill)', color: 'var(--cyan)', fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Edit Targets</button>
            <button onClick={handleResetMeals} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-pill)', color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Reset Today</button>
          </div>

          {/* Calorie Card */}
          <GlassCard style={{ padding: '24px', marginBottom: '20px', animation: 'fadeInUp 0.6s ease-out' }}>
            <span className="label-sm" style={{ marginBottom: '8px', display: 'block' }}>DAILY TARGET</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '2px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', lineHeight: 1 }}>{totals.calories.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--cyan)' }}>{calPercent}% OF {nutrition.calorieGoal.toLocaleString()} KCAL</span>
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
                    width: `${Math.min((macro.current / Math.max(macro.target, 1)) * 100, 100)}%`,
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
                <button onClick={() => { setAddMealType(meal.key); setShowAddFood(true); }} aria-label={`Add food to ${meal.label}`} style={{
                  width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(0,255,204,0.2)',
                  background: 'transparent', color: 'var(--cyan)', fontSize: '18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              </div>
              {(nutrition.meals[meal.key] || []).map((food) => (
                <GlassCard key={food.id} onClick={() => toggleMealItem(meal.key, food.id)} style={{ padding: '14px 16px', marginBottom: '6px', opacity: food.checked ? 0.5 : 1, transition: 'opacity 0.2s ease', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '4px', border: food.checked ? 'none' : '2px solid var(--surface-border)', background: food.checked ? 'var(--cyan)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {food.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: food.checked ? 'line-through' : 'none' }}>{food.name}</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{food.calories} kcal</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>P: {food.protein}g</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>C: {food.carbs}g</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>F: {food.fat}g</span>
                      </div>
                    </div>
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
            <div style={{ display: 'flex', gap: '8px' }}>
              {checkedGroceryCount > 0 && (
                <button onClick={clearCheckedGroceries} style={{
                  padding: '6px 12px', borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--orange)', background: 'transparent',
                  color: 'var(--orange)', fontSize: '11px', fontFamily: 'var(--font-display)',
                  fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em',
                }}>Clear Done ({checkedGroceryCount})</button>
              )}
              <button onClick={() => setShowAddGrocery(true)} aria-label="Add grocery item" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(0,255,204,0.2)', background: 'transparent', color: 'var(--cyan)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
          </div>
          {nutrition.groceryList.map((item) => (
            <GlassCard key={item.id} style={{ padding: '16px', marginBottom: '8px', opacity: item.checked ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  onClick={() => toggleGroceryItem(item.id)}
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={item.checked}
                  aria-label={`Mark ${item.name} as ${item.checked ? 'not done' : 'done'}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleGroceryItem(item.id);
                    }
                  }}
                  style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    border: item.checked ? 'none' : '2px solid var(--surface-border)',
                    background: item.checked ? 'var(--cyan)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transition: 'all 0.25s ease', cursor: 'pointer',
                  }}
                >
                  {item.checked && <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div
                  style={{ flex: 1, cursor: 'pointer' }}
                  onClick={() => toggleGroceryItem(item.id)}
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={item.checked}
                  aria-label={`Mark ${item.name} as ${item.checked ? 'not done' : 'done'}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleGroceryItem(item.id);
                    }
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', textDecoration: item.checked ? 'line-through' : 'none', color: item.checked ? 'var(--muted)' : 'var(--text)' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>{item.qty} · {item.category}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteGroceryItem(item.id); }}
                  aria-label={`Delete ${item.name}`}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '1px solid rgba(255,68,0,0.2)', background: 'transparent',
                    color: 'var(--orange)', fontSize: '14px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,68,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >✕</button>
              </div>
            </GlassCard>
          ))}
          {nutrition.groceryList.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: '14px', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>🛒</span>
              Your grocery list is clear!
            </div>
          )}
        </div>
      )}

      {/* Add Custom Food Modal */}
      {showAddFood && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAddFood(false)}>
          <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby="add-food-title">
            <div className="modal-handle" />
            <h2 id="add-food-title" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Add Custom Meal to {addMealType}</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase' }}>Meal Name</label>
              <input value={customFoodName} onChange={(e) => setCustomFoodName(e.target.value)} placeholder="e.g. Avocado Toast" style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
              <Stepper label="Calories" value={parseInt(customCals) || 0} onChange={(v) => setCustomCals(String(v))} min={0} max={5000} step={10} unit="kcal" />
              <Stepper label="Protein" value={parseInt(customPro) || 0} onChange={(v) => setCustomPro(String(v))} min={0} max={500} step={1} unit="g" />
              <Stepper label="Carbs" value={parseInt(customCarbs) || 0} onChange={(v) => setCustomCarbs(String(v))} min={0} max={500} step={1} unit="g" />
              <Stepper label="Fat" value={parseInt(customFat) || 0} onChange={(v) => setCustomFat(String(v))} min={0} max={500} step={1} unit="g" />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setShowAddFood(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => {
                if (customFoodName.trim() === '') return;
                const newFood = {
                  id: `mf-${Date.now()}`,
                  name: customFoodName,
                  calories: parseInt(customCals) || 0,
                  protein: parseInt(customPro) || 0,
                  carbs: parseInt(customCarbs) || 0,
                  fat: parseInt(customFat) || 0,
                  checked: false
                };
                setNutrition(prev => ({
                  ...prev,
                  meals: {
                    ...prev.meals,
                    [addMealType]: [...(prev.meals[addMealType]||[]), newFood]
                  }
                }));
                setShowAddFood(false);
                setCustomFoodName('');
                setCustomCals('');
                setCustomPro('');
                setCustomCarbs('');
                setCustomFat('');
              }} className="btn-primary" style={{ flex: 2 }}>Save Meal</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Daily Targets Modal */}
      {showEditTargets && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowEditTargets(false)}>
          <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby="edit-targets-title">
            <div className="modal-handle" />
            <h2 id="edit-targets-title" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Edit Daily Targets</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              <Stepper label="Calorie Goal" value={editCalGoal} onChange={setEditCalGoal} min={1000} max={6000} step={50} unit="kcal" />
              <Stepper label="Protein Target" value={editProtein} onChange={setEditProtein} min={50} max={400} step={5} unit="g" />
              <Stepper label="Carbs Target" value={editCarbs} onChange={setEditCarbs} min={50} max={600} step={5} unit="g" />
              <Stepper label="Fats Target" value={editFats} onChange={setEditFats} min={20} max={200} step={5} unit="g" />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowEditTargets(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={saveTargets} className="btn-primary" style={{ flex: 2 }}>Save Targets</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Grocery Modal */}
      {showAddGrocery && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAddGrocery(false)}>
          <div className="modal-sheet" role="dialog" aria-modal="true" aria-labelledby="add-grocery-title">
            <div className="modal-handle" />
            <h2 id="add-grocery-title" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Add to Provisioning Queue</h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase' }}>Item Name</label>
              <input value={newGroceryName} onChange={(e) => setNewGroceryName(e.target.value)} placeholder="e.g. Eggs" style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase' }}>Quantity / Amount</label>
              <input value={newGroceryQty} onChange={(e) => setNewGroceryQty(e.target.value)} placeholder="e.g. 2 Dozen" style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowAddGrocery(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => {
                if (newGroceryName.trim() === '') return;
                const newItem = { id: `g-${Date.now()}`, name: newGroceryName, qty: newGroceryQty || '1 unit', category: 'General', checked: false };
                setNutrition(prev => ({ ...prev, groceryList: [...prev.groceryList, newItem] }));
                setNewGroceryName('');
                setNewGroceryQty('');
                setShowAddGrocery(false);
              }} className="btn-primary" style={{ flex: 2 }}>Add Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
