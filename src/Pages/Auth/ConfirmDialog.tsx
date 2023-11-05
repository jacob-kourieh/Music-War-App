import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    onConfirm: () => void;
    onCancel: () => void;
    children: React.ReactNode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, children, onConfirm, onCancel }) => {
    const handleClose = () => {
        return false;
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <Typography>{children}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
