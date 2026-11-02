"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./updatePopup";
import ModalDelete from "./deletePopup";
import { updateAmount } from "../services/updateAmount.service";
import { deleteAmount } from "../services/deleteAmount.service";
import { AmountType } from "../interfaces/addAmounts";

interface AmountItemProps {
  id: string;
  type: AmountType;
  description: string;
  amount: number;
}

export default function AmountItem(props: AmountItemProps) {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [description, setDescription] = useState(props.description);
  const [amount, setAmount] = useState(props.amount);
  const [error, setError] = useState<string | null>(null);

  const openEdit = () => {
    // Start from the saved values each time the dialog opens
    setDescription(props.description);
    setAmount(props.amount);
    setError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateAmount({ id: props.id, type: props.type, description, amount });
      setModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Could not update the entry. Please try again.");
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteAmount({ id: props.id, type: props.type });
      setDeleteModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Could not delete the entry. Please try again.");
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`description-${props.id}`}>Description</label>
            <input
              required
              type="text"
              className="form-control"
              id={`description-${props.id}`}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`amount-${props.id}`}>Amount</label>
            <input
              required
              type="number"
              min={1}
              className="form-control"
              id={`amount-${props.id}`}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button type="submit" className="btn btn-outline-primary mt-3">
            Save
          </button>
        </form>
      </Modal>
      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <form onSubmit={handleDelete}>
          <p>
            Delete <strong>{props.description}</strong> ({props.amount} LKR)?
          </p>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button type="submit" className="btn btn-outline-danger mt-3">
            Delete
          </button>
        </form>
      </ModalDelete>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {props.description}
        <div>
          <label className="mr-3">{props.amount} LKR</label>
          <button
            className="btn btn-sm btn-outline-success m-2"
            onClick={openEdit}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              setError(null);
              setDeleteModalOpen(true);
            }}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
}
