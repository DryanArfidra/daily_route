import React, { useState, useEffect } from 'react';
import type { ScheduleItem, TargetItem, ModalMode, ItemType } from '../types/index';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ScheduleItem | TargetItem) => void;
  mode: ModalMode;
  itemType: ItemType;
  editingItem?: ScheduleItem | TargetItem;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  mode,
  itemType,
  editingItem,
}) => {
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      if (itemType === 'schedule') {
        const scheduleItem = editingItem as ScheduleItem;
        setTime(scheduleItem.time);
        setCategory(scheduleItem.category || '');
      }
    } else {
      setTime('');
      setTitle('');
      setCategory('');
    }
  }, [editingItem, itemType, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (itemType === 'schedule') {
      if (!time.trim()) return;
      
      const scheduleItem: ScheduleItem = {
        id: editingItem?.id || Date.now().toString(),
        time: time.trim(),
        title: title.trim(),
        category: category.trim(),
        completed: editingItem?.completed || false,
      };
      onSave(scheduleItem);
    } else {
      const targetItem: TargetItem = {
        id: editingItem?.id || Date.now().toString(),
        title: title.trim(),
        completed: editingItem?.completed || false,
      };
      onSave(targetItem);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-purple-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-scale-in">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {mode === 'add' ? 'Tambah' : 'Edit'} {itemType === 'schedule' ? 'Jadwal' : 'Target'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {itemType === 'schedule' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Waktu
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori (opsional)
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Contoh: Kerja, Olahraga, Belajar"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {itemType === 'schedule' ? 'Aktivitas' : 'Target'}
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                itemType === 'schedule' 
                  ? 'Apa yang akan kamu lakukan?'
                  : 'Target apa yang ingin dicapai?'
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium transition-colors hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-xl font-medium transition-colors hover:bg-purple-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;