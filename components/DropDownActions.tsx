'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Edit2, EllipsisVertical, Trash } from "lucide-react"
import TooltipComponent from "./TooltipComponent"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import FormUpdateTask from "./FormUpdateTask"
import { MdSettingsBackupRestore } from "react-icons/md";

interface DropDownActions {
    handleAddToTrash?: () => void,
    typeDelete?: string,
    showUpdateOption: boolean,
    handleDeleteTask?: () => void,
    type: 'trash' | 'delete',
    _id?: any,
    showRestoreOption?: boolean,
    handleRestoreFromTrash?: () => void
}

const DropDownActions = ({ 
    handleAddToTrash, 
    typeDelete, 
    showRestoreOption, 
    showUpdateOption, 
    handleDeleteTask, 
    type, 
    _id, 
    handleRestoreFromTrash 
}: DropDownActions) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <TooltipComponent text="Update & Delete">
                        <EllipsisVertical className="w-4 h-4 cursor-pointer" />
                    </TooltipComponent>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {showUpdateOption && (
                    <>
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem asChild>
                                    <div className="flex items-center">
                                        <span>Update</span>
                                    </div>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                                <FormUpdateTask _id={_id} />
                            </DialogContent>
                        </Dialog>
                        <DropdownMenuSeparator />
                    </>
                )}
                {showRestoreOption && (
                    <>
                        <DropdownMenuItem onClick={handleRestoreFromTrash}>
                            <MdSettingsBackupRestore className="w-4 h-4 mr-2" />
                            <span>Restore</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem onClick={type === 'trash' ? handleAddToTrash : handleDeleteTask}>
                    <Trash className="h-4 w-4" />
                    <span>{typeDelete ? typeDelete : 'Add to Trash'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DropDownActions;
