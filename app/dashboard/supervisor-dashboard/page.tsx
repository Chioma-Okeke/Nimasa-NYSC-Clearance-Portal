// import React, { useState, useEffect } from 'react';
// import { 
//   Building2, 
//   FileText, 
//   Search, 
//   Filter, 
//   Calendar,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Eye,
//   User,
//   MapPin,
//   Briefcase,
//   RefreshCw,
//   LogOut,
//   MessageSquare,
//   UserCheck,
//   Send,
//   Star
// } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';

// // Zod schema for supervisor review
// const supervisorReviewSchema = z.object({
//   supervisorName: z.string().min(1, 'Supervisor name is required'),
//   daysAbsent: z.number().min(0, 'Days absent cannot be negative').max(365, 'Invalid number of days'),
//   conductRemark: z.string().min(10, 'Conduct remark must be at least 10 characters'),
// });

// type SupervisorReviewValues = z.infer<typeof supervisorReviewSchema>;

// // Mock data for pending and reviewed forms
// const mockPendingForms = [
//   {
//     id: 'CF005',
//     corpsName: 'Alice Johnson',
//     stateCode: 'OG',
//     department: 'Maritime Safety',
//     status: 'PENDING_SUPERVISOR',
//     createdDate: '2024-03-15',
//     lastUpdated: '2024-03-15',
//     submittedDays: 2
//   },
//   {
//     id: 'CF006',
//     corpsName: 'David Wilson',
//     stateCode: 'LA',
//     department: 'Maritime Safety',
//     status: 'PENDING_SUPERVISOR',
//     createdDate: '2024-03-14',
//     lastUpdated: '2024-03-14',
//     submittedDays: 3
//   },
//   {
//     id: 'CF007',
//     corpsName: 'Sarah Ahmed',
//     stateCode: 'AB',
//     department: 'Maritime Safety',
//     status: 'PENDING_SUPERVISOR',
//     createdDate: '2024-03-13',
//     lastUpdated: '2024-03-13',
//     submittedDays: 4
//   },
//   {
//     id: 'CF008',
//     corpsName: 'Michael Brown',
//     stateCode: 'KD',
//     department: 'Maritime Safety',
//     status: 'PENDING_SUPERVISOR',
//     createdDate: '2024-03-12',
//     lastUpdated: '2024-03-12',
//     submittedDays: 5
//   }
// ];

// const mockReviewedForms = [
//   {
//     id: 'CF001',
//     corpsName: 'John Adebayo',
//     stateCode: 'LA',
//     department: 'Maritime Safety',
//     status: 'APPROVED',
//     createdDate: '2024-01-15',
//     reviewedDate: '2024-01-18',
//     supervisorName: 'Dr. Sarah Ahmed',
//     supervisorRemark: 'Excellent conduct and dedication throughout the service period.',
//     daysAbsent: 0,
//     supervisorSignature: 'Dr. Sarah Ahmed',
//     supervisorDate: '2024-01-18'
//   },
//   {
//     id: 'CF002',
//     corpsName: 'Mary Okafor',
//     stateCode: 'OG',
//     department: 'Maritime Safety',
//     status: 'PENDING_HOD',
//     createdDate: '2024-02-10',
//     reviewedDate: '2024-02-13',
//     supervisorName: 'Dr. Sarah Ahmed',
//     supervisorRemark: 'Good performance with minor attendance issues.',
//     daysAbsent: 3,
//     supervisorSignature: 'Dr. Sarah Ahmed',
//     supervisorDate: '2024-02-13'
//   },
//   {
//     id: 'CF003',
//     corpsName: 'Peter Nwankwo',
//     stateCode: 'AN',
//     department: 'Maritime Safety',
//     status: 'PENDING_ADMIN',
//     createdDate: '2024-03-01',
//     reviewedDate: '2024-03-05',
//     supervisorName: 'Dr. Sarah Ahmed',
//     supervisorRemark: 'Outstanding contribution to departmental projects.',
//     daysAbsent: 1,
//     supervisorSignature: 'Dr. Sarah Ahmed',
//     supervisorDate: '2024-03-05'
//   }
// ];

