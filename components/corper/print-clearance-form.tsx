import React from "react";

import Logo from "../shared/logo";
import { formatDate } from "@/lib/utils";
import { PrintableFormResponse } from "@/types";

export const PrintableClearanceForm = React.forwardRef<
    HTMLDivElement,
    { form: PrintableFormResponse }
>(({ form }, ref) => {

    const getMonthYear = (dateString?: string): string => {
        const date = dateString ? new Date(dateString) : new Date();
        return date.toLocaleString("en-US", { month: "long", year: "numeric" });
    };

    return (
        <div ref={ref} className="p-4 print:p-2">
            <div className="form-container relative border p-4 rounded bg-white text-[10pt] leading-snug max-w-[794px] mx-auto min-h-[95vh]">
                {/* Header */}
                <div className="header mb-4 text-center space-y-1">
                    <div className="flex justify-center mb-2">
                        <Logo />
                    </div>
                    <div className="agency-name font-semibold text-[9pt]">
                        NIGERIAN MARITIME ADMINISTRATION AND SAFETY AGENCY
                    </div>
                    <div className="form-title font-bold text-[11pt]">
                        NYSC INTERNAL MONTHLY CLEARANCE FORM
                    </div>
                    <div className="form-description text-[9pt] text-gray-700">
                        You are kindly requested to complete this form as a prerequisite for the
                        issuance of <strong>Monthly Clearance Letter</strong> for National Youth
                        Service Corps Members serving in the Agency.
                    </div>
                </div>

                {/* Corps Member Info */}
                <div className="section mb-4 space-y-1.5">
                    <div className="form-line flex gap-2">
                        <span className="font-semibold">NAME:</span>
                        <span className="flex-1">{form.corpsName}</span>
                    </div>
                    <div className="form-line flex gap-2">
                        <span className="font-semibold">STATE CODE NUMBER:</span>
                        <span>{form.stateCode}</span>
                    </div>
                    <div className="form-line flex gap-2">
                        <span className="font-semibold">CDS DAY:</span>
                        <span>{form.cdsDay || "THURSDAY"}</span>
                    </div>
                    <div className="form-line flex gap-2">
                        <span className="font-semibold">DEPARTMENT:</span>
                        <span className="flex-1">{form.department}</span>
                    </div>
                </div>

                {/* Supervisor Section */}
                <div className="section mb-5">
                    <div className="font-semibold underline mb-2">
                        TO BE COMPLETED BY THE SUPERVISOR
                    </div>

                    <div className="form-line flex gap-2 mb-1.5">
                        <span>1.</span>
                        <span>
                            Number of days absent from duty within the Month:
                        </span>
                        <span>{form.daysAbsent}</span>
                    </div>

                    <div className="mb-3">
                        <div className="flex gap-2 mb-1">
                            <span>2.</span>
                            <span>
                                Conduct of the Corps Member during the period under review:
                            </span>
                        </div>
                        <div className="border rounded p-2 space-y-1">
                            <p>{form.conductRemark}</p>
                        </div>
                    </div>

                    <div className="signature-section">
                        <div className="flex gap-2 mb-2">
                            <span>3.</span>
                            <span>Supervisor&apos;s Name:</span>
                            <span>{form.supervisorName}</span>
                        </div>
                        <div className="flex items-end gap-8 pl-4">
                            <div>
                                <div className="p-2 flex items-center justify-center min-h-[35px] underline underline-offset-4">
                                    {form.supervisorSignatureUrl?.startsWith("http") ? (
                                        <img
                                            src={form.supervisorSignatureUrl}
                                            alt="Supervisor Signature"
                                            className="max-h-10"
                                        />
                                    ) : (
                                        form.supervisorSignatureUrl
                                    )}
                                </div>
                                <hr />
                                <div className="text-center font-bold text-[9pt] mt-1">
                                    Signature:
                                </div>
                            </div>
                            <div>
                                <div className="text-center">{formatDate(form.supervisorDate)}</div>
                                <hr />
                                <div className="text-center font-bold text-[9pt] mt-1">Date:</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HOD Section */}
                <div className="mb-5">
                    <div className="font-semibold underline mb-2">
                        TO BE COMPLETED BY THE HEAD OF DEPARTMENT/AUTONOMOUS UNIT
                    </div>
                    <div className="mb-3">
                        <span className="font-semibold">Remark:</span>
                        <div className="border rounded p-2 mt-1 space-y-1">
                            <p>{form.hodRemark}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <span className="font-semibold">Name:</span>
                        <span>{form.hodName}</span>
                    </div>
                    <div className="flex items-end gap-8">
                        <div>
                            <div className="p-2 flex items-center justify-center min-h-[35px] underline underline-offset-4">
                                {form.hodSignatureUrl?.startsWith("http") ? (
                                    <img
                                        src={form.hodSignatureUrl}
                                        alt="HOD Signature"
                                        className="max-h-10"
                                    />
                                ) : (
                                    form.hodSignatureUrl
                                )}
                            </div>
                            <hr />
                            <div className="text-center font-bold text-[9pt] mt-1">
                                Signature:
                            </div>
                        </div>
                        <div>
                            <div className="text-center">{formatDate(form.hodDate)}</div>
                            <hr />
                            <div className="text-center font-bold text-[9pt] mt-1">Date:</div>
                        </div>
                    </div>
                </div>

                {/* Admin Section */}
                <div className="mb-5">
                    <div className="text-gray-700 mb-2">
                        The above-mentioned Corps member has satisfactorily performed his/her
                        duties for the month of{" "}
                        <span className="font-semibold">
                            {getMonthYear(form.approvalDate)}
                        </span>.
                    </div>
                    <div className="flex gap-8 mb-3">
                        <div>
                            <div className="flex items-center justify-center min-h-[40px] min-w-[160px]">
                                <img
                                    src="https://res.cloudinary.com/djrp3aaq9/image/upload/v1759415487/WhatsApp_Image_2025-10-02_at_07.30.50_94e3984a_v6evxm.jpg"
                                    alt="Admin Signature"
                                    className="max-h-10"
                                />
                            </div>
                            <hr />
                            <div className="text-center font-bold text-[9pt] mt-1">
                                Signature:
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold">Olubukola Falore</div>
                        <div className="text-[9pt]">For: DAHR</div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-4 text-center text-[8pt] text-gray-500 absolute left-1/2 -translate-x-1/2 bottom-4">
                    This form was generated on {new Date().toLocaleDateString()} | NIMASA NYSC
                    Clearance System
                </footer>
            </div>
        </div>

    );
});

PrintableClearanceForm.displayName = "PrintableClearanceForm";
