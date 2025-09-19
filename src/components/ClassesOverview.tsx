import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PlusIcon, ClockIcon, CalendarIcon, MoreHorizontalIcon, EditIcon, ArchiveIcon, TrashIcon } from 'lucide-react';
// Mock data for classes
const mockClasses = [{
  id: '1',
  title: 'Contracts',
  professor: 'Prof. Sarah Johnson',
  progress: 65,
  lastStudied: '2 days ago',
  color: 'blue'
}, {
  id: '2',
  title: 'Constitutional Law',
  professor: 'Prof. Michael Chen',
  progress: 42,
  lastStudied: '5 days ago',
  color: 'emerald'
}, {
  id: '3',
  title: 'Criminal Law',
  professor: 'Prof. Robert Wilson',
  progress: 78,
  lastStudied: '1 day ago',
  color: 'amber'
}, {
  id: '4',
  title: 'Torts',
  professor: 'Prof. Emily Rodriguez',
  progress: 30,
  lastStudied: '1 week ago',
  color: 'violet'
}];
const ClassesOverview: React.FC = () => {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-900 text-blue-100 border-blue-800';
      case 'emerald':
        return 'bg-emerald-900 text-emerald-100 border-emerald-800';
      case 'amber':
        return 'bg-amber-900 text-amber-100 border-amber-800';
      case 'violet':
        return 'bg-violet-900 text-violet-100 border-violet-800';
      default:
        return 'bg-gray-800 text-gray-100 border-gray-700';
    }
  };
  const getProgressColorClass = (progress: number) => {
    if (progress >= 75) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-rose-500';
  };
  return <div className="text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Your Classes</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage and track your progress across all your law classes
        </p>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-background-card rounded-xl shadow-sm p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-900 text-blue-100">
              <ClockIcon size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">
                Total Study Time
              </h3>
              <p className="text-2xl font-semibold text-white">24h 35m</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">This week</span>
              <span className="text-blue-400 font-medium">
                +12% from last week
              </span>
            </div>
          </div>
        </div>
        <div className="bg-background-card rounded-xl shadow-sm p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-emerald-900 text-emerald-100">
              <CalendarIcon size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">
                Current Streak
              </h3>
              <p className="text-2xl font-semibold text-white">5 days</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Best streak</span>
              <span className="text-emerald-400 font-medium">12 days</span>
            </div>
          </div>
        </div>
        <div className="bg-background-card rounded-xl shadow-sm p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-amber-900 text-amber-100">
              <BookOpenIcon size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">
                Flashcards Studied
              </h3>
              <p className="text-2xl font-semibold text-white">342</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">This month</span>
              <span className="text-amber-400 font-medium">
                +85 from last month
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockClasses.map(classItem => <div key={classItem.id} className={`relative bg-background-card rounded-xl shadow-sm overflow-hidden border border-gray-800 transition-all duration-200 ${hoveredClass === classItem.id ? 'transform scale-[1.02] shadow-md' : ''}`} onMouseEnter={() => setHoveredClass(classItem.id)} onMouseLeave={() => {
        setHoveredClass(null);
        if (!showDropdown) setShowDropdown(null);
      }}>
            <Link to={`/study-room/${classItem.id}`} className="block">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClass(classItem.color)}`}>
                    {classItem.title}
                  </div>
                  <div className="relative">
                    <button onClick={e => {
                  e.preventDefault();
                  setShowDropdown(showDropdown === classItem.id ? null : classItem.id);
                }} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors">
                      <MoreHorizontalIcon size={16} />
                    </button>
                    {/* Dropdown menu */}
                    {showDropdown === classItem.id && <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background-card ring-1 ring-black ring-opacity-5 z-10 border border-gray-800">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 w-full text-left" role="menuitem">
                            <EditIcon size={16} className="mr-3 text-gray-500" />
                            Edit
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 w-full text-left" role="menuitem">
                            <ArchiveIcon size={16} className="mr-3 text-gray-500" />
                            Archive
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-800 w-full text-left" role="menuitem">
                            <TrashIcon size={16} className="mr-3 text-red-500" />
                            Delete
                          </button>
                        </div>
                      </div>}
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {classItem.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {classItem.professor}
                </p>
                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-300">Progress</span>
                    <span className="text-gray-500">{classItem.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getProgressColorClass(classItem.progress)}`} style={{
                  width: `${classItem.progress}%`
                }}></div>
                  </div>
                </div>
                <div className="mt-5 flex items-center text-sm text-gray-400">
                  <ClockIcon size={14} className="mr-1" />
                  Last studied {classItem.lastStudied}
                </div>
              </div>
            </Link>
          </div>)}
        {/* Add New Class Card */}
        <div className={`relative bg-background-card rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center p-6 transition-all duration-200 hover:border-accent-yellow group ${hoveredClass === 'new' ? 'transform scale-[1.02]' : ''}`} onMouseEnter={() => setHoveredClass('new')} onMouseLeave={() => setHoveredClass(null)}>
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3 group-hover:bg-gray-700 transition-colors">
            <PlusIcon size={24} className="text-gray-300 group-hover:text-accent-yellow" />
          </div>
          <h3 className="text-base font-medium text-white">Add New Class</h3>
          <p className="mt-1 text-sm text-gray-400 text-center">
            Create a new class to organize your study materials
          </p>
          {/* Tooltip */}
          <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-200 ${hoveredClass === 'new' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            Start your first class
            <svg className="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        </div>
      </div>
    </div>;
};
export default ClassesOverview;