// export default function SupervisorDashboard() {
//   const [pendingForms, setPendingForms] = useState(mockPendingForms);
//   const [reviewedForms, setReviewedForms] = useState(mockReviewedForms);
//   const [filteredPending, setFilteredPending] = useState(mockPendingForms);
//   const [filteredReviewed, setFilteredReviewed] = useState(mockReviewedForms);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('pending');
  
//   // Current user (would come from auth context)
//   const [currentUser] = useState({
//     name: 'Dr. Sarah Ahmed',
//     department: 'Maritime Safety',
//     role: 'SUPERVISOR'
//   });

//   const form = useForm<SupervisorReviewValues>({
//     resolver: zodResolver(supervisorReviewSchema),
//     defaultValues: {
//       supervisorName: currentUser.name,
//       daysAbsent: 0,
//       conductRemark: '',
//     },
//   });

//   // Filter forms based on search
//   useEffect(() => {
//     const filterForms = (forms) => {
//       if (!searchQuery) return forms;
//       return forms.filter(form => 
//         form.corpsName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         form.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         form.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         form.stateCode.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     };
    
//     setFilteredPending(filterForms(pendingForms));
//     setFilteredReviewed(filterForms(reviewedForms));
//   }, [pendingForms, reviewedForms, searchQuery]);

//   const onSubmitReview = async (data: SupervisorReviewValues) => {
//     setIsLoading(true);
    
