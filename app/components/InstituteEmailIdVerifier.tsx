"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // use your shadcn Button

interface InstituteEmailIdVerifierProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (newEmail: string) => void | Promise<void>;
  onCancel?: () => void;
  children?: React.ReactNode;
}

const InstituteEmailIdVerifier = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  children,
}: InstituteEmailIdVerifierProps) => {
  const [showNewEmailField, setShowNewEmailField] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleUseExisting = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleShowNewEmailField = () => {
    setShowNewEmailField(true);
  };

  const handleConfirmNewEmail = () => {
    if (!newEmail.trim()) {
      alert("Please enter a new email.");
      return;
    }
    onConfirm?.(newEmail.trim());
    setShowNewEmailField(false);
    setNewEmail("");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This email already exists</AlertDialogTitle>
          <AlertDialogDescription>
            The entered email is already registered with another institute.
            <br />
            Do you want to use the same email for this institute, or would you
            like to enter a different one?
          </AlertDialogDescription>
        </AlertDialogHeader>

        {showNewEmailField && (
          <div className="my-3">
            <Input
              className="h-10"
              placeholder="Enter new admin email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
        )}

        <AlertDialogFooter>
          {!showNewEmailField ? (
            <>
              <AlertDialogCancel onClick={handleUseExisting}>
                Use same email
              </AlertDialogCancel>
              {/* 👇 Use a normal button to avoid auto-close */}
              <Button variant="default" onClick={handleShowNewEmailField}>
                Enter new email
              </Button>
            </>
          ) : (
            <>
              <AlertDialogCancel onClick={() => setShowNewEmailField(false)}>
                Cancel
              </AlertDialogCancel>
              <Button variant="default" onClick={handleConfirmNewEmail}>
                Confirm New Email
              </Button>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InstituteEmailIdVerifier;
