"use client"

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { AddAgentForm } from "./add-agent-form";


interface AddAgentProps {
    isOpen: boolean;
    closeModal: () => void;
}

const AddAgent = ({ isOpen, closeModal }: AddAgentProps) => {

    const router = useRouter();


    return (
        <>
            <Modal
                title={<span className="bg-[#DDE8FA] w-12 h-12 rounded-full flex items-center justify-center">

                </span>}
                description={<span className="mt-5 flex flex-col">
                    <span className="text-[#101828] font-inter-tight-semibold text-lg tracking-[-0.01em]">Add Agent</span>
                    <span className="text-[#667085] font-inter-tight-medium text-sm">Enter agent's details below to sign them up</span>
                </span>}
                isOpen={isOpen}
                // closeModal={() => closeModal()}
                className="max-w-[500px]"
            >
                <AddAgentForm />

            </Modal>
        </>
    )
}


export default AddAgent;