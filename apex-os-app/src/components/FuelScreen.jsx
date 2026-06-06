import React, { useState } from 'react';
import GlassCard from './GlassCard';
import ProfileButton from './ProfileButton';
import Stepper from './Stepper';
import BottomSheetModal from './BottomSheetModal';
import CheckboxRow from './CheckboxRow';
import IconButton from './IconButton';
import SegmentedControl from './SegmentedControl';
import { calculateFuelTotals } from '../utils/stats';

export default function FuelScreen({ nutrition, setNutrition, profile, onOpenProfile }) {
  const [viewMode, setViewMode] = useState('macros'); // 'macros' | 'grocery'
  const [showAddFood, setShowAddFood] = useState(false);
  const [addMealType, setAddMealType] = useState('breakfast');
  const [showAddGrocery, setShowAddGrocery] = useState(false);
  const [newGroceryName, setNewGroceryName] = useState('');
  const [newGroceryQty, setNewGroceryQty] = useState(1);
  const [newGroceryUnit, setNewGroceryUnit] = useState('units');
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showEditTargets, setShowEditTargets] = useState(false);
  const [editingMealItem, setEditingMealItem] = useState(null);

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
  const [editWater, setEditWater] = useState(nutrition.water?.target || 3000);

  const totals = calculateFuelTotals(nutrition);
  const remaining = nutrition.calorieGoal - totals.calories;
  const isSurplus = remaining < 0;
  const calPercent = Math.round((totals.calories / nutrition.calorieGoal) * 100);
  const calPercentNormalized = Math.min((totals.calories / nutrition.calorieGoal) * 100, 100);
  const strokeDasharray = 283;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * calPercentNormalized) / 100;
  const ringColor = isSurplus ? 'var(--orange)' : 'var(--cyan)';

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
      return { ...prev, meals: newMeals, water: { ...(prev.water || {}), current: 0 } };
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

  const resetMealForm = () => {
    setCustomFoodName('');
    setCustomCals('');
    setCustomPro('');
    setCustomCarbs('');
    setCustomFat('');
    setEditingMealItem(null);
  };

  const openAddFood = (mealKey) => {
    resetMealForm();
    setAddMealType(mealKey);
    setShowAddFood(true);
  };

  const openEditFood = (mealKey, food) => {
    setAddMealType(mealKey);
    setEditingMealItem({ mealKey, id: food.id });
    setCustomFoodName(food.name);
    setCustomCals(String(food.calories || 0));
    setCustomPro(String(food.protein || 0));
    setCustomCarbs(String(food.carbs || 0));
    setCustomFat(String(food.fat || 0));
    setShowAddFood(true);
  };

  const saveMealItem = () => {
    if (customFoodName.trim() === '') return;

    const mealData = {
      name: customFoodName.trim(),
      calories: parseInt(customCals) || 0,
      protein: parseInt(customPro) || 0,
      carbs: parseInt(customCarbs) || 0,
      fat: parseInt(customFat) || 0,
    };

    setNutrition(prev => {
      const currentMealItems = prev.meals[addMealType] || [];
      const nextMeals = { ...prev.meals };

      if (editingMealItem) {
        nextMeals[editingMealItem.mealKey] = (prev.meals[editingMealItem.mealKey] || []).map(item =>
          item.id === editingMealItem.id ? { ...item, ...mealData } : item
        );
      } else {
        nextMeals[addMealType] = [
          ...currentMealItems,
          {
            id: `mf-${Date.now()}`,
            ...mealData,
            checked: false,
          },
        ];
      }

      return { ...prev, meals: nextMeals };
    });

    setShowAddFood(false);
    resetMealForm();
  };

  const deleteMealItem = (mealKey, id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    setNutrition(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealKey]: (prev.meals[mealKey] || []).filter(item => item.id !== id),
      },
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
      water: { ...(prev.water || {}), target: editWater },
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
          <h1 style={{ fontSize: '40px', fontWeight: 300, marginBottom: '-4px', letterSpacing: '-0.04em' }}>Fuel<span style={{ color:'var(--cyan)', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>.</span></h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>Daily Macro Tracking & Provisioning</p>
        </div>
        <ProfileButton profile={profile} onClick={onOpenProfile} />
      </div>

      {/* View Toggle */}
      <SegmentedControl
        value={viewMode}
        onChange={setViewMode}
        options={[{ key: 'macros', label: 'Macros' }, { key: 'grocery', label: 'Grocery List' }]}
        style={{ marginBottom: '24px', animation: 'fadeInUp 0.5s ease-out' }}
      />

      {viewMode === 'macros' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px', gap: '8px' }}>
            <button onClick={() => {
              setEditCalGoal(nutrition.calorieGoal);
              setEditProtein(nutrition.protein.target);
              setEditCarbs(nutrition.carbs.target);
              setEditFats(nutrition.fats.target);
              setEditWater(nutrition.water?.target || 3000);
              setShowEditTargets(true);
            }} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,255,204,0.2)', borderRadius: 'var(--radius-pill)', color: 'var(--cyan)', fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Edit Targets</button>
            <button onClick={handleResetMeals} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-pill)', color: 'var(--muted)', fontSize: '11px', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Reset Today</button>
          </div>

          {/* Calorie Card */}
          <GlassCard style={{ padding: '24px', marginBottom: '20px', animation: 'fadeInUp 0.6s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="label-sm" style={{ marginBottom: '8px' }}>DAILY TARGET</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '56px', lineHeight: 1, letterSpacing: '-0.02em', color: isSurplus ? 'var(--orange)' : 'var(--text)', transition: 'color 0.4s ease' }}>
                  {totals.calories.toLocaleString()}
                </span>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: isSurplus ? 'var(--orange)' : 'var(--cyan)' }}>{calPercent}% OF {nutrition.calorieGoal.toLocaleString()} KCAL</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', color: isSurplus ? 'var(--orange)' : 'var(--muted)', marginTop: '2px' }}>
                    {isSurplus ? `${Math.abs(remaining).toLocaleString()} KCAL SURPLUS` : `${remaining.toLocaleString()} KCAL REMAINING`}
                  </div>
                </div>
              </div>
              
              <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke={ringColor} strokeWidth="6" 
                    strokeLinecap="round" 
                    strokeDasharray={strokeDasharray} 
                    strokeDashoffset={strokeDashoffset} 
                    style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.4s ease' }}
                  />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px' }}>{isSurplus ? '🔥' : '⚡'}</span>
                </div>
              </div>
            </div>

            {/* Macro Bars */}
            {macros.map((macro, i) => {
              const isOver = macro.current > macro.target;
              const fillWidth = Math.min((macro.current / Math.max(macro.target, 1)) * 100, 100);
              const barColor = isOver ? 'var(--orange)' : (macro.color === 'var(--cyan)' ? 'linear-gradient(90deg, var(--cyan), #00DDAA)' : macro.color);
              const shadowColor = isOver ? 'rgba(255,100,0,0.3)' : (macro.color === 'var(--cyan)' ? 'rgba(0,255,204,0.3)' : 'rgba(0,0,0,0.1)');
              
              return (
                <div key={i} style={{ marginBottom: i < macros.length - 1 ? '16px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: isOver ? 'var(--orange)' : 'var(--text)' }}>{macro.label}</span>
                    <span style={{ fontSize: '14px', color: isOver ? 'var(--orange)' : 'var(--text-secondary)' }}>
                      {macro.current}g / {macro.target}g {isOver && <span style={{ fontWeight: 600 }}> (+{macro.current - macro.target}g)</span>}
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: '8px', background: 'rgba(255,255,255,0.05)' }}>
                    <div className="progress-fill" style={{
                      width: `${fillWidth}%`,
                      background: barColor,
                      boxShadow: `0 0 8px ${shadowColor}`,
                      transition: 'all 0.4s ease'
                    }} />
                  </div>
                </div>
              );
            })}
            
            {/* Water Tracker */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Hydration</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{(nutrition.water?.current || 0).toLocaleString()}ml / {(nutrition.water?.target || 3000).toLocaleString()}ml</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <IconButton label="Drink 250ml Water" onClick={() => setNutrition(prev => ({ ...prev, water: { ...(prev.water || {}), current: (prev.water?.current || 0) + 250 } }))} tone="primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a6 6 0 0 0 6-6c0-4-6-10-6-10S6 12 6 16a6 6 0 0 0 6 6z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </IconButton>
              </div>
            </div>
          </GlassCard>

          {/* Meal Sections */}
          {mealSections.map((meal, mi) => (
            <div key={meal.key} style={{ marginBottom: '20px', animation: `fadeInUp ${0.7 + mi * 0.1}s ease-out` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{meal.icon}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{meal.label}</h3>
                </div>
                <IconButton label={`Add food to ${meal.label}`} tone="primary" onClick={() => openAddFood(meal.key)}>+</IconButton>
              </div>
              {(nutrition.meals[meal.key] || []).map((food) => (
                <CheckboxRow
                  key={food.id}
                  checked={Boolean(food.checked)}
                  title={food.name}
                  meta={`${food.calories} kcal`}
                  subtitle={`P: ${food.protein}g · C: ${food.carbs}g · F: ${food.fat}g`}
                  onToggle={() => toggleMealItem(meal.key, food.id)}
                  action={(
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <IconButton
                        label={`Edit ${food.name}`}
                        size={28}
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditFood(meal.key, food);
                        }}
                      >
                        ✎
                      </IconButton>
                      <IconButton
                        label={`Delete ${food.name}`}
                        tone="danger"
                        size={28}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteMealItem(meal.key, food.id, food.name);
                        }}
                      >
                        ✕
                      </IconButton>
                    </div>
                  )}
                />
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
              <IconButton label="Add grocery item" tone="primary" onClick={() => setShowAddGrocery(true)}>+</IconButton>
            </div>
          </div>
          {nutrition.groceryList.map((item) => (
            <CheckboxRow
              key={item.id}
              checked={Boolean(item.checked)}
              title={item.name}
              subtitle={`${item.qty} · ${item.category}`}
              onToggle={() => toggleGroceryItem(item.id)}
              action={<IconButton label={`Delete ${item.name}`} tone="danger" onClick={(e) => { e.stopPropagation(); deleteGroceryItem(item.id); }}>✕</IconButton>}
              style={{ marginBottom: '8px' }}
            />
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
        <BottomSheetModal title={`${editingMealItem ? 'Edit' : 'Add'} Meal in ${addMealType}`} titleId="add-food-title" onClose={() => { setShowAddFood(false); resetMealForm(); }}>
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
              <button onClick={() => { setShowAddFood(false); resetMealForm(); }} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={saveMealItem} className="btn-primary" style={{ flex: 2 }}>{editingMealItem ? 'Save Changes' : 'Save Meal'}</button>
            </div>
        </BottomSheetModal>
      )}

      {/* Edit Daily Targets Modal */}
      {showEditTargets && (
        <BottomSheetModal title="Edit Daily Targets" titleId="edit-targets-title" onClose={() => setShowEditTargets(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              <Stepper label="Calorie Goal" value={editCalGoal} onChange={setEditCalGoal} min={1000} max={6000} step={50} unit="kcal" />
              <Stepper label="Protein Target" value={editProtein} onChange={setEditProtein} min={50} max={400} step={5} unit="g" />
              <Stepper label="Carbs Target" value={editCarbs} onChange={setEditCarbs} min={50} max={600} step={5} unit="g" />
              <Stepper label="Fats Target" value={editFats} onChange={setEditFats} min={20} max={200} step={5} unit="g" />
              <Stepper label="Water Target" value={editWater} onChange={setEditWater} min={1000} max={6000} step={250} unit="ml" />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowEditTargets(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={saveTargets} className="btn-primary" style={{ flex: 2 }}>Save Targets</button>
            </div>
        </BottomSheetModal>
      )}

      {/* Add Grocery Modal */}
      {showAddGrocery && (
        <BottomSheetModal title="Add to Provisioning Queue" titleId="add-grocery-title" onClose={() => setShowAddGrocery(false)}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase' }}>Item Name</label>
              <input value={newGroceryName} onChange={(e) => setNewGroceryName(e.target.value)} placeholder="e.g. Eggs" style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
              <Stepper label="Quantity" value={newGroceryQty} onChange={setNewGroceryQty} min={1} max={100} />
            </div>

            <div style={{ marginBottom: '24px', position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '13px', color: 'var(--muted)', textTransform: 'uppercase' }}>Unit Type</label>
              
              <div 
                onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.3s ease' }}
              >
                {newGroceryUnit}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showUnitDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: 'var(--muted)' }}>
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {showUnitDropdown && (
                <div style={{
                  position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: '8px',
                  background: 'var(--bg)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)',
                  maxHeight: '200px', overflowY: 'auto', zIndex: 50,
                  boxShadow: '0 -10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                  display: 'flex', flexDirection: 'column',
                  animation: 'fadeInUp 0.2s ease-out'
                }}>
                  {['units', 'lbs', 'kg', 'g', 'oz', 'tubs', 'jars', 'bags', 'boxes', 'bunches', 'scoops'].map(u => (
                    <button
                      key={u}
                      onClick={() => { setNewGroceryUnit(u); setShowUnitDropdown(false); }}
                      style={{
                        padding: '12px 16px', background: 'transparent', border: 'none', color: newGroceryUnit === u ? 'var(--cyan)' : 'var(--text)',
                        textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '15px', cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowAddGrocery(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
              <button onClick={() => {
                if (newGroceryName.trim() === '') return;
                const newItem = { id: `g-${Date.now()}`, name: newGroceryName, qty: `${newGroceryQty} ${newGroceryUnit}`, category: 'General', checked: false };
                setNutrition(prev => ({ ...prev, groceryList: [...prev.groceryList, newItem] }));
                setNewGroceryName('');
                setNewGroceryQty(1);
                setNewGroceryUnit('units');
                setShowAddGrocery(false);
              }} className="btn-primary" style={{ flex: 2 }}>Add Item</button>
            </div>
        </BottomSheetModal>
      )}
    </div>
  );
}