//     try {
//       // Simulate API call to POST /api/clearance-forms/{id}/supervisor-review
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const reviewedForm = {
//         ...selectedForm,
//         status: 'PENDING_HOD',
//         reviewedDate: new Date().toISOString().split('T')[0],
//         supervisorName: data.supervisorName,
//         supervisorRemark: data.conductRemark,
//         daysAbsent: data.daysAbsent,
//         supervisorSignature: data.supervisorName,
//         supervisorDate: new Date().toISOString().split('T')[0]
//       };
      
//       // Remove from pending and add to reviewed
//       setPendingForms(prev => prev.filter(f => f.id !== selectedForm.id));
//       setReviewedForms(prev => [reviewedForm, ...prev]);
      
//       setShowReviewModal(false);
//       setActiveTab('reviewed');
//       form.reset({
//         supervisorName: currentUser.name,
//         daysAbsent: 0,
//         conductRemark: '',
//       });
      
//     } catch (error) {
//       console.error('Review submission error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       'PENDING_SUPERVISOR': { color: 'bg-orange-100 text-orange-800', text: 'Pending Supervisor' },
//       'PENDING_HOD': { color: 'bg-blue-100 text-blue-800', text: 'Pending HOD' },
//       'PENDING_ADMIN': { color: 'bg-purple-100 text-purple-800', text: 'Pending Admin' },
//       'APPROVED': { color: 'bg-green-100 text-green-800', text: 'Approved' },
//       'REJECTED': { color: 'bg-red-100 text-red-800', text: 'Rejected' }
//     };
    
//     const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
//     return <Badge className={config.color}>{config.text}</Badge>;
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'APPROVED': return <CheckCircle className="w-5 h-5 text-green-600" />;
//       case 'REJECTED': return <XCircle className="w-5 h-5 text-red-600" />;
//       case 'PENDING_SUPERVISOR':
//       case 'PENDING_HOD':
//       case 'PENDING_ADMIN': return <Clock className="w-5 h-5 text-orange-500" />;
//       default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   const refreshForms = async () => {
//     setIsLoading(true);
//     // Simulate API calls
//     // GET /api/clearance-forms/supervisor/pending?role=SUPERVISOR
//     // GET /api/clearance-forms/search/supervisor/{supervisorName}?role=SUPERVISOR
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setIsLoading(false);
//   };

//   const getDaysColor = (days) => {
//     if (days <= 2) return 'text-green-600';
//     if (days <= 5) return 'text-orange-600';
//     return 'text-red-600';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#003366' }}>
//                 <Building2 className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold" style={{ color: '#003366' }}>NIMASA</h1>
//                 <p className="text-sm text-gray-600">Supervisor Dashboard</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <Button variant="outline" size="sm" onClick={refreshForms}>
//               <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
//               Refresh
//             </Button>
//             <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
//               <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#006633' }}>
//                 <UserCheck className="w-4 h-4 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium">{currentUser.name}</p>
//                 <p className="text-xs text-gray-500">Supervisor</p>
//               </div>
//             </div>
//             <Button variant="outline" size="sm">
//               <LogOut className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Welcome Section */}
//       <div className="px-6 py-4 border-b bg-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Welcome, {currentUser.name}</h2>
//             <p className="text-gray-600">Review and manage corps member clearance forms</p>
//           </div>
//           <div className="flex items-center space-x-4 text-sm text-gray-600">
//             <div className="flex items-center space-x-1">
//               <Briefcase className="w-4 h-4" />
//               <span>Dept: {currentUser.department}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="p-6">
//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <Clock className="w-8 h-8 text-orange-500" />
//                 <div>
//                   <p className="text-2xl font-bold">{pendingForms.length}</p>
//                   <p className="text-sm text-gray-600">Pending Reviews</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-2xl font-bold">{reviewedForms.length}</p>
//                   <p className="text-sm text-gray-600">Reviewed Forms</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <Star className="w-8 h-8" style={{ color: '#0066CC' }} />
//                 <div>
//                   <p className="text-2xl font-bold">{reviewedForms.filter(f => f.status === 'APPROVED').length}</p>
//                   <p className="text-sm text-gray-600">Approved</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-4">
//               <div className="flex items-center space-x-3">
//                 <FileText className="w-8 h-8" style={{ color: '#7B1FA2' }} />
//                 <div>
//                   <p className="text-2xl font-bold">{pendingForms.length + reviewedForms.length}</p>
//                   <p className="text-sm text-gray-600">Total Forms</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <div className="flex items-center justify-between">
//             <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
//               <TabsTrigger value="pending" className="relative">
//                 Pending Reviews
//                 {pendingForms.length > 0 && (
//                   <Badge className="ml-2 bg-orange-100 text-orange-800">
//                     {pendingForms.length}
//                   </Badge>
//                 )}
//               </TabsTrigger>
//               <TabsTrigger value="reviewed">My Reviews</TabsTrigger>
//             </TabsList>
            
//             {/* Search */}
//             <div className="flex items-center space-x-2">
//               <Input
//                 placeholder="Search forms..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-64"
//               />
//               <Button variant="outline" size="sm">
//                 <Search className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Pending Reviews Tab */}
//           <TabsContent value="pending">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Clock className="w-5 h-5 text-orange-500" />
//                   <span>Forms Requiring Your Review</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Corps member forms waiting for your supervisor review and approval
//                 </CardDescription>
//               </CardHeader>
              
//               <CardContent>
//                 {filteredPending.length === 0 ? (
//                   <div className="text-center py-12">
//                     <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
//                     <p className="text-gray-600">
//                       {searchQuery 
//                         ? 'No pending forms match your search criteria' 
//                         : 'No forms are currently pending your review'}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {filteredPending.map((formItem) => (
//                       <div key={formItem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-orange-50 border-orange-200">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center space-x-3 mb-2">
//                               <Clock className="w-5 h-5 text-orange-500" />
//                               <div>
//                                 <h3 className="font-medium text-gray-900">{formItem.corpsName}</h3>
//                                 <p className="text-sm text-gray-600">
//                                   Form ID: {formItem.id} • {formItem.department}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
//                               <div>
//                                 <span className="text-gray-500">State Code:</span>
//                                 <p className="font-medium">{formItem.stateCode}</p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Submitted:</span>
//                                 <p className="font-medium">{formItem.createdDate}</p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Waiting:</span>
//                                 <p className={`font-medium ${getDaysColor(formItem.submittedDays)}`}>
//                                   {formItem.submittedDays} day{formItem.submittedDays !== 1 ? 's' : ''}
//                                 </p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Priority:</span>
//                                 <p className={`font-medium ${formItem.submittedDays > 3 ? 'text-red-600' : formItem.submittedDays > 1 ? 'text-orange-600' : 'text-green-600'}`}>
//                                   {formItem.submittedDays > 3 ? 'High' : formItem.submittedDays > 1 ? 'Medium' : 'Low'}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="flex space-x-2">
//                             <Button 
//                               variant="outline" 
//                               size="sm"
//                               onClick={() => {
//                                 setSelectedForm(formItem);
//                                 setShowDetailModal(true);
//                               }}
//                             >
//                               <Eye className="w-4 h-4 mr-2" />
//                               View
//                             </Button>
                            
//                             <Dialog open={showReviewModal && selectedForm?.id === formItem.id} 
//                                     onOpenChange={(open) => !open && setShowReviewModal(false)}>
//                               <DialogTrigger asChild>
//                                 <Button 
//                                   size="sm"
//                                   style={{ backgroundColor: '#0066CC' }}
//                                   onClick={() => {
//                                     setSelectedForm(formItem);
//                                     setShowReviewModal(true);
//                                   }}
//                                 >
//                                   <MessageSquare className="w-4 h-4 mr-2" />
//                                   Review
//                                 </Button>
//                               </DialogTrigger>
//                               <DialogContent className="sm:max-w-[600px]">
//                                 <DialogHeader>
//                                   <DialogTitle>Supervisor Review - {selectedForm?.corpsName}</DialogTitle>
//                                   <DialogDescription>
//                                     Complete your review for this corps member's clearance form
//                                   </DialogDescription>
//                                 </DialogHeader>
                                
//                                 {selectedForm && (
//                                   <div className="space-y-6">
//                                     {/* Form Details Summary */}
//                                     <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
//                                       <div>
//                                         <label className="text-sm font-medium text-gray-700">Corps Member</label>
//                                         <p className="text-sm text-gray-900">{selectedForm.corpsName}</p>
//                                       </div>
//                                       <div>
//                                         <label className="text-sm font-medium text-gray-700">State Code</label>
//                                         <p className="text-sm text-gray-900">{selectedForm.stateCode}</p>
//                                       </div>
//                                       <div>
//                                         <label className="text-sm font-medium text-gray-700">Department</label>
//                                         <p className="text-sm text-gray-900">{selectedForm.department}</p>
//                                       </div>
//                                       <div>
//                                         <label className="text-sm font-medium text-gray-700">Form ID</label>
//                                         <p className="text-sm text-gray-900">{selectedForm.id}</p>
//                                       </div>
//                                     </div>
                                    
//                                     <Form {...form}>
//                                       <div className="space-y-4">
//                                         <FormField
//                                           control={form.control}
//                                           name="supervisorName"
//                                           render={({ field }) => (
//                                             <FormItem>
//                                               <FormLabel>Supervisor Name</FormLabel>
//                                               <FormControl>
//                                                 <Input {...field} />
//                                               </FormControl>
//                                               <FormMessage />
//                                             </FormItem>
//                                           )}
//                                         />
                                        
//                                         <FormField
//                                           control={form.control}
//                                           name="daysAbsent"
//                                           render={({ field }) => (
//                                             <FormItem>
//                                               <FormLabel>Days Absent</FormLabel>
//                                               <FormControl>
//                                                 <Input 
//                                                   type="number" 
//                                                   min="0" 
//                                                   max="365"
//                                                   {...field}
//                                                   onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
//                                                 />
//                                               </FormControl>
//                                               <FormMessage />
//                                             </FormItem>
//                                           )}
//                                         />
                                        
//                                         <FormField
//                                           control={form.control}
//                                           name="conductRemark"
//                                           render={({ field }) => (
//                                             <FormItem>
//                                               <FormLabel>Conduct Remark</FormLabel>
//                                               <FormControl>
//                                                 <Textarea 
//                                                   placeholder="Provide your assessment of the corps member's conduct and performance..."
//                                                   className="min-h-[100px]"
//                                                   {...field} 
//                                                 />
//                                               </FormControl>
//                                               <FormMessage />
//                                             </FormItem>
//                                           )}
//                                         />
                                        
//                                         <div className="flex gap-2 pt-4">
//                                           <Button
//                                             type="button"
//                                             variant="outline"
//                                             className="flex-1"
//                                             onClick={() => setShowReviewModal(false)}
//                                           >
//                                             Cancel
//                                           </Button>
//                                           <Button
//                                             onClick={form.handleSubmit(onSubmitReview)}
//                                             disabled={isLoading}
//                                             className="flex-1"
//                                             style={{ backgroundColor: '#0066CC' }}
//                                           >
//                                             {isLoading ? (
//                                               <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
//                                             ) : (
//                                               <Send className="w-4 h-4 mr-2" />
//                                             )}
//                                             Submit Review
//                                           </Button>
//                                         </div>
//                                       </div>
//                                     </Form>
//                                   </div>
//                                 )}
//                               </DialogContent>
//                             </Dialog>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Reviewed Forms Tab */}
//           <TabsContent value="reviewed">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   <span>Forms You've Reviewed</span>
//                 </CardTitle>
//                 <CardDescription>
//                   Track the progress of forms you've already reviewed
//                 </CardDescription>
//               </CardHeader>
              
//               <CardContent>
//                 {filteredReviewed.length === 0 ? (
//                   <div className="text-center py-12">
//                     <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No reviewed forms</h3>
//                     <p className="text-gray-600">
//                       {searchQuery 
//                         ? 'No reviewed forms match your search criteria' 
//                         : 'You haven\'t reviewed any forms yet'}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {filteredReviewed.map((formItem) => (
//                       <div key={formItem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center space-x-3 mb-2">
//                               {getStatusIcon(formItem.status)}
//                               <div>
//                                 <h3 className="font-medium text-gray-900">{formItem.corpsName}</h3>
//                                 <p className="text-sm text-gray-600">
//                                   Form ID: {formItem.id} • Reviewed on {formItem.reviewedDate}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
//                               <div>
//                                 <span className="text-gray-500">Status:</span>
//                                 <div className="mt-1">{getStatusBadge(formItem.status)}</div>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Days Absent:</span>
//                                 <p className={`font-medium ${formItem.daysAbsent === 0 ? 'text-green-600' : formItem.daysAbsent <= 2 ? 'text-orange-600' : 'text-red-600'}`}>
//                                   {formItem.daysAbsent}
//                                 </p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Department:</span>
//                                 <p className="font-medium">{formItem.department}</p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">State Code:</span>
//                                 <p className="font-medium">{formItem.stateCode}</p>
//                               </div>
//                             </div>
                            
//                             {formItem.supervisorRemark && (
//                               <div className="mt-2 p-3 bg-gray-50 rounded-lg">
//                                 <span className="text-xs font-medium text-gray-700">Your Remark:</span>
//                                 <p className="text-sm text-gray-900 mt-1">{formItem.supervisorRemark}</p>
//                               </div>
//                             )}
//                           </div>
                          
//                           <Dialog open={showDetailModal && selectedForm?.id === formItem.id} 
//                                   onOpenChange={(open) => !open && setShowDetailModal(false)}>
//                             <DialogTrigger asChild>
//                               <Button 
//                                 variant="outline" 
//                                 size="sm"
//                                 onClick={() => {
//                                   setSelectedForm(formItem);
//                                   setShowDetailModal(true);
//                                 }}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" />
//                                 View Details
//                               </Button>
//                             </DialogTrigger>
                            // <DialogContent className="sm:max-w-[600px]">
                            //   <DialogHeader>
                            //     <DialogTitle>Form Details - {selectedForm?.corpsName}</DialogTitle>
                            //     <DialogDescription>
                            //       Complete form information and review details
                            //     </DialogDescription>
                            //   </DialogHeader>
                              
                            //   {selectedForm && (
                            //     <div className="space-y-6">
                            //       {/* Basic Information */}
                            //       <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            //         <div>
                            //           <label className="text-sm font-medium text-gray-700">Form ID</label>
                            //           <p className="text-sm font-mono text-gray-900">{selectedForm.id}</p>
                            //         </div>
                            //         <div>
                            //           <label className="text-sm font-medium text-gray-700">Status</label>
                            //           <div className="mt-1">{getStatusBadge(selectedForm.status)}</div>
                            //         </div>
                            //         <div>
                            //           <label className="text-sm font-medium text-gray-700">Corps Member</label>
                            //           <p className="text-sm text-gray-900">{selectedForm.corpsName}</p>
                            //         </div>
                            //         <div>
                            //           <label className="text-sm font-medium text-gray-700">State Code</label>
                            //           <p className="text-sm text-gray-900">{selectedForm.stateCode}</p>
                            //         </div>
                            //         <div>
                            //           <label className="text-sm font-medium text-gray-700">Department</label>
                            //           <p className="text-sm text-gray-900">{selectedForm.department}</p>
                            //         </div>
                            //         <div>
                            //           <label className="text-sm font-medium text-gray-700">Created Date</label>
                            //           <p className="text-sm text-gray-900">{selectedForm.createdDate}</p>
                            //         </div>
                            //       </div>

                            //       {/* Supervisor Review Section (if reviewed) */}
                            //       {selectedForm.supervisorName && (
                            //         <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                            //           <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                            //             <UserCheck className="w-4 h-4 mr-2" />
                            //             Supervisor Review
                            //           </h4>
                            //           <div className="grid grid-cols-2 gap-4 mb-3">
                            //             <div>
                            //               <label className="text-sm font-medium text-blue-700">Supervisor</label>
                            //               <p className="text-sm text-blue-900">{selectedForm.supervisorName}</p>
                            //             </div>
                            //             <div>
                            //               <label className="text-sm font-medium text-blue-700">Days Absent</label>
                            //               <p className="text-sm text-blue-900">{selectedForm.daysAbsent || 'N/A'}</p>
                            //             </div>
                            //             <div>
                            //               <label className="text-sm font-medium text-blue-700">Review Date</label>
                            //               <p className="text-sm text-blue-900">{selectedForm.reviewedDate || selectedForm.supervisorDate || 'N/A'}</p>
                            //             </div>
                            //           </div>
                            //           {selectedForm.supervisorRemark && (
                            //             <div>
                            //               <label className="text-sm font-medium text-blue-700">Conduct Remark</label>
                            //               <p className="text-sm text-blue-900 mt-1 p-2 bg-white rounded border">
                            //                 {selectedForm.supervisorRemark}
                            //               </p>
                            //             </div>
                            //           )}
                            //         </div>
                            //       )}

                            //       {/* HOD Review Section (if applicable) */}
                            //       {selectedForm.hodName && (
                            //         <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                            //           <h4 className="font-medium text-purple-900 mb-3 flex items-center">
                            //             <Briefcase className="w-4 h-4 mr-2" />
                            //             HOD Review
                            //           </h4>
                            //           <div className="grid grid-cols-2 gap-4 mb-3">
                            //             <div>
                            //               <label className="text-sm font-medium text-purple-700">HOD Name</label>
                            //               <p className="text-sm text-purple-900">{selectedForm.hodName}</p>
                            //             </div>
                            //             <div>
                            //               <label className="text-sm font-medium text-purple-700">Review Date</label>
                            //               <p className="text-sm text-purple-900">{selectedForm.hodDate || 'N/A'}</p>
                            //             </div>
                            //           </div>
                            //           {selectedForm.hodRemark && (
                            //             <div>
                            //               <label className="text-sm font-medium text-purple-700">HOD Remark</label>
                            //               <p className="text-sm text-purple-900 mt-1 p-2 bg-white rounded border">
                            //                 {selectedForm.hodRemark}
                            //               </p>
                            //             </div>
                            //           )}
                            //         </div>
                            //       )}

                            //       {/* Admin Section (if applicable) */}
                            //       {selectedForm.adminName && (
                            //         <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                            //           <h4 className="font-medium text-green-900 mb-3 flex items-center">
                            //             <CheckCircle className="w-4 h-4 mr-2" />
                            //             Final Approval
                            //           </h4>
                            //           <div className="grid grid-cols-2 gap-4">
                            //             <div>
                            //               <label className="text-sm font-medium text-green-700">Admin Name</label>
                            //               <p className="text-sm text-green-900">{selectedForm.adminName}</p>
                            //             </div>
                            //             <div>
                            //               <label className="text-sm font-medium text-green-700">Action Date</label>
                            //               <p className="text-sm text-green-900">{selectedForm.adminDate || 'N/A'}</p>
                            //             </div>
                            //           </div>
                            //         </div>
                            //       )}

                            //       <div className="flex justify-end">
                            //         <Button onClick={() => setShowDetailModal(false)} variant="outline">
                            //           Close
                            //         </Button>
                            //       </div>
                            //     </div>
                            //   )}
                            // </DialogContent>