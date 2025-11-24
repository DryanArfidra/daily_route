import React from 'react';
import ScheduleList from '../components/ScheduleList';
import { type ScheduleItem } from '../types/index';

interface HomeProps {
  schedules: ScheduleItem[];
  onEditSchedule: (schedule: ScheduleItem) => void;
  onDeleteSchedule: (id: string) => void;
  onToggleScheduleComplete: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({
  schedules,
  onEditSchedule,
  onDeleteSchedule,
  onToggleScheduleComplete,
}) => {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Jadwal Harian</h1>
          <p className="text-gray-600">{today}</p>
        </div>

        <ScheduleList
          schedules={schedules}
          onEdit={onEditSchedule}
          onDelete={onDeleteSchedule}
          onToggleComplete={onToggleScheduleComplete}
        />
      </div>
    </div>
  );
};

export default Home;