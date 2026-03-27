"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";



export default function Modal(
    {
        children,
        title,
        description,
        isOpen,
        className,
        closeModal
    }: {
        children: React.ReactNode,
        title: string | React.ReactNode,
        description: string | React.ReactNode,
        isOpen: boolean;
        className?: string;
        closeModal?: () => void;
    }) {

    return (
        <Dialog modal={true} defaultOpen={isOpen} open={isOpen}>
            <DialogContent className={`px-6 overflow-x-hidden border-none max-h-[80vh] overflow-y-auto ${className}`}>
                <div className={`flex justify-between items-start pb-3`}>
                    <div className="">
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="text-[#667085] font-inter-tight-regular mt-1">{description}</DialogDescription>
                    </div>
                    {
                        closeModal &&
                        <button className="outline-none border-0 bg-transparent" onClick={closeModal}>
                            <X className="h-6 w-6" color="#667085" />
                            <span className="sr-only">Close</span>
                        </button>
                    }
                </div>
                {children}
            </DialogContent>
        </Dialog>
    )

} 
