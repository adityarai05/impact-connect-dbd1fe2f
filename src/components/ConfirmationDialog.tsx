import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ConfirmationDialog = ({
  open,
  onClose,
  title = "Thank You!",
  message = "Your submission has been received. We'll get back to you soon.",
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-accent/10 p-4">
            <CheckCircle className="h-12 w-12 text-accent" />
          </div>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-base">{message}</DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} className="mt-4 w-full" variant="hero">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
