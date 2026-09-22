// app/admin/users/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye, 
  ShieldAlert, 
  FileText, 
  ChevronLeft,
  MoreVertical,
  Building,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";

// Mock Data
const pendingKYC = [
  {
    id: "REQ-001",
    name: "AgriTech Supplies",
    type: "Trader",
    documentType: "GST Certificate & APMC License",
    submittedAt: "2 hours ago",
    riskScore: "Low"
  },
  {
    id: "REQ-002",
    name: "Shivaji Traders",
    type: "Trader",
    documentType: "Trade License & PAN",
    submittedAt: "5 hours ago",
    riskScore: "Medium"
  },
  {
    id: "REQ-003",
    name: "Ramesh Patil",
    type: "Farmer",
    documentType: "7/12 Land Extract",
    submittedAt: "1 day ago",
    riskScore: "Low"
  }
];

const userDirectory = [
  { id: "USR-992", name: "Metro Agro Trading Co.", role: "Trader", location: "Navi Mumbai", status: "Verified" },
  { id: "USR-993", name: "Amit Deshmukh", role: "Farmer", location: "Pune", status: "Verified" },
  { id: "USR-994", name: "Navin Traders", role: "Trader", location: "Nashik", status: "Suspended" },
  { id: "USR-995", name: "Vijay Kale", role: "Farmer", location: "Nashik", status: "Pending KYC" },
];

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<"kyc" | "directory">("kyc");
  const [searchQuery, setSearchQuery] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-floral-white p-6 md:p-12 font-body">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/admin/dashboard" 
            className="w-fit text-golden-chestnut hover:text-sage-green flex items-center gap-1 font-medium transition-colors text-sm"
          >
            <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-pitch-black font-heading flex items-center gap-3">
                <Users className="text-sage-green" size={32} />
                User Management
              </h1>
              <p className="text-golden-chestnut font-medium mt-2">
                Process KYC verifications and manage the platform's user directory.
              </p>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex p-1 bg-white border border-[#F0EBE1] rounded-xl shadow-sm w-fit">
              <button 
                onClick={() => setActiveTab("kyc")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  activeTab === "kyc" ? "bg-sage-green text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                Pending KYC <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingKYC.length}</span>
              </button>
              <button 
                onClick={() => setActiveTab("directory")}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  activeTab === "directory" ? "bg-pitch-black text-white shadow-md" : "text-golden-chestnut hover:text-pitch-black"
                }`}
              >
                User Directory
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: KYC APPROVAL QUEUE */}
          {activeTab === "kyc" && (
            <motion.div 
              key="kyc"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingKYC.map((req) => (
                  <motion.div key={req.id} variants={itemVariants} className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#F0EBE1] bg-floral-white/30 flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-xl h-fit ${req.type === 'Trader' ? 'bg-pitch-black/10 text-pitch-black' : 'bg-sage-green/10 text-sage-green'}`}>
                          {req.type === 'Trader' ? <Building size={20} /> : <UserIcon size={20} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-pitch-black text-lg leading-tight">{req.name}</h3>
                          <p className="text-xs font-bold text-golden-chestnut uppercase tracking-wider mt-1">{req.type}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-golden-chestnut uppercase tracking-wider mb-1">Submitted Documents</p>
                        <div className="flex items-center gap-2 p-3 bg-floral-white rounded-xl border border-[#F0EBE1]">
                          <FileText size={16} className="text-sage-green shrink-0" />
                          <span className="text-sm font-bold text-pitch-black">{req.documentType}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-golden-chestnut">
                          <ShieldAlert size={14} className={req.riskScore === 'Low' ? 'text-sage-green' : 'text-orange-500'} />
                          Risk: <span className="font-bold text-pitch-black">{req.riskScore}</span>
                        </div>
                        <span className="text-xs font-medium text-golden-chestnut">{req.submittedAt}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-floral-white/50 border-t border-[#F0EBE1] grid grid-cols-3 gap-2">
                      <button className="flex flex-col items-center justify-center gap-1 py-2 text-pitch-black hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#F0EBE1]">
                        <Eye size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Review</span>
                      </button>
                      <button className="flex flex-col items-center justify-center gap-1 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <XCircle size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Reject</span>
                      </button>
                      <button className="flex flex-col items-center justify-center gap-1 py-2 text-sage-green hover:bg-sage-green/10 rounded-lg transition-colors">
                        <CheckCircle size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Approve</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: USER DIRECTORY */}
          {activeTab === "directory" && (
            <motion.div 
              key="directory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-[#F0EBE1] shadow-sm overflow-hidden flex flex-col"
            >
              {/* Toolbar */}
              <div className="p-4 border-b border-[#F0EBE1] bg-floral-white/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search by name, ID, or location..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#F0EBE1] text-pitch-black text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-sage-green transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-golden-chestnut/50" size={16} />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#F0EBE1] rounded-xl text-sm font-bold text-pitch-black hover:border-sage-green transition-all w-full sm:w-auto">
                  <Filter size={16} /> Filters
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-floral-white/50 border-b border-[#F0EBE1]">
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">User</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Role</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Location</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut">Status</th>
                      <th className="p-4 font-bold text-xs uppercase tracking-wider text-golden-chestnut text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EBE1]">
                    {userDirectory.map((user) => (
                      <tr key={user.id} className="hover:bg-floral-white/30 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-pitch-black">{user.name}</p>
                          <span className="text-[10px] font-bold text-golden-chestnut bg-[#F0EBE1] px-2 py-0.5 rounded-md mt-1 inline-block">
                            {user.id}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1.5 text-sm font-bold ${user.role === 'Trader' ? 'text-pitch-black' : 'text-sage-green'}`}>
                            {user.role === 'Trader' ? <Building size={14} /> : <UserIcon size={14} />}
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-pitch-black text-sm">{user.location}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            user.status === "Verified" ? "bg-sage-green/10 text-sage-green" :
                            user.status === "Suspended" ? "bg-red-500/10 text-red-600" :
                            "bg-orange-500/10 text-orange-600"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-2 text-golden-chestnut hover:text-pitch-black hover:bg-[#F0EBE1] rounded-lg transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
