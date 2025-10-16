"use client";
import { axiosGet } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TradeFollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeId: number;
}

interface User {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface Follower {
  id: number;
  user_id: number;
  user: User;
  trade_amount: string;
  expected_profit: string;
  actual_profit: string;
  status: string;
  joined_at: string;
}

interface TradeInfo {
  id: number;
  symbol: string;
  direction: string;
  status: string;
  rate_of_return: number;
  open_price: string;
  settlement_price: string | null;
  created_at: string;
  updated_at: string;
}

interface Summary {
  total_followers: number;
  total_invested: string;
  total_expected_profit: string;
  total_actual_profit: string;
}

export default function TradeFollowersModal({
  isOpen,
  onClose,
  tradeId,
}: TradeFollowersModalProps) {
  const [loading, setLoading] = useState(false);
  const [trade, setTrade] = useState<TradeInfo | null>(null);
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (isOpen && tradeId) {
      fetchTradeFollowers();
    }
  }, [isOpen, tradeId]);

  const fetchTradeFollowers = async () => {
    try {
      setLoading(true);
      const res = await axiosGet(`/admin/trade-followers/${tradeId}`, true);
      console.log("Trade followers response:", res);

      if (res.success || res.data) {
        const data = res.data || res;
        setTrade(data.trade);
        setFollowers(data.followers || []);
        setSummary(data.summary);
      } else {
        toast.error("Failed to load trade participants");
      }
    } catch (error: any) {
      console.error("Error fetching trade followers:", error);
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch trade participants"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "settled":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === "LONG" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Trade Participants
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse space-y-4 w-full">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Trade Information */}
              {trade && (
                <div className="mb-6 p-5 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Trade Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Symbol</p>
                      <p className="font-semibold text-gray-800">
                        {trade.symbol}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Direction</p>
                      <p
                        className={`font-semibold ${getDirectionColor(
                          trade.direction
                        )}`}
                      >
                        {trade.direction}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-semibold text-gray-800">
                        {trade.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className="font-semibold text-gray-800">
                        {trade.rate_of_return}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Open Price</p>
                      <p className="font-semibold text-gray-800">
                        ${parseFloat(trade.open_price).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Settlement Price</p>
                      <p className="font-semibold text-gray-800">
                        {trade.settlement_price
                          ? `$${parseFloat(
                              trade.settlement_price
                            ).toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Created At</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(trade.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Updated At</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(trade.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              {summary && (
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Total Followers
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {summary.total_followers}
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${parseFloat(summary.total_invested).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">
                      Expected Profit
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {parseFloat(summary.total_expected_profit).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Actual Profit</p>
                    <p className="text-2xl font-bold text-green-700">
                      $
                      {parseFloat(summary.total_actual_profit).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Followers Table */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Participants ({followers.length})
                  </h3>
                </div>
                {followers.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No participants found for this trade
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Investment
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Expected Profit
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actual Profit
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined At
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {followers.map((follower) => (
                          <tr
                            key={follower.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {follower.user.name || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {follower.user_id}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {follower.user.email || "N/A"}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {follower.user.phone || "N/A"}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600">
                              $
                              {parseFloat(
                                follower.trade_amount
                              ).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">
                              $
                              {parseFloat(
                                follower.expected_profit
                              ).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-700">
                              $
                              {parseFloat(
                                follower.actual_profit
                              ).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                                  follower.status
                                )}`}
                              >
                                {follower.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {new Date(
                                follower.joined_at
                              ).toLocaleDateString()}{" "}
                              <br />
                              <span className="text-xs">
                                {new Date(
                                  follower.joined_at
                                ).toLocaleTimeString()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
