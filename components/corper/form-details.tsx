//  <Dialog open={showDetailModal && selectedForm?.id === formItem.id}
//                                                         onOpenChange={(open) => !open && setShowDetailModal(false)}>
//                                                         <DialogTrigger asChild>
//                                                             <Button
//                                                                 variant="outline"
//                                                                 size="sm"
//                                                                 onClick={() => {
//                                                                     setSelectedForm({
//                                                                         ...formItem,
//                                                                         supervisorName: formItem.supervisorName ?? '',
//                                                                     });
//                                                                     setShowDetailModal(true);
//                                                                 }}
//                                                             >
//                                                                 <Eye className="w-4 h-4 mr-2" />
//                                                                 View Details
//                                                             </Button>
//                                                         </DialogTrigger>
//                                                         <DialogContent className="sm:max-w-[600px]">
//                                                             <DialogHeader>
//                                                                 <DialogTitle>Form Details - {selectedForm?.id}</DialogTitle>
//                                                                 <DialogDescription>
//                                                                     Complete information about your clearance form
//                                                                 </DialogDescription>
//                                                             </DialogHeader>

//                                                             {selectedForm && (
//                                                                 <div className="space-y-4">
//                                                                     <div className="grid grid-cols-2 gap-4">
//                                                                         <div>
//                                                                             <label className="text-sm font-medium text-gray-700">Corps Name</label>
//                                                                             <p className="text-sm text-gray-900">{selectedForm.corpsName}</p>
//                                                                         </div>
//                                                                         <div>
//                                                                             <label className="text-sm font-medium text-gray-700">State Code</label>
//                                                                             <p className="text-sm text-gray-900">{selectedForm.stateCode}</p>
//                                                                         </div>
//                                                                         <div>
//                                                                             <label className="text-sm font-medium text-gray-700">Department</label>
//                                                                             <p className="text-sm text-gray-900">{selectedForm.department}</p>
//                                                                         </div>
//                                                                         <div>
//                                                                             <label className="text-sm font-medium text-gray-700">Status</label>
//                                                                             <div className="mt-1"><StatusBadge status={selectedForm.status} /></div>
//                                                                         </div>
//                                                                     </div>

//                                                                     {selectedForm.supervisorName && (
//                                                                         <div className="border-t pt-4">
//                                                                             <h4 className="font-medium text-gray-900 mb-2">Supervisor Review</h4>
//                                                                             <div className="grid grid-cols-2 gap-4 text-sm">
//                                                                                 <div>
//                                                                                     <label className="font-medium text-gray-700">Supervisor</label>
//                                                                                     <p>{selectedForm.supervisorName}</p>
//                                                                                 </div>
//                                                                                 {selectedForm.daysAbsent !== undefined && (
//                                                                                     <div>
//                                                                                         <label className="font-medium text-gray-700">Days Absent</label>
//                                                                                         <p>{selectedForm.daysAbsent}</p>
//                                                                                     </div>
//                                                                                 )}
//                                                                             </div>
//                                                                             {selectedForm.supervisorRemark && (
//                                                                                 <div className="mt-2">
//                                                                                     <label className="font-medium text-gray-700">Supervisor Remark</label>
//                                                                                     <p className="text-sm bg-gray-50 p-2 rounded">{selectedForm.supervisorRemark}</p>
//                                                                                 </div>
//                                                                             )}
//                                                                         </div>
//                                                                     )}

//                                                                     {selectedForm.hodName && (
//                                                                         <div className="border-t pt-4">
//                                                                             <h4 className="font-medium text-gray-900 mb-2">HOD Review</h4>
//                                                                             <p className="text-sm">Reviewed by: {selectedForm.hodName}</p>
//                                                                         </div>
//                                                                     )}

//                                                                     {selectedForm.rejectionReason && (
//                                                                         <Alert className="border-red-200 bg-red-50">
//                                                                             <XCircle className="h-4 w-4 text-red-600" />
//                                                                             <AlertDescription className="text-red-800">
//                                                                                 <strong>Rejection Reason:</strong> {selectedForm.rejectionReason}
//                                                                             </AlertDescription>
//                                                                         </Alert>
//                                                                     )}
//                                                                 </div>
//                                                             )}
//                                                         </DialogContent>
//                                                     </Dialog>