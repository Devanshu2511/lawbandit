import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpenIcon, ClockIcon, CalendarIcon, PlusIcon, ShareIcon, CopyIcon, TrashIcon, EditIcon, ArrowLeftIcon } from 'lucide-react';
// Mock data for study sets
const mockStudySets = [{
  id: '1',
  title: 'Contract Formation',
  type: 'flashcards',
  cardCount: 24,
  lastUsed: '1 day ago',
  completion: 75
}, {
  id: '2',
  title: 'Contract Remedies',
  type: 'flashcards',
  cardCount: 18,
  lastUsed: '3 days ago',
  completion: 40
}, {
  id: '3',
  title: 'Offer and Acceptance',
  type: 'multiple-choice',
  cardCount: 15,
  lastUsed: '1 week ago',
  completion: 60
}];
// Mock data for class details
const mockClassDetails = {
  id: '1',
  title: 'Contracts',
  professor: 'Prof. Sarah Johnson',
  description: 'Foundational principles of contract law including formation, performance, breach, and remedies.'
};
const StudyRoom: React.FC = () => {
  const {
    classId
  } = useParams<{
    classId: string;
  }>();
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  // Filter study sets based on active tab
  const filteredSets = activeTab === 'all' ? mockStudySets : mockStudySets.filter(set => set.type === activeTab);
  const getProgressColorClass = (progress: number) => {
    if (progress >= 75) return 'bg-emerald-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-amber-500';
    return 'bg-rose-500';
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flashcards':
        return <div className="p-2 bg-blue-900 rounded-lg text-blue-100">
            <BookOpenIcon size={16} />
          </div>;
      case 'multiple-choice':
        return <div className="p-2 bg-emerald-900 rounded-lg text-emerald-100">
            <BookOpenIcon size={16} />
          </div>;
      case 'issue-spotter':
        return <div className="p-2 bg-amber-900 rounded-lg text-amber-100">
            <BookOpenIcon size={16} />
          </div>;
      default:
        return <div className="p-2 bg-gray-800 rounded-lg text-gray-300">
            <BookOpenIcon size={16} />
          </div>;
    }
  };
  return <div className="text-white">
      {/* Header with breadcrumb and actions */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center text-sm text-gray-400 mb-1">
            <Link to="/" className="hover:text-accent-yellow transition-colors">
              Classes
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300 font-medium">
              {mockClassDetails.title}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {mockClassDetails.title}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {mockClassDetails.professor}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-background-card hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Classes
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
            <PlusIcon size={16} className="mr-2" />
            Create Study Set
          </button>
        </div>
      </div>
      {/* Study metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-background-card rounded-xl shadow-sm p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-900 text-blue-100">
              <ClockIcon size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">
                Time Studied
              </h3>
              <p className="text-2xl font-semibold text-white">8h 15m</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">This class</span>
              <span className="text-blue-400 font-medium">
                34% of total time
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
                Study Streak
              </h3>
              <p className="text-2xl font-semibold text-white">4 days</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Last studied</span>
              <span className="text-emerald-400 font-medium">
                Yesterday at 7:30 PM
              </span>
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
                Overall Progress
              </h3>
              <p className="text-2xl font-semibold text-white">65%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div className="h-2 rounded-full bg-amber-500" style={{
              width: '65%'
            }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-800 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('all')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-accent-yellow text-white' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'} transition-colors`}>
            All
          </button>
          <button onClick={() => setActiveTab('flashcards')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'flashcards' ? 'border-accent-yellow text-white' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'} transition-colors`}>
            Flashcards
          </button>
          <button onClick={() => setActiveTab('multiple-choice')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'multiple-choice' ? 'border-accent-yellow text-white' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'} transition-colors`}>
            Multiple Choice
          </button>
          <button onClick={() => setActiveTab('issue-spotter')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'issue-spotter' ? 'border-accent-yellow text-white' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'} transition-colors`}>
            Issue Spotter
          </button>
        </nav>
      </div>
      <h2 className="text-xl font-semibold text-white mb-6">Your Study Sets</h2>
      {/* Study Sets Grid */}
      {filteredSets.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSets.map(set => <div key={set.id} className={`relative bg-background-card rounded-xl shadow-sm overflow-hidden border border-gray-800 transition-all duration-200 ${hoveredSet === set.id ? 'transform scale-[1.02] shadow-md' : ''}`} onMouseEnter={() => setHoveredSet(set.id)} onMouseLeave={() => {
        setHoveredSet(null);
        if (!showDropdown) setShowDropdown(null);
      }}>
              <Link to={`/flashcards/${set.id}`} className="block p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getTypeIcon(set.type)}
                    <span className="ml-2 text-xs font-medium text-gray-400 capitalize">
                      {set.type}
                    </span>
                  </div>
                  <div className="relative">
                    <button onClick={e => {
                e.preventDefault();
                setShowDropdown(showDropdown === set.id ? null : set.id);
              }} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    {showDropdown === set.id && <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background-card ring-1 ring-black ring-opacity-5 z-10 border border-gray-800">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 w-full text-left" role="menuitem">
                            <EditIcon size={16} className="mr-3 text-gray-500" />
                            Rename
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 w-full text-left" role="menuitem">
                            <ShareIcon size={16} className="mr-3 text-gray-500" />
                            Share
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 w-full text-left" role="menuitem">
                            <CopyIcon size={16} className="mr-3 text-gray-500" />
                            Duplicate
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
                  {set.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {set.cardCount} cards
                </p>
                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-300">
                      Completion
                    </span>
                    <span className="text-gray-500">{set.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${getProgressColorClass(set.completion)}`} style={{
                width: `${set.completion}%`
              }}></div>
                  </div>
                </div>
                <div className="mt-5 flex items-center text-sm text-gray-400">
                  <ClockIcon size={14} className="mr-1" />
                  Last studied {set.lastUsed}
                </div>
              </Link>
            </div>)}
          {/* Add New Study Set Card */}
          <div className={`relative bg-background-card rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center p-6 transition-all duration-200 hover:border-accent-yellow group ${hoveredSet === 'new' ? 'transform scale-[1.02]' : ''}`} onMouseEnter={() => setHoveredSet('new')} onMouseLeave={() => setHoveredSet(null)}>
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3 group-hover:bg-gray-700 transition-colors">
              <PlusIcon size={24} className="text-gray-300 group-hover:text-accent-yellow" />
            </div>
            <h3 className="text-base font-medium text-white">
              Create New Study Set
            </h3>
            <p className="mt-1 text-sm text-gray-400 text-center">
              Add flashcards, multiple choice, or issue spotters
            </p>
          </div>
        </div> :
    // Empty state
    <div className="bg-background-card rounded-xl border border-gray-800 p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <BookOpenIcon size={36} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No study sets yet
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Create your first study set to start mastering the material in this
            class
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-yellow">
            <PlusIcon size={16} className="mr-2" />
            Create Study Set
          </button>
        </div>}
    </div>;
};
export default StudyRoom;