import { useState, useEffect } from 'react';
import type { ScheduleItem, TargetItem, ActiveTab, ModalMode, ItemType } from './types/index';
import { storage } from './utils/storage';
import Home from './pages/Home';
import Target from './pages/Target';
import Statistics from './pages/Statistics';
import BottomNav from './components/BottomNav';
import FloatingButton from './components/FloatingButton';
import AddItemModal from './components/AddItemModal';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [modalItemType, setModalItemType] = useState<ItemType>('schedule');
  const [editingItem, setEditingItem] = useState<ScheduleItem | TargetItem | undefined>();

  // Load data from localStorage on component mount
  useEffect(() => {
    setSchedules(storage.getSchedules());
    setTargets(storage.getTargets());
  }, []);

  // Save data to localStorage whenever schedules or targets change
  useEffect(() => {
    storage.saveSchedules(schedules);
  }, [schedules]);

  useEffect(() => {
    storage.saveTargets(targets);
  }, [targets]);

  const handleAddClick = () => {
    setModalMode('add');
    setModalItemType(activeTab === 'home' ? 'schedule' : 'target');
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditSchedule = (schedule: ScheduleItem) => {
    setModalMode('edit');
    setModalItemType('schedule');
    setEditingItem(schedule);
    setIsModalOpen(true);
  };

  const handleEditTarget = (target: TargetItem) => {
    setModalMode('edit');
    setModalItemType('target');
    setEditingItem(target);
    setIsModalOpen(true);
  };

  const handleSaveItem = (item: ScheduleItem | TargetItem) => {
    if (modalItemType === 'schedule') {
      const schedule = item as ScheduleItem;
      if (modalMode === 'add') {
        setSchedules(prev => [...prev, schedule]);
      } else {
        setSchedules(prev => prev.map(s => s.id === schedule.id ? schedule : s));
      }
    } else {
      const target = item as TargetItem;
      if (modalMode === 'add') {
        setTargets(prev => [...prev, target]);
      } else {
        setTargets(prev => prev.map(t => t.id === target.id ? target : t));
      }
    }
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteTarget = (id: string) => {
    setTargets(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleScheduleComplete = (id: string) => {
    setSchedules(prev => prev.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    ));
  };

  const handleToggleTargetComplete = (id: string) => {
    setTargets(prev => prev.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            schedules={schedules}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onToggleScheduleComplete={handleToggleScheduleComplete}
          />
        );
      case 'target':
        return (
          <Target
            targets={targets}
            onEditTarget={handleEditTarget}
            onDeleteTarget={handleDeleteTarget}
            onToggleTargetComplete={handleToggleTargetComplete}
          />
        );
      case 'statistics':
        return <Statistics schedules={schedules} targets={targets} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative max-w-md mx-auto">
      {renderPage()}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {(activeTab === 'home' || activeTab === 'target') && (
        <FloatingButton onClick={handleAddClick} />
      )}

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        mode={modalMode}
        itemType={modalItemType}
        editingItem={editingItem}
      />
    </div>
  );
}

export default App;