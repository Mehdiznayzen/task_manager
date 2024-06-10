import { FileIcon, StarIcon, TrashIcon } from "lucide-react";


export const SideNavLinks = [
    {
        id : 1,
        title : 'Tasks',
        icon : <FileIcon />,
        route : '/tasks'
    },
    {
        id : 2,
        title : 'Favorites',
        icon : <StarIcon />,
        route : '/tasks/favorites'
    },
    {
        id : 3,
        title : 'Trash',
        icon : <TrashIcon />,
        route : '/tasks/trash'
    },
]