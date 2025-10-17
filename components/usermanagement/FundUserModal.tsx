"use client";
import { axiosPost } from "@/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";

interface FundUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
}

export default function FundUserModal({
  isOpen,
  onClose,
  userId,
  userName,
}: FundUserModalProps) {
  const [formData, setFormData] = useState({
    currency: "USDT",
    account_type: "exchange",
    amount: "",
    action: "add",
    balance_type: "both",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!formData.reason.trim()) {
      toast.error("Please provide a reason for this transaction");
      return;
    }

    const confirmMessage = `Are you sure you want to ${
      formData.action === "add" ? "add" : "deduct"
    } ${formData.amount} ${formData.currency} ${
      formData.action === "add" ? "to" : "from"
    } ${userName}'s ${formData.account_type} account?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setLoading(true);
      const payload = {
        user_id: userId,
        currency: formData.currency,
        account_type: formData.account_type,
        amount: parseFloat(formData.amount),
        action: formData.action,
        balance_type: formData.balance_type,
        reason: formData.reason,
      };

      const res = await axiosPost("/admin/charge-user", payload, true);
      
      console.log("Fund user response:", res);
      
      if (res.data?.success) {
        toast.success(
          `Successfully ${formData.action === "add" ? "added" : "deducted"} ${
            formData.amount
          } ${formData.currency}`
        );
        
        // Reset form
        setFormData({
          currency: "USDT",
          account_type: "exchange",
          amount: "",
          action: "add",
          balance_type: "both",
          reason: "",
        });
        
        onClose();
        
        // Reload page to show updated balance
        window.location.reload();
      } else {
        toast.error(res.data?.message || "Failed to process transaction");
      }
    } catch (error: any) {
      console.error("Error funding user:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while processing the transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Fund User Wallet
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4 p-3 bg-blue-50 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">User:</span> {userName}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">User ID:</span> {userId}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency <span className="text-red-500">*</span>
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Type <span className="text-red-500">*</span>
            </label>
            <select
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="exchange">Exchange</option>
              <option value="trade">Trade</option>
              <option value="perpetual">Perpetual</option>
            </select>
          </div>

          {/* Action */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action <span className="text-red-500">*</span>
            </label>
            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="add">Add Funds</option>
              <option value="deduct">Deduct Funds</option>
            </select>
          </div>

          {/* Balance Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance Type <span className="text-red-500">*</span>
            </label>
            <select
              name="balance_type"
              value={formData.balance_type}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="both">Both (Capital + Profit)</option>
              <option value="capital">Capital Only</option>
              <option value="profit">Profit Only</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              disabled={loading}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={loading}
              rows={3}
              placeholder="Enter reason for this transaction..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